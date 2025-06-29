const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Community = sequelize.define(
  "Community",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agama: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jenis_kegiatan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lokasi_kegiatan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whatsapp_group_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "communities",
    timestamps: false,
  }
);

module.exports = Community;
