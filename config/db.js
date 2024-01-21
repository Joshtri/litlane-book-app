const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Tambahkan opsi timeout di sini (misalnya, 30 detik)
            serverSelectionTimeoutMS: 100000,
        });

        console.log(`Database connected. ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectDB;
