
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://cynbit-contact-improvement.vercel.app"
];

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (e.g. Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

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
      required: true,
      trim: true
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
      required: true,
      trim: true
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

    // Required fields validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number"
      });
    }

    // Save inquiry in MongoDB
    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      company,
      industry,
      message
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully!",
      data: inquiry
    });

  } catch (error) {
    console.error("Inquiry submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
