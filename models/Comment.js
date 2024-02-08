    const mongoose = require('mongoose');

    // Skema untuk komentar
    const commentSchema = new mongoose.Schema({
        user: {
            type: String,
            required: true
        },
        
        
        posted_book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book', // Merujuk ke model Buku
            required: true
        },
        
        comments_text: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    // Model untuk komentar
    const Comment = mongoose.model('Comment', commentSchema);

    module.exports = Comment;