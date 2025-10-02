const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Get post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Increment view count for a post
router.post('/:id/increment-view', async (req, res) => {
    try {
        console.log('Incrementing view for post ID:', req.params.id);
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log('Post not found for ID:', req.params.id);
            return res.status(404).json({ error: 'Post not found' });
        }
        post.viewCount = (post.viewCount || 0) + 1;
        await post.save();
        console.log('View count incremented to:', post.viewCount);
        res.json({ message: 'View count incremented', viewCount: post.viewCount });
    } catch (err) {
        console.error('Error incrementing view count:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create new post
router.post('/', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});


// Get related posts by category excluding current post
router.get('/related/:category/:currentPostId', async (req, res) => {
    try {
        const { category, currentPostId } = req.params;
        const relatedPosts = await Post.find({
            category: { $in: [category] },
            _id: { $ne: currentPostId },
            status: 'published'
        }).sort({ createdAt: -1 }).limit(4);
        res.json(relatedPosts);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
