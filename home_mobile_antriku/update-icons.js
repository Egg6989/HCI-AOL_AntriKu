const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const files = ['index.html', 'riwayat.html', 'antrean-today.html', 'antrean-upcoming.html', 'pilih-jadwal.html', 'detail-layanan.html'];

files.forEach(f => {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<span>🏠<\/span>/g, '<i data-lucide="home"></i>');
  content = content.replace(/<span>📋<\/span>/g, '<i data-lucide="clipboard-list"></i>');
  content = content.replace(/<span>⏱<\/span>/g, '<i data-lucide="history"></i>');
  
  if (!content.includes('unpkg.com/lucide')) {
    content = content.replace('</body>', '  <script src="https://unpkg.com/lucide@latest"></script>\n    <script>lucide.createIcons();</script>\n  </body>');
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${f}`);
});
