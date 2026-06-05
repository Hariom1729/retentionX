const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 4. NL-to-SQL backend route
router.post('/query', auth, async (req, res) => {
  try {
    const { query } = req.body;
    const orgId = req.user.organizationId;
    
    // Mock LLM Generator parsing NL to SQL
    const mockSql = `SELECT * FROM "Event" WHERE "eventType" = 'purchase' AND "organizationId" = '${orgId}' LIMIT 10;`;
    
    // Execute mock SQL using Prisma raw query
    let result = [];
    try {
      result = await prisma.$queryRawUnsafe(mockSql);
    } catch (e) {
      console.error("Mock DB not connected or error", e);
    }
    
    res.json({
      naturalLanguageQuery: query,
      generatedSql: mockSql,
      results: result
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
