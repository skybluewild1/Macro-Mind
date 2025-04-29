require('dotenv').config();
require('./models/Exercise');
const express = require('express');
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Database connection
/*mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database not connected', err));
*/

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database Connected');
        console.log('Using DB:', mongoose.connection.name);  // Add this
    })
    .catch((err) => console.log('Database not connected', err));

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',  // Frontend origin
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/api/food', require('./routes/foodRoutes'));
app.use('/api', require('./routes/premadeWorkoutRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/exerciseRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
