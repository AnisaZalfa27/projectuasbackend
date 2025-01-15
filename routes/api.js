const express = require('express');
const router = express.Router();

// Import controller
const patientController = require('../controllers/PatientController');

// Routes
router.get('/patients', patientController.getAllPatients);
router.post('/patients', patientController.addPatient);
router.put('/patients/:id', patientController.updatePatient);
router.delete('/patients/:id', patientController.deletePatient);
router.get('/patients/:id', patientController.getPatientDetail);
router.get('/patients/search/:name', patientController.searchPatientByName);
router.get('/patients/status/positive', patientController.getPositivePatients);
router.get('/patients/status/recovered', patientController.getRecoveredPatients);
router.get('/patients/status/dead', patientController.getDeadPatients);

module.exports = router;
