const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['sale', 'rent'], required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true }, // in sq ft
    images: [{ type: String }], // array of image URLs or paths
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['available', 'sold', 'rented'], default: 'available' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);