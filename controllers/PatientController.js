const { Op } = require('sequelize');
const Patient = require('../models/Patients'); // Pastikan path ke model benar

// Fungsi untuk mendapatkan semua pasien
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll(); // Mengambil semua pasien dari database
    if (patients.length === 0) {
      return res.status(200).json({ message: 'No patients found' });
    }
    res.status(200).json({ message: 'Patients fetched successfully', data: patients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk menambah pasien
exports.addPatient = async (req, res) => {
  const { name, phone, address, status, in_date_at, out_date_at } = req.body;
  try {
    if (!name || !phone || !address || !status || !in_date_at) {
      return res.status(422).json({ message: 'All fields must be filled' });
    }
    const newPatient = await Patient.create({ name, phone, address, status, in_date_at, out_date_at });
    res.status(201).json({ message: 'Patient added successfully', data: newPatient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mengupdate pasien
exports.updatePatient = async (req, res) => {
  const patientId = req.params.id;
  const { name, phone, address, status, in_date_at, out_date_at } = req.body;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.update({ name, phone, address, status, in_date_at, out_date_at });
    res.status(200).json({ message: 'Patient updated successfully', data: patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk menghapus pasien
exports.deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.destroy();
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mendapatkan detail pasien
exports.getPatientDetail = async (req, res) => {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient details fetched successfully', data: patient });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mencari pasien berdasarkan nama
exports.searchPatientByName = async (req, res) => {
  const name = req.params.name;
  try {
    const patients = await Patient.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
    if (patients.length === 0) {
      return res.status(200).json({ message: 'No patients found' });
    }
    res.status(200).json({ message: 'Search result', data: patients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mendapatkan pasien dengan status positif
exports.getPositivePatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({ where: { status: 'positive' } });
    res.status(200).json({ message: 'Positive patients fetched successfully', data: patients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mendapatkan pasien dengan status sembuh
exports.getRecoveredPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({ where: { status: 'recovered' } });
    res.status(200).json({ message: 'Recovered patients fetched successfully', data: patients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mendapatkan pasien yang sudah meninggal
exports.getDeadPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({ where: { status: 'dead' } });
    res.status(200).json({ message: 'Dead patients fetched successfully', data: patients });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
