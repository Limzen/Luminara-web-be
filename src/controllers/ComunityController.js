const Community = require("../models/Comunity");
const { Op } = require("sequelize");
const path = require("path");
const response = require("../utils/response");

function validateCommunityInput(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || data.name.trim() === "") {
      errors.push("Field 'name' wajib diisi dan tidak boleh kosong");
    }
  }

  if (data.email_address !== undefined && data.email_address !== "") {
    if (!data.email_address.includes("@")) {
      errors.push("Field 'email_address' harus format email valid");
    }
  }

  if (
    data.whatsapp_group_link !== undefined &&
    data.whatsapp_group_link !== ""
  ) {
    if (!data.whatsapp_group_link.startsWith("http")) {
      errors.push("Field 'whatsapp_group_link' harus berupa URL yang valid");
    }
  }

  return errors;
}

module.exports = {
  async index(req, res) {
    try {
      const { name, agama, jenis_kegiatan } = req.query;

      const whereClause = {};
      if (name) whereClause.name = { [Op.iLike]: `%${name}%` };
      if (agama) whereClause.agama = { [Op.iLike]: `%${agama}%` };
      if (jenis_kegiatan)
        whereClause.jenis_kegiatan = { [Op.iLike]: `%${jenis_kegiatan}%` };

      const communities = await Community.findAll({ where: whereClause });

      return response(
        res,
        200,
        "Communities retrieved successfully",
        communities
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  async show(req, res) {
    try {
      const community = await Community.findByPk(req.params.id);
      if (!community)
        return res
          .status(404)
          .json({ success: false, message: "Community not found" });

      return response(res, 200, "Community retrieved successfully", community);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  async store(req, res) {
    try {
      const errors = validateCommunityInput(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validasi gagal",
          errors,
        });
      }

      const {
        name,
        agama,
        jenis_kegiatan,
        lokasi_kegiatan,
        phone_number,
        email_address,
        whatsapp_group_link,
        description,
      } = req.body;

      const logo_url = req.file ? `/uploads/${req.file.filename}` : null;

      const community = await Community.create({
        name,
        agama,
        jenis_kegiatan,
        lokasi_kegiatan,
        phone_number,
        email_address,
        whatsapp_group_link,
        description,
        logo_url,
      });

      return response(res, 201, "Community registered successfully", community);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ success: false, message: "Invalid data", error: err.message });
    }
  },

  async update(req, res) {
    try {
      const community = await Community.findByPk(req.params.id);
      if (!community)
        return res
          .status(404)
          .json({ success: false, message: "Community not found" });

      const errors = validateCommunityInput(req.body, true);
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Validasi gagal",
          errors,
        });
      }

      const {
        name,
        agama,
        jenis_kegiatan,
        lokasi_kegiatan,
        phone_number,
        email_address,
        whatsapp_group_link,
        description,
      } = req.body;

      const logo_url = req.file
        ? `/uploads/${req.file.filename}`
        : community.logo_url;

      await community.update({
        name,
        agama,
        jenis_kegiatan,
        lokasi_kegiatan,
        phone_number,
        email_address,
        whatsapp_group_link,
        description,
        logo_url,
      });

      return response(res, 201, "comunity updated successfuly", community);
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .json({ success: false, message: "Update failed", error: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const community = await Community.findByPk(req.params.id);
      if (!community)
        return res
          .status(404)
          .json({ success: false, message: "Community not found" });

      await community.destroy();
      return response(res, 200, "comunity deleted successfuly");
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Delete failed" });
    }
  },
};
