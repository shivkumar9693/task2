const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Dashboard Page
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.render("dashboard", { products });
});

// Product Details Page
router.get("/product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("productDetails", { product });
});

module.exports = router;
