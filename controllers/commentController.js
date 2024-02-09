const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.commentsPageView = async (req, res) => {
    const locals = {
        title: 'Data Comment',
        description: 'Data Comment of IS Selling'
    }
    let perPage = 12;
    let page = req.query.page || 1;

    try {
        const comments = await Comment.aggregate([
            { $sort: { createdAt: -1 } },
            { $skip: perPage * page - perPage },
            { $limit: perPage },
            {
                $lookup: {
                    from: 'books', // Nama koleksi dari tabel buku
                    localField: 'posted_book_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            { $unwind: '$book' } // Mengurai array hasil join
        ]).exec();

        const count = await Comment.countDocuments({});

        res.render('data_comment', {
            locals,
            comments,
            current: page,
            pages: Math.ceil(count / perPage),
        });
    } catch (error) {
        console.log(error);
    }
};


exports.deleteComment = async(req,res)=>{
    try {

        await Comment.deleteOne({_id:req.params.id});

        res.redirect('/mdERQU0pnVpHd08ifQ_comments/adm/data_comment')

    } catch (error) {
        console.log(error);
    }
}