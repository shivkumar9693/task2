const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Dashboard Page - Display All Products
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.render("dashboard", { products });
});

// Product Details Page
router.get("/product/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("productDetails", { product });
});

// Route to Show Add Product Page
router.get("/add-product", (req, res) => {
    res.render("addProduct");
});

// Route to Handle New Product Submission
router.post("/add-product", async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        await Product.create({ title, description, price, image });
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to Show Edit Product Page
router.get("/edit-product/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render("editProduct", { product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to Handle Product Update
router.post("/update-product/:id", async (req, res) => {
    try {
        const { title, description, price, image } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { title, description, price, image });
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to Handle Product Deletion
router.delete("/delete-product/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false });
    }
});

module.exports = router;
