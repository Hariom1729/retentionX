const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Organization = require('../models/Organization');

// GET /api/organizations/branding
router.get('/branding', auth, async (req, res) => {
  try {
    const org = await Organization.findById(req.user.organizationId);
    if (!org) return res.status(404).json({ msg: 'Organization not found' });
    
    res.json({
      name: org.name,
      branding: org.branding || {},
      customDomain: org.customDomain || null
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT /api/organizations/branding
router.put('/branding', auth, async (req, res) => {
  try {
    const { branding, customDomain, name } = req.body;
    
    const org = await Organization.findByIdAndUpdate(
      req.user.organizationId,
      { $set: { branding, customDomain, name } },
      { new: true }
    );
    
    res.json(org);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
