const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// Basic route
app.get('/', (req, res) => {
    res.send('MERN Blog Backend is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Export the app for Vercel serverless functions
module.exports = app;

// Start server locally if not in Vercel environment
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
