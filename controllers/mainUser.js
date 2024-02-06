const Book = require('../models/Book');
const { getStorage, deleteObject, ref, list ,uploadBytesResumable, getDownloadURL } = require('firebase/storage')


const storageFB = getStorage();


//** jangan lupa ubah nama function utk laman utama atau welcome pagenya. */
exports.mainUserPage = (req,res)=>{
    const locals = {
        title : "Litlane Book",
        description : "Litlane Book - Welcome Page"
    }

    res.render('index',
    {
        locals
    });
}


exports.mainBookPage = async (req, res) => {
    try {
        const books = await Book.find();

        // Menyiapkan data untuk ditampilkan di tabel
        const dataForTable = await Promise.all(books.map(async (item) => {
            const fileName = item.book_cover;
            const storageRef = ref(storageFB, fileName);
            const imageUrl = await getDownloadURL(storageRef);

            return {
                ...item.toObject(),  // Spread operator untuk menyertakan semua properti dari objek buku
                imageUrl,
            };
        }));

        res.render('main_PageBook', {
            books: dataForTable,
        });

    } catch (error) {
        console.log(error);
    }
}

exports.detailBookUser = async (req,res)=>{

    try {
        res.render('book_detailUser')
    } catch (error) {
        console.log(error);
    }
}