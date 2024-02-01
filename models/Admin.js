const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    username: {
        type : String, 
        required : true,
        
    },

    email : {
        type: String,
        required: true,
        unique: true
    },

    password : {
        type : String, 
        required : true,
    },
    // role: {
    //     type: String,
    //     enum: ['admin', 'manager'], // Hanya nilai 'admin' atau 'manager' yang diperbolehkan
    //     default: 'admin', // Nilai default jika tidak disediakan
    // },
    
}, {timestamps: true});


module.exports = mongoose.model('Admin', AdminSchema)

