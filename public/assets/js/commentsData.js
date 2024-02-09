function getComments() {
    // Ambil nilai bookId dari elemen HTML
    // const bookId = "65bdf707dcff6ba9a6404574";
    // // const bookId = document.getElementById("bookId").value;
    // // Tentukan URL backend dengan menggunakan bookId
    // const backendURL = `http://localhost:3005/get_comments/${bookId}`;
    const bookId = document.getElementById("bookId").value;
    const backendURL = `https://litlane-book-app.vercel.app/get_comments/${bookId}`;
    //https://litlane-book-app.vercel.app/
    fetch(backendURL) // Gunakan URL backend
    .then(response => response.json())
    .then(result => {
        var commentSection = document.getElementById("commentSection");

        commentSection.innerHTML = ""; // Kosongkan div komentar sebelum menambahkan yang baru
        result.forEach(comment => {
            commentSection.innerHTML += `
            <div class="media mt-3">
                <div class="d-flex">
                    <img src="https://via.placeholder.com/50" class="mr-3 rounded-circle" style="width: 50px; height: 50px;" alt="...">
                    <div class="media-body ps-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="mt-0">Anonymous - ${comment.user}</h6>
                            <small><sub class="ms-1 text-muted" id="id_komentar" style="font-size: 12px;">${comment.createdAt}</sub></small>
                        </div>
                        <p>${comment.comments_text}</p>
                    </div>
                </div>
            </div>
            `;
        });
    })
    .catch(error => console.log('Error:', error));
}

// Panggil fungsi getComments saat halaman dimuat
getComments();

// Panggil fungsi getComments secara berkala setiap beberapa detik
setInterval(getComments, 5000);


// document.getElementById("commentForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Mencegah form dari melakukan submit default

//     var postedBookId = document.getElementById("postedBookId").value;
//     var commentText = document.getElementById("commentInput").value; // Mengakses textarea dengan ID commentInput

//     var requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ posted_book_id: postedBookId, comments_text: commentText }),
//         redirect: 'follow'
//     };

//     fetch("https://litlane-book-app.vercel.app/comments", requestOptions)
//     .then(response => response.text())
//     .then(result => {
//         console.log('Comment successfully submitted:', result);
//         getComments(); // Panggil fungsi getComments untuk memperbarui daftar komentar setelah komentar baru ditambahkan
//         // Reset textarea setelah berhasil mengirim komentar
//         document.getElementById("commentInput").value = "";

//         // Tampilkan notifikasi kirim komentar berhasil
//         var notificationHtml = `
//             <div class="alert alert-success alert-dismissible fade show" role="alert">
//                 Komentar berhasil dikirim!
//                 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//             </div>
//         `;
//         document.getElementById("notificationArea").innerHTML = notificationHtml;

//         // Set timeout untuk menutup notifikasi setelah 5 detik
//         setTimeout(function() {
//             var notificationArea = document.getElementById("notificationArea");
//             var alertElement = notificationArea.querySelector(".alert");
//             alertElement.classList.remove("show");
//             setTimeout(function() {
//                 notificationArea.innerHTML = ""; // Hapus notifikasi setelah animasi fade out selesai
//             }, 1000); // Tunggu 1 detik setelah animasi fade out selesai
//         }, 5000); // Set timeout selama 5 detik
        
//     })
//     .catch(error => console.error('Error:', error));
// });

document.getElementById("commentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form dari melakukan submit default

    var submitBtn = document.getElementById("submitBtn");
    var loadingIndicator = document.getElementById("loadingIndicator");

    // Tampilkan keterangan loading dan sembunyikan tombol "Kirim"
    submitBtn.style.display = "none";
    loadingIndicator.style.display = "block";

    var postedBookId = document.getElementById("postedBookId").value;
    var commentText = document.getElementById("commentInput").value;

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ posted_book_id: postedBookId, comments_text: commentText }),
        redirect: 'follow'
    };

    fetch("https://litlane-book-app.vercel.app/comments", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log('Comment successfully submitted:', result);
        getComments();
        document.getElementById("commentInput").value = "";

        // Sembunyikan keterangan loading dan tampilkan tombol "Kirim" kembali
        submitBtn.style.display = "block";
        loadingIndicator.style.display = "none";

        // Tampilkan notifikasi kirim komentar berhasil
        var notificationHtml = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Komentar berhasil dikirim!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        document.getElementById("notificationArea").innerHTML = notificationHtml;

        setTimeout(function() {
            var notificationArea = document.getElementById("notificationArea");
            var alertElement = notificationArea.querySelector(".alert");
            alertElement.classList.remove("show");
            setTimeout(function() {
                notificationArea.innerHTML = ""; // Hapus notifikasi setelah animasi fade out selesai
            }, 1000); // Tunggu 1 detik setelah animasi fade out selesai
        }, 5000); // Set timeout selama 5 detik
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Jika terjadi kesalahan, kembalikan tampilan tombol "Kirim"
        submitBtn.style.display = "block";
        loadingIndicator.style.display = "none";
    });
});



// Fungsi untuk mendapatkan total komentar secara dinamis
function getTotalComments() {
    const bookId = document.getElementById("bookId").value;
    const postedBookId = bookId; // Ganti dengan posted_book_id yang sesuai
    fetch(`/get_total_comments/${postedBookId}`)
        .then(response => response.text())
        .then(total => {
            document.getElementById("totalCommentsValue").textContent = total;
        })
        .catch(error => console.error('Error fetching total comments:', error));
}

// Panggil fungsi getTotalComments saat halaman dimuat
getTotalComments();

// Panggil fungsi getTotalComments secara berkala setiap beberapa detik
setInterval(getTotalComments, 5000); // Contoh: pembaruan setiap 5 detik