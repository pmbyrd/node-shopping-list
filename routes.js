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

router.get("/:name", (req, res, next) => {
    try {
        let item = items.find(item => item.name === req.params.name);
        if (!item) throw new ExpressError("Item not found", 404);
        return res.json({ item });
    } catch (e) {
        return next(e);
    }
});

router.patch("/:name", (req, res, next) => {
    try {
        let item = items.find(item => item.name === req.params.name);
        if (!item) throw new ExpressError("Item not found", 404);
        if (!req.body.name || !req.body.price) throw new ExpressError("Name and price are required", 400);
        item.name = req.body.name;
        item.price = req.body.price;
        return res.json({ updated: item });
    } catch (e) {
        return next(e);
    }
});

router.delete("/:name", (req, res, next) => {
    try {
        const item = items.findIndex(item => item.name === req.params.name);
        if (item === -1) throw new ExpressError("Item not found", 404);
        items.splice(item, 1);
        return res.json({ message: "Deleted" });    
    } catch (error) {
        return next(error);
    }
});

// Get an item by name

module.exports = router;