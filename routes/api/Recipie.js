const express = require('express');
const router = express.Router();

// Item Model
const Recipie = require('../../models/Recipie');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Recipie.find()
        .then(items => res.json(items));
});

router.get('/:id', (req, res) => {
    Recipie.find({ _id: req.params.id })
        .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Should check if item exists based on name and replace if necessary
// @access  Public
router.post('/', (req, res) => {
    const fields = req.fields;
    const file = req.files
    const newItem = {
        title: fields.title,
        author: fields.author,
        ingredients: fields.ingredients,
        directions: fields.directions,
        time: fields.time,
        rating: fields.rating,
        cost: fields.cost,
        image: fields.image
    }
    if (req.body._id) {
        Recipie.findOneAndUpdate({ _id: fields._id }, newItem, { upsert: true })
            .then(items => res.json(items));
    } else {
        Recipie.findOneAndUpdate({ title: fields.title }, newItem, { upsert: true })
            .then(items => {
                if (items) {
                    res.json(items)
                } else {
                    Recipie.find()
                        .then(items => res.json(items));
                }
            });
    }
});

router.delete('/:id', (req, res) => {
    Recipie.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;