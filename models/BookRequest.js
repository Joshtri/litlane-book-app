const mongoose = require('mongoose');

// Skema untuk BookReq
const BookReqSchema = new mongoose.Schema({
    book_req: {
        type: String,
        required: true
    },
    email_user: {
        type: String,
        required: true
    },
});

// Model untuk komentar
const BookReq = mongoose.model('BookReq', BookReqSchema);

module.exports = BookReq;