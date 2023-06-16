const express = require('express');
const ExpressError = require('./expressError');
const router = new express.Router();
const items = require('./fakeDb');

router.get("/", (req, res, next) => {
    try {
        return res.json({ items });
    } catch (e) {
        return next(e);
    }
});

router.post("/", (req, res, next) => {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError("Name and price are required", 400);
        let newItem = { name: req.body.name, price: req.body.price };
        items.push(newItem);
        return res.json({ added: newItem });
    } catch (e) {
        return next(e);
    }
});

// Get an item by name

module.exports = router;