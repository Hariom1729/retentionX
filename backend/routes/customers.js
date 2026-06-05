const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', auth, async (req, res) => {
  try {
    const customer = new Customer({ ...req.body, organizationId: req.user.organizationId });
    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ organizationId: req.user.organizationId });
    res.json(customers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, organizationId: req.user.organizationId });
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, organizationId: req.user.organizationId },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id, organizationId: req.user.organizationId });
    if (!customer) return res.status(404).json({ msg: 'Customer not found' });
    res.json({ msg: 'Customer deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// 3. Customer Health Engine (0-100 score)
router.get('/:id/health', auth, async (req, res) => {
  try {
    const purchases = await prisma.event.count({
      where: { customerId: req.params.id, eventType: 'purchase', organizationId: req.user.organizationId }
    });
    const logins = await prisma.event.count({
      where: { customerId: req.params.id, eventType: 'login', organizationId: req.user.organizationId }
    });
    
    let score = 50 + (purchases * 10) + (logins * 2);
    score = Math.min(100, Math.max(0, score));
    
    const profile = await prisma.customerProfile.upsert({
      where: { organizationId_customerId: { organizationId: req.user.organizationId, customerId: req.params.id } },
      update: { healthScore: score },
      create: { organizationId: req.user.organizationId, customerId: req.params.id, healthScore: score }
    });
    
    res.json({ healthScore: score, profile });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// 5. Expose endpoints for Customer 360 profiles (Timeline & Comm History)
router.get('/:id/360', auth, async (req, res) => {
  try {
    const profile = await prisma.customerProfile.findUnique({
      where: { organizationId_customerId: { organizationId: req.user.organizationId, customerId: req.params.id } }
    });
    const events = await prisma.event.findMany({
      where: { customerId: req.params.id, organizationId: req.user.organizationId },
      orderBy: { timestamp: 'desc' }
    });
    
    res.json({
      customerId: req.params.id,
      healthScore: profile?.healthScore || 100,
      timeline: profile?.timeline || events,
      communicationHistory: profile?.communicationHistory || []
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
