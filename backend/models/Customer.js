const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  joinDate: { type: Date, required: true },
  lastPurchaseDate: { type: Date, required: true },
  purchaseCount: { type: Number, required: true, default: 0 },
  revenue: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Customer', CustomerSchema);
