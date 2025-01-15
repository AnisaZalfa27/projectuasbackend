require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api/patients'); 

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes); // Menambahkan routing API

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
