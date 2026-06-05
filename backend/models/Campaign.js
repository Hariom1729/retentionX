const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['DRAFT', 'SCHEDULED', 'ACTIVE', 'COMPLETED'], default: 'DRAFT' },
  content: { type: String },
  targetSegments: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
