const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');

router.post('/churn', auth, async (req, res) => {
  try {
    const response = await axios.post('http://localhost:8000/predict', req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to proxy prediction request' });
  }
});

module.exports = router;
