// Initialize Lucide icons
lucide.createIcons();

// Chart defaults
Chart.defaults.font.family = "'Outfit', sans-serif";
Chart.defaults.color = '#5C5A58';

// Reusable function to create bar charts
function createBarChart(ctx, labels, data, activeIndex) {
  if (!ctx) return;
  
  const backgroundColors = data.map((_, index) => 
    index === activeIndex ? '#B8832E' : '#224531'
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderRadius: 4,
        barPercentage: 0.7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { font: { size: 12 } }
        },
        y: {
          display: false, // hide y axis completely as per instructions
          grid: { display: false }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Chart 1: Kunjungan Per Jam (Dashboard)
  const kunjunganCtx = document.getElementById('chartKunjungan');
  if (kunjunganCtx) {
    createBarChart(
      kunjunganCtx, 
      ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 
      [2, 3, 4, 3, 5, 6, 8, 12, 7, 5, 4, 3], // Mock data where index 7 (15) is highest
      7 // Active index 15:00
    );
  }

  // Chart 2: Tren Mingguan (Dashboard)
  const trenCtx = document.getElementById('chartTren');
  if (trenCtx) {
    createBarChart(
      trenCtx,
      ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      [40, 45, 50, 48, 60, 95, 80],
      5 // Active index Sab
    );
  }

  // Chart 3: Jam Tersibuk (Analitik)
  const jamTersibukCtx = document.getElementById('chartJamTersibuk');
  if (jamTersibukCtx) {
     createBarChart(
      jamTersibukCtx, 
      ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'], 
      [10, 15, 20, 18, 15, 25, 30, 45, 35, 25, 20, 15], 
      7 // Active index 15
    );
  }

  // Chart 4: Tren Harian (Analitik)
  const trenHarianCtx = document.getElementById('chartTrenHarian');
  if (trenHarianCtx) {
    createBarChart(
      trenHarianCtx,
      ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      [25, 30, 28, 35, 40, 65, 46],
      5 // Active index Sab
    );
  }
});
