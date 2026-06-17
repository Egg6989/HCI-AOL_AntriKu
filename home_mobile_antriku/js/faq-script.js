document.addEventListener("DOMContentLoaded", () => {
  // 1. Ambil semua tombol yang berfungsi sebagai pembuka accordion
  const accordionTriggers = document.querySelectorAll(".accordion-trigger");

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      // 2. Identifikasi kontainer item dari tombol yang sedang diklik
      const parentItem = this.parentElement;

      // 3. Cari bagian konten (jawaban) di dalam kontainer tersebut
      const content = parentItem.querySelector(".accordion-content");

      // 4. Ubah status aktif (tambah/hapus class 'active')
      parentItem.classList.toggle("active");

      // 5. Logika animasi buka/tutup
      if (parentItem.classList.contains("active")) {
        // Jika aktif, set tinggi maksimum sesuai ukuran konten aslinya (scrollHeight)
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        // Jika ditutup, kembalikan tinggi maksimum menjadi 0
        content.style.maxHeight = null;
      }
    });
  });
});
