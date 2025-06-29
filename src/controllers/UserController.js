const bcrypt = require("bcrypt");
const User = require("../models/User");
const { Op } = require("sequelize");
const response = require("../utils/response");

const SALT_ROUNDS = 10;

module.exports = {
  async signup(req, res) {
    try {
      const { username, email, password, confirmPassword } = req.body;

      // Validasi manual
      if (!username || !email || !password || !confirmPassword) {
        return res
          .status(400)
          .json({ status: 400, message: "Semua field wajib diisi" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ status: 400, message: "Email tidak valid" });
      }

      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: 400, message: "Passwords do not match" });
      }

      if (password.length < 8) {
        return res
          .status(400)
          .json({ status: 400, message: "Password minimal 8 karakter" });
      }

      const exists = await User.findOne({
        where: { [Op.or]: [{ username }, { email }] },
      });
      if (exists) {
        return res.status(400).json({
          status: 400,
          message: "Username atau email sudah terdaftar",
        });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(201).json({
        status: 201,
        message: "User registered successfully",
        data: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "Server error" });
    }
  },

  async login(req, res) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res
          .status(400)
          .json({ status: 400, message: "Login dan password wajib diisi" });
      }

      const user = await User.findOne({
        where: { [Op.or]: [{ email: login }, { username: login }] },
      });

      if (!user)
        return res
          .status(404)
          .json({ status: 404, message: "User tidak ditemukan" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ status: 401, message: "Password salah" });

      return res.json({
        status: 200,
        message: "Login successful",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          photo: user.photo,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "Server error" });
    }
  },

  async profile(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findByPk(userId, {
        attributes: ["id", "username", "email", "photo", "created_at"],
      });

      if (!user)
        return res
          .status(404)
          .json({ status: 404, message: "User tidak ditemukan" });

      return response(res, 200, "Profile retrieved successfully", user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "Server error" });
    }
  },

  async updateProfile(req, res) {
    try {
      const userId = req.params.id;
      const { username, email, password } = req.body;

      const user = await User.findByPk(userId);
      if (!user)
        return res
          .status(404)
          .json({ status: 404, message: "User tidak ditemukan" });

      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res
            .status(400)
            .json({ status: 400, message: "Email tidak valid" });
        }
      }

      if (username && username !== user.username) {
        const existUser = await User.findOne({ where: { username } });
        if (existUser) {
          return res
            .status(400)
            .json({ status: 400, message: "Username sudah dipakai" });
        }
      }
      if (email && email !== user.email) {
        const existUser = await User.findOne({ where: { email } });
        if (existUser) {
          return res
            .status(400)
            .json({ status: 400, message: "Email sudah dipakai" });
        }
      }

      user.username = username || user.username;
      user.email = email || user.email;

      if (password) {
        if (password.length < 8) {
          return res
            .status(400)
            .json({ status: 400, message: "Password minimal 8 karakter" });
        }
        user.password = await bcrypt.hash(password, SALT_ROUNDS);
      }

      await user.save();

      return response(res, 200, "Profile updated successfully", user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "Server error" });
    }
  },

  async updatePhoto(req, res) {
    try {
      const userId = req.params.id;

      if (!req.file) {
        return res
          .status(400)
          .json({ status: 400, message: "File photo wajib diupload" });
      }

      const user = await User.findByPk(userId);
      if (!user)
        return res
          .status(404)
          .json({ status: 404, message: "User tidak ditemukan" });

      user.photo = `/uploads/${req.file.filename}`;
      await user.save();

      return response(res, 200, "Photo profile berhasil diupdate", user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, message: "Server error" });
    }
  },
};
