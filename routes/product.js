const Product = require("../models/Product");
const { verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Removed.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCat = req.query.category;
  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ _id: -1 }).limit(5);
    } else if (queryCat) {
      products = await Product.find({
        categories: {
          $in: [queryCat],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
