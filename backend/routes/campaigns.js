const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/campaigns
router.post('/', auth, async (req, res) => {
  try {
    const { name, status, content, targetSegments } = req.body;
    
    const campaign = await prisma.campaign.create({
      data: {
        organizationId: req.user.organizationId,
        name,
        status: status || 'DRAFT',
        content,
        targetSegments: targetSegments || {}
      }
    });
    
    res.json(campaign);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { organizationId: req.user.organizationId }
    });
    res.json(campaigns);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
