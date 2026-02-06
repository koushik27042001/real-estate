const express = require('express');
const User = require('../models/User');
const Property = require('../models/Property');
const { auth, roleAuth } = require('../middleware/auth');

const router = express.Router();

// Get current user's wishlist (populated) - buyers only
router.get('/', auth, roleAuth(['buyer']), async(req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ wishlist: user.wishlist || [] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add property to wishlist - buyers only
router.post('/', auth, roleAuth(['buyer']), async(req, res) => {
    try {
        const { propertyId } = req.body;
        if (!propertyId) return res.status(400).json({ message: 'propertyId is required' });

        const property = await Property.findById(propertyId);
        if (!property) return res.status(404).json({ message: 'Property not found' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // avoid duplicates
        const exists = user.wishlist && user.wishlist.find(id => id.toString() === propertyId.toString());
        if (!exists) {
            user.wishlist = user.wishlist || [];
            user.wishlist.push(propertyId);
            await user.save();
        }

        const populated = await User.findById(req.user.id).populate('wishlist');
        res.json({ wishlist: populated.wishlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove property from wishlist - buyers only
router.delete('/:propertyId', auth, roleAuth(['buyer']), async(req, res) => {
    try {
        const { propertyId } = req.params;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.wishlist = (user.wishlist || []).filter(id => id.toString() !== propertyId.toString());
        await user.save();

        const populated = await User.findById(req.user.id).populate('wishlist');
        res.json({ wishlist: populated.wishlist });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;