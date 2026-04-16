import axios from "axios";

export const getPrediction = async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    // Call Python ML API
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      req.body
    );

    console.log("📤 ML Response:", response.data);

    res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error("❌ Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to connect to ML API"
    });
  }
};