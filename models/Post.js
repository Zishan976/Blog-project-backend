const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String },
    publish_on: { type: Date },
    is_featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    category: [{ type: String }],
    author: { type: String },
    summary: { type: String },
    meta_description: { type: String },
    content: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
    viewCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
