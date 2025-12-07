require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/UserRoutes')


const PORT = process.env.PORT || 3500
const mongoString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@fitfusion.bl3ruao.mongodb.net/?retryWrites=true&w=majority&appName=FitFusion`

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(mongoString)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

// Routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});