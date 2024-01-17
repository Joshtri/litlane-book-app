// Fungsi untuk mendapatkan waktu saat ini dalam format HH:mm:ss
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Fungsi untuk memperbarui jam digital setiap detik
function updateClock() {
  const clockElement = document.getElementById("clock");
  if (clockElement) {
    clockElement.textContent = getCurrentTime();
  }
}

// Memanggil fungsi updateClock setiap detik
setInterval(updateClock, 1000);

// Memanggil updateClock pada saat halaman dimuat
document.addEventListener("DOMContentLoaded", updateClock);
