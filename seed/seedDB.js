require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error("MONGO_URI is missing! Check your .env file.");
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const seedProducts = [
    {
        title: "Classic Omelette",
        description: "A simple yet delicious omelette with cheese and herbs.",
        price: 5.99,
        image: "https://www.simplyquinoa.com/wp-content/uploads/2023/03/egg-white-omelet-1-1024x1536.jpg",
    },
    {
        title: "Eggs Benedict",
        description: "Poached eggs on English muffins with hollandaise sauce.",
        price: 8.99,
        image: "https://s23209.pcdn.co/wp-content/uploads/2022/09/220602_DD_Eggs-Benedict_368-1200x1200-cropped.jpg"
    },
    {
        title: "Scrambled Eggs",
        description: "Creamy scrambled eggs with butter and chives.",
        price: 4.99,
        image: "https://th.bing.com/th/id/OIP.b1HzNAWgXfJ5ZoRaj9SKxgHaEo?rs=1&pid=ImgDetMain"
    }
];

const seedDB = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(seedProducts);
        console.log("Database Seeded Successfully");
    } catch (error) {
        console.error("Seeding Error:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
