const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config'); // Mengimpor konfigurasi dari config.js

// Menggunakan konfigurasi dari config.js untuk membuat koneksi ke database
const sequelize = new Sequelize({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  dialect: 'mysql',  // Menyebutkan tipe database
});

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  in_date_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  out_date_at: {
    type: DataTypes.DATE,
  }
}, {
  tableName: 'patients',
  timestamps: false,
});

module.exports = Patient;
