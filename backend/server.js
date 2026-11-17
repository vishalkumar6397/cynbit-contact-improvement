
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Inquiry Schema
const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true
    },
    company: {
      type: String,
      default: ""
    },
    industry: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

// Test API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cynbit Backend API is running!"
  });
});



// Submit Inquiry API
app.post("/api/inquiries", async (req, res) => {
  try {
    const { name, email, phone, company, industry, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number"
      });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      company,
      industry,
      message
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully!",
      data: inquiry
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB Connected Successfully");
    } else {
      console.log("MongoDB URI not configured yet");
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

startServer();
