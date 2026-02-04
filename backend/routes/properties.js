const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Property = require('../models/Property');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images only!');
        }
    }
});

// Get all properties
router.get('/', async(req, res) => {
    try {
        const properties = await Property.find().populate('owner', 'name email');
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get property by ID
router.get('/:id', async(req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'name email');
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new property (owners only)
router.post('/', auth, upload.array('images', 10), [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('location').notEmpty().withMessage('Location is required'),
    body('type').isIn(['sale', 'rent']).withMessage('Type must be sale or rent'),
    body('bedrooms').isNumeric().withMessage('Bedrooms must be a number'),
    body('bathrooms').isNumeric().withMessage('Bathrooms must be a number'),
    body('area').isNumeric().withMessage('Area must be a number')
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log('Add property request by user:', req.user);
    const role = (req.user && req.user.role) ? String(req.user.role).toLowerCase() : '';
    if (!['owner', 'seller'].includes(role)) {
        console.warn('Blocked add-property: role=', role);
        return res.status(403).json({ message: 'Only owners/sellers can add properties' });
    }

    const { title, description, price, location, type, bedrooms, bathrooms, area } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        const property = new Property({
            title,
            description,
            price,
            location,
            type,
            bedrooms,
            bathrooms,
            area,
            images,
            owner: req.user.id
        });

        await property.save();
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update property (owner only)
router.put('/:id', auth, upload.array('images', 10), async(req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updates = req.body;
        if (req.files) {
            updates.images = req.files.map(file => file.path);
        }

        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(updatedProperty);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete property (owner only)
router.delete('/:id', auth, async(req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Property.findByIdAndDelete(req.params.id);
        res.json({ message: 'Property deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get properties by owner
router.get('/owner/:ownerId', async(req, res) => {
    try {
        const properties = await Property.find({ owner: req.params.ownerId });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;