const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all browsers
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fimo';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
    id: Number,
    number: String,
    title: String,
    url: String,
    shop: Boolean,
    card: Boolean,
    like: Boolean,
    price: { type: Number, default: 0 }
});

const Product = mongoose.model('Product', productSchema);

const fs = require('fs');
const path = require('path');

// API Routes
app.get('/api/products', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const products = await Product.find();
            if (products.length > 0) {
                return res.json(products);
            }
        }
        
        // Fallback to local JSON if MongoDB is not connected or empty
        const dataPath = path.join(__dirname, 'data', 'products.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const products = JSON.parse(rawData);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to seed initial data from JSON
app.post('/api/products/seed', async (req, res) => {
    try {
        const initialData = req.body;
        await Product.deleteMany({}); // Clear existing
        const products = await Product.insertMany(initialData);
        res.status(201).json({ message: 'Data seeded successfully', count: products.length });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('FIMO Universal Backend is Running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
