require('dotenv').config(); // Load environment variables
const cors = require('cors');
const express = require('express');
const connectDB = require('./db'); // Import the database connection
const { swaggerUi, swaggerDocs } = require('./swagger'); // Import Swagger setup
const app = express(); 
const port = 3000; 

// Enable CORS for all routes
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
}));

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth'); // Import the auth routes
const profileRoutes = require('./routes/profile'); // Import the profile routes
const orderRoutes = require('./routes/orders'); // Import the order routes

// Use routes
app.use('/products', productRoutes);
app.use('/auth', authRoutes); // Use the auth routes
app.use('/profile', profileRoutes); // Use the profile routes

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the eCommerce API');
});

// Use the order routes
app.use('/orders', orderRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
