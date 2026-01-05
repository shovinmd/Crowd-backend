require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const predictRoutes = require("./routes/predict.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const authRoutes = require("./routes/auth.routes");
const networkRoutes = require("./routes/network.routes");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/predict", predictRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/network", networkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
