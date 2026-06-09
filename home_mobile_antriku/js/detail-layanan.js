// ==========================================================================
//  DETAIL LAYANAN — JS
//  Baca ?id= dari URL, render data barbershop yang sesuai
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Baca ID dari URL (?id=2)
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const shop = barbershops[id];

  // 2. Kalau ID tidak valid, balik ke index
  if (!shop) {
    window.location.href = "index.html";
    return;
  }

  // 3. Isi semua data ke halaman
  document.title = `Antriku - ${shop.nama}`;

  document.getElementById("shop-nama").textContent = shop.nama;
  document.getElementById("shop-rating").textContent = shop.rating;
  document.getElementById("shop-ulasan").textContent = `(${shop.ulasan})`;
  document.getElementById("shop-lokasi").textContent = shop.lokasi;
  document.getElementById("shop-jam").textContent = shop.jam;
  document.getElementById("shop-antrean").textContent = `${shop.antrean} Orang`;
  document.getElementById("shop-estimasi").textContent = shop.estimasi;
  document.getElementById("shop-emoji").textContent = shop.emoji;

  // 4. Render daftar layanan
  const container = document.getElementById("layanan-container");
  container.innerHTML = "";

  shop.layanan.forEach((layanan) => {
    const card = document.createElement("div");
    card.className = "service-catalogue-card";
    card.style.cssText =
      "border-radius: 100px; padding: 20px 32px; cursor: pointer; transition: border-color 0.2s;";
    card.onclick = () =>
      (location.href = `pilih-jadwal.html?id=${shop.id}&layanan=${encodeURIComponent(layanan.nama)}`);

    card.innerHTML = `
            <div>
                <h4 style="font-weight: 600; font-size: 16px; color: var(--hex-text-main);">${layanan.nama}</h4>
                <p class="muted-small-text" style="margin-top: 6px;">
                    <i class="fa-regular fa-clock" style="margin-right: 4px;"></i> ${layanan.durasi}
                </p>
            </div>
            <div style="display: flex; align-items: center; gap: 24px;">
                <span style="font-weight: 700; font-size: 16px; color: rgb(132, 86, 0);">${layanan.harga}</span>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 14px; font-weight: 500; color: var(--hex-text-main);">Pilih</span>
                    <div style="width: 32px; height: 32px; background-color: var(--hex-primary-dark); color: var(--hex-bg-white); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-chevron-right" style="font-size: 12px;"></i>
                    </div>
                </div>
            </div>
        `;

    container.appendChild(card);
  });
});
