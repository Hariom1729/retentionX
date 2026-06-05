const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  resourceId: { type: String },
  details: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
