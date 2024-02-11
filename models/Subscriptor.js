const mongoose = require('mongoose');

// Skema untuk komentar
const subscriptorSchema = new mongoose.Schema({
    // user: {
    //     type: String,
    //     required: true
    // },

    email_subscriptor :{
        type : String,
        required : true
    } 
}, {timestamps:true});

// Model untuk Subscriptor
const Subscriptor = mongoose.model('Subscriptor', subscriptorSchema);

module.exports = Subscriptor;