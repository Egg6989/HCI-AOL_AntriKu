const fs = require('fs');
const path = require('path');

const dir = process.cwd();

function addLucide(content) {
  if (!content.includes('unpkg.com/lucide')) {
    return content.replace('</body>', '  <script src="https://unpkg.com/lucide@latest"></script>\n    <script>lucide.createIcons();</script>\n  </body>');
  }
  return content;
}

// 1. detail-layanan.html
let dl = fs.readFileSync(path.join(dir, 'detail-layanan.html'), 'utf8');
dl = dl.replace(/<span id="shop-emoji" style="font-size: 32px">💈<\/span>/g, '<i data-lucide="scissors" id="shop-emoji" style="width:32px; height:32px; color:var(--hex-text-main);"></i>');
fs.writeFileSync(path.join(dir, 'detail-layanan.html'), dl);

// 2. antrean-child.html
let ac = fs.readFileSync(path.join(dir, 'antrean-child.html'), 'utf8');
ac = ac.replace('>← Kembali</a', ' style="display:flex; align-items:center; gap:4px;"><i data-lucide="arrow-left" style="width:16px; height:16px;"></i> Kembali</a');
ac = addLucide(ac);
fs.writeFileSync(path.join(dir, 'antrean-child.html'), ac);

// 3. antrean-upcoming.html
let au = fs.readFileSync(path.join(dir, 'antrean-upcoming.html'), 'utf8');
au = au.replace('>● Mendatang</span', ' style="display:flex; align-items:center; gap:6px;"><i data-lucide="circle" style="width:10px; height:10px; fill:currentColor;"></i> Mendatang</span');
fs.writeFileSync(path.join(dir, 'antrean-upcoming.html'), au);

// 4. pilih-jadwal.html
let pj = fs.readFileSync(path.join(dir, 'pilih-jadwal.html'), 'utf8');
pj = pj.replace('class="btn-back-icon">←</a>', 'class="btn-back-icon"><i data-lucide="arrow-left"></i></a>');
pj = pj.replace('Konfirmasi Pesanan →', '<div style="display:flex; align-items:center; justify-content:center; gap:6px;">Konfirmasi Pesanan <i data-lucide="arrow-right" style="width:18px; height:18px;"></i></div>');
fs.writeFileSync(path.join(dir, 'pilih-jadwal.html'), pj);

// 5. login-customer.html
let lc = fs.readFileSync(path.join(dir, 'login-customer.html'), 'utf8');
lc = lc.replace('class="btn-back-icon"> ← </a>', 'class="btn-back-icon"><i data-lucide="arrow-left"></i></a>');
lc = addLucide(lc);
fs.writeFileSync(path.join(dir, 'login-customer.html'), lc);

// 6. register-customer.html
let rc = fs.readFileSync(path.join(dir, 'register-customer.html'), 'utf8');
rc = rc.replace('class="btn-back-icon"> ← </a>', 'class="btn-back-icon"><i data-lucide="arrow-left"></i></a>');
rc = addLucide(rc);
fs.writeFileSync(path.join(dir, 'register-customer.html'), rc);

console.log("Done updating all remaining icons");
