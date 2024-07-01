const mongoose = require('mongoose');

const policyInfoSchema = new mongoose.Schema({
    policyNumber: String,
    policyStartDate: Date,
    policyEndDate: Date,
    policyCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' },
    policyCarrierId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('PolicyInfo', policyInfoSchema);
