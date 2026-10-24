const express = require('express');
const tripRouter = require('./routes/tripRoutes');

const app = express();
app.use(express.json());
app.use('/', tripRouter);
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;
