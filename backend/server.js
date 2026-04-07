const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (VERY IMPORTANT for checking deployment)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Example API route
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working ✅" });
});

// ============================
// Your routes (if you have)
// ============================
const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

// ============================
// PORT (IMPORTANT FOR RENDER)
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});