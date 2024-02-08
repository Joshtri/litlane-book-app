// https://node-app-mongo-db-shpn.vercel.app
function getComments() {
fetch("http://localhost:3005/get_comments")
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

document.getElementById("commentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form dari melakukan submit default

    var postedBookId = document.getElementById("postedBookId").value;
    var commentText = document.getElementById("commentInput").value; // Mengakses textarea dengan ID commentInput

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ posted_book_id: postedBookId, comments_text: commentText }),
        redirect: 'follow'
    };

    fetch("http://localhost:3005/comments", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log('Comment successfully submitted:', result);
        getComments(); // Panggil fungsi getComments untuk memperbarui daftar komentar setelah komentar baru ditambahkan
        // Reset textarea setelah berhasil mengirim komentar
        document.getElementById("commentInput").value = "";

        // Tampilkan notifikasi kirim komentar berhasil
        var notificationHtml = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Komentar berhasil dikirim!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        document.getElementById("notificationArea").innerHTML = notificationHtml;

        // Set timeout untuk menutup notifikasi setelah 5 detik
        setTimeout(function() {
            var notificationArea = document.getElementById("notificationArea");
            var alertElement = notificationArea.querySelector(".alert");
            alertElement.classList.remove("show");
            setTimeout(function() {
                notificationArea.innerHTML = ""; // Hapus notifikasi setelah animasi fade out selesai
            }, 1000); // Tunggu 1 detik setelah animasi fade out selesai
        }, 5000); // Set timeout selama 5 detik
        
    })
    .catch(error => console.error('Error:', error));
});