// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const folderRoutes = require('./routes/folderRoutes');
const imageRoutes = require('./routes/imageRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const { connecctDB } = require('./config/dbConfig');
const cors=require("cors")

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
connecctDB();
app.use('/api', userRoutes);
app.use('/api/folders', authMiddleware, folderRoutes);
app.use('/api/images', authMiddleware, imageRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

