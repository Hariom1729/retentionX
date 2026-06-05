require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auditMiddleware = require('./middleware/audit');

const app = express();
app.use(cors());
app.use(express.json());
app.use(auditMiddleware); // Global audit log

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/retentionx';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/predict', require('./routes/predict'));
app.use('/api/nl-sql', require('./routes/nl_sql'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/audit-logs', require('./routes/audit_logs'));
app.use('/api/white-label', require('./routes/white_label'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/organizations', require('./routes/organizations'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
