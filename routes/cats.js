const express = require("express");
const Cat = require("../models/cat");
const db = require("../db");

const router = new express.Router();

// 40.3.3 Simple OO approach part 1
/** get all cats: [{id, name, age}, ...] */
router.get("/", async function (req, res, next) {
  try {
    const cats = await Cat.getAll()
    return res.json(cats)
  } catch(e) {
    return next(e)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const cat = await Cat.getById(req.params.id)
    return res.json(cat)    
  } catch(e) {
    return next(e)
  }
});

// 40.3.4 Simple OO approach part 2
router.post('/', async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const newCat = await Cat.create(name, age)
    return res.json(newCat)
  } catch(e) {
    return next(e)
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    await Cat.delete(req.params.id)
    return res.json({ message: "Cat deleted" })
  } catch(e) {
    return next(e)
  }
});

// 40.3.5 Simple OO approach part 3
router.put('/:id', async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.update(req.params.id, name, age) 
    return res.json(cat) 
  } catch(e) {
    return next(e)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const cat = await Cat.makeOlder(req.params.id) 
    return res.json(cat) 
  } catch(e) {
    return next(e)
  }  
})

module.exports = router;