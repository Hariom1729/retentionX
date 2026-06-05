const express = require('express');
const router = express.Router();

let config = {
  primaryColor: '#2563eb',
  logoUrl: '',
  orgName: 'My Company'
};

router.get('/', (req, res) => {
  res.json(config);
});

router.post('/', (req, res) => {
  config = { ...config, ...req.body };
  res.json({ message: 'Settings saved', config });
});

module.exports = router;
