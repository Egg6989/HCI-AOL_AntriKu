// ==========================================================================
//  PILIH JADWAL — Interactive logic
//  Handles: date cards, time slots, selection state, CTA button
// ==========================================================================

const OPEN_HOUR = 9;
const CLOSE_HOUR = 21;
const INTERVAL = 30; // menit

// Simulasi slot yang sudah terpesan per hari (index slot)
const BOOKED_SLOTS = {
  0: [2, 3, 6],
  1: [0, 1, 8],
  2: [4, 5],
  3: [],
  4: [7, 9],
  5: [],
  6: [1, 2, 3],
};

const DAYS_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS_ID = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agt",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

let selectedDateIndex = 0;
let selectedTime = null;

// Bangun date cards (7 hari ke depan)
function buildDates() {
  const row = document.getElementById("dateRow");
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const dayLabel =
      i === 0 ? "Hari ini" : i === 1 ? "Besok" : i === 2 ? "Lusa" : "Pilih";

    const card = document.createElement("button");
    card.className = "date-card" + (i === 0 ? " active" : "");
    card.dataset.idx = i;
    card.innerHTML = `
            <div class="dc-day">${DAYS_ID[d.getDay()]}, ${d.getDate()} ${MONTHS_ID[d.getMonth()]}</div>
            <div class="dc-label">${dayLabel}</div>
        `;
    card.addEventListener("click", () => selectDate(i));
    row.appendChild(card);
  }
}

// Bangun time slot grid
function buildTimeSlots(dateIndex) {
  const grid = document.getElementById("timeGrid");
  grid.innerHTML = "";
  selectedTime = null;
  updateButton();

  const booked = BOOKED_SLOTS[dateIndex] || [];
  let slotIdx = 0;

  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += INTERVAL) {
      const timeStr = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      const isBooked = booked.includes(slotIdx);

      const btn = document.createElement("button");
      btn.className = "time-slot" + (isBooked ? " disabled" : "");
      btn.textContent = timeStr;
      btn.disabled = isBooked;
      btn.dataset.time = timeStr;

      if (!isBooked) {
        btn.addEventListener("click", () => selectTime(btn, timeStr));
      }

      grid.appendChild(btn);
      slotIdx++;
    }
  }
}

// Pilih tanggal
function selectDate(index) {
  selectedDateIndex = index;
  document
    .querySelectorAll(".date-card")
    .forEach((c) => c.classList.remove("active"));
  document
    .querySelector(`.date-card[data-idx="${index}"]`)
    .classList.add("active");
  buildTimeSlots(index);
}

// Pilih waktu
function selectTime(btn, time) {
  document
    .querySelectorAll(".time-slot")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  selectedTime = time;
  updateButton();
}

// Update state tombol CTA
function updateButton() {
  const btn = document.getElementById("btnLanjut");
  if (selectedTime) {
    btn.disabled = false;
    btn.textContent = `Konfirmasi Pesanan — ${selectedTime} →`;
  } else {
    btn.disabled = true;
    btn.textContent = "Konfirmasi Pesanan →";
  }
}

// Init
buildDates();
buildTimeSlots(0);
