const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const chatbotRoutes = require("./routes/chatbot");
const app = express();

// Connect Database
const connectDB = async () => {
  try {
    // Connect to local MongoDB by default
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bytecamp';
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// Adjust CORS to allow the React app
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/history', require('./routes/history'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
