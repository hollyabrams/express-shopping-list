const express = require('express')
const router = new express.Router()
const ExpressError = require('../expressError')
const items = require('../fakeDb')


// GET /items - this renders a list of shopping items.
router.get('/', (req, res) => {
    return res.json(items);
});


// POST /items - this accepts JSON data and adds it to the shopping list.
router.post('/', (req, res) => {
    let newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
});


// GET /items/:name - this route displays a single item's name and price.
router.get('/:name', (req, res) => {
    const itemName = items.find(item => item.name === req.params.name);
    if(itemName === undefined) {
        throw new ExpressError('Item not found', 404)
    }
    return res.json({ item: itemName });
});


router.patch("/:name", (req, res) => {
    const itemName = req.params.name;
    const patchedItem = {
      name: req.body.name,
      price: req.body.price,
    };
    for (let i = 0; i <= items.length; i++) {
      if (itemName === items[i].name) {
        items.splice(i, 1);
        items.push(patchedItem);
        return res.status(200).json({ updated: patchedItem });
      }
    }
    return res.json({ error: `${itemName} is not on your list.` });
  });


// DELETE /items/:name - this route will allow you to delete an item from the array.
router.delete('/:name', (req, res) => {
    const itemName = items.findIndex(item => item.name === req.params.name);
    if (itemName === -1) {
        throw new ExpressError ('Item not found', 404);
    }
    items.splice(itemName, 1);
    return res.json({ message: 'Deleted' });
});

module.exports = router;
