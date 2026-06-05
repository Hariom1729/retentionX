const express = require('express');
const router = express.Router();

const MOCK_LOGS = [
  { id: 1, user: 'alice@example.com', action: 'EXPORT_DATA', resource: 'Customer Table', timestamp: '2026-06-05 10:23:41', ip: '192.168.1.42', status: 'Success' },
  { id: 2, user: 'bob@example.com', action: 'DELETE_CAMPAIGN', resource: 'Campaign ID 42', timestamp: '2026-06-05 09:12:15', ip: '10.0.0.12', status: 'Success' },
];

router.get('/', (req, res) => {
  res.json(MOCK_LOGS);
});

module.exports = router;
