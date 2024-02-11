const Subscriptor = require('../models/Subscriptor');
const mongoose = require('mongoose');



// Controller untuk menambahkan komentar baru
exports.createSubscriptor = async (req, res) => {
    try {
        const { subcribe_mail } = req.body;

        // Membuat komentar baru
        const newSubscriptor = new Subscriptor({
            email_subscriptor: subcribe_mail
        });

        // Menyimpan komentar baru ke dalam basis data
        await newSubscriptor.save();

        await req.flash('SubscribeInfo', 'Subscribe Berhasil :)')

        res.redirect(`/main`)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan komentar' });
    }
};
