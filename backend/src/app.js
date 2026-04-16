import express from "express";
import cors from "cors";
import predictRoutes from "./routes/predict.js";

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is working!");
});

// ✅ TEST ROUTE
app.get("/test", (req, res) => {
  res.json({ message: "Test route working!" });
});

// ✅ API ROUTES
app.use("/api", predictRoutes);

// 🔥 START SERVER
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});