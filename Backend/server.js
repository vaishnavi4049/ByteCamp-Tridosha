const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const chatbotRoutes = require("./routes/chatbot");

const app = express();

// CORS (ONLY THIS ONE)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Connect Database
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bytecamp";
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.get("/", (req, res) => res.send("API Running"));

app.use("/api/auth", authRoutes);
app.use("/api/history", require("./routes/history"));
app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);