const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Organization = require('../models/Organization');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
  const { name, email, password, organizationName } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    let org = new Organization({ name: organizationName || 'Default Org' });
    await org.save();

    user = new User({ name, email, password, organizationId: org._id });
    await user.save();

    const payload = { user: { id: user.id, organizationId: org._id, role: 'ADMIN' } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '10h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { user: { id: user.id, organizationId: user.organizationId, role: user.role || 'USER' } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '10h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
