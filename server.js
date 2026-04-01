const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config();

const app = express();

/* Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Static files */
app.use(express.static("public"));

/* View engine */
app.set("view engine", "ejs");

/* Session */
app.use(
  session({
    secret: "bookstore_secret",
    resave: false,
    saveUninitialized: true
  })
);

/* MongoDB connection */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.log("⚠️ MONGO_URI not found. Running without DB...");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB connected successfully");
    })
    .catch((err) => {
      console.log("❌ MongoDB connection error:", err);
    });
}

/* Routes */
app.get("/", (req, res) => {
  res.render("home");
});

const customerRoutes = require("./routes/customerRoutes");
app.use("/customer", customerRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/feedback", feedbackRoutes);

const uploadBookRoutes = require("./routes/upload_book");
app.use("/", uploadBookRoutes);

const customerBookRoutes = require("./routes/customerBookRoutes");
app.use("/", customerBookRoutes);

/* Server */
const PORT = process.env.PORT || 3000;

/* 🔥 IMPORTANT FIX */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
