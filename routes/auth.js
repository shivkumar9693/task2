const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Product = require('../models/Product'); // Import the Product model
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
  });
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});
router.get("/dashboard",async(req,res)=>{
  try {
    const products = await Product.find(); // Fetch products from DB
    res.render("dashboard", { products }); // Pass products to EJS
} catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
}
})

router.post('/signup', [
  body('username').trim().isLength({ min: 3 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    res.redirect('/dashboard');
    
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;