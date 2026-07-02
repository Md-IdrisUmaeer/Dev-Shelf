const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

router.get('/', async (req, res) => {
    try {
        const resources = await Resource.find();

        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, url, category, imageUrl } = req.body;

        const newResource = await Resource.create({ title, description, url, category, imageUrl });

        res.status(201).json(newResource);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id/like', async (req, res) => {
    try {
        const { id } = req.params;

        const resource = await Resource.findByIdAndUpdate(
            id,
            { $inc: { likes: 1 } },
            { returnDocument: 'after' }
        );

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id/unlike', async (req, res) => {
    try {
        const { id } = req.params;

        const updatedResource = await Resource.findByIdAndUpdate(
            id,
            { $inc: { likes: -1 } },
            { returnDocument: 'after' }
        );

        if (!updatedResource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        res.json(updatedResource);

    } catch (error) {
        res.status(500).json({ message: "Error unliking resource", error });
    }
});


module.exports = router;