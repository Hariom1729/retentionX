const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branding: { type: Object },
  customDomain: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
