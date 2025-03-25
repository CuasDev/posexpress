require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./db'); // Import the database connection
const { swaggerUi, swaggerDocs } = require('./swagger'); // Import Swagger setup
const app = express();
const port = 3000;

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

// Use routes
app.use('/products', productRoutes);
app.use('/auth', authRoutes); // Use the auth routes
app.use('/profile', profileRoutes); // Use the profile routes

app.get('/', (req, res) => {
    res.send('Welcome to the eCommerce API');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
