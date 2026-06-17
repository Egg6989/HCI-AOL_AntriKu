const fs = require("fs");
const path = require("path");

const dir = process.cwd();

// 1. Update style.css
let css = fs.readFileSync("style.css", "utf8");
if (!css.includes(".mobile-top-header")) {
  css += `
/* Mobile Top Header */
.mobile-top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: transparent;
  width: 100%;
}
.mobile-top-header .left-col {
  display: flex;
  flex-direction: column;
}
.mobile-top-header .brand-logo {
  font-family: var(--font-heading-serif);
  color: var(--hex-primary-dark);
  font-size: 26px;
  font-weight: 700;
}
.mobile-top-header .location {
  font-size: 13px;
  color: var(--hex-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}
.mobile-top-header .right-col {
  display: flex;
  gap: 12px;
}
.mobile-top-header .btn-masuk {
  background: #ebe6df;
  color: var(--hex-text-main);
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  text-decoration: none;
}
.mobile-top-header .btn-daftar {
  background: var(--hex-accent-gold);
  color: var(--hex-bg-white);
  padding: 8px 14px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  text-decoration: none;
}

@media (min-width: 1024px) {
  .mobile-top-header {
    display: none !important;
  }
}
`;
  fs.writeFileSync("style.css", css);
}

// 2. Inject HTML
const headerHTML = `
    <!-- MOBILE HEADER -->
    <header class="mobile-top-header">
      <div class="left-col">
        <div class="brand-logo">Antriku</div>
        <div class="location"><i data-lucide="map-pin" style="width:12px; height:12px;"></i> Jakarta Barat</div>
      </div>
      <div class="right-col">
        <a href="login-customer.html" class="btn-masuk">MASUK</a>
        <a href="register-customer.html" class="btn-daftar">DAFTAR</a>
      </div>
    </header>
`;

const files = [
  "index.html",
  "antrean-today.html",
  "antrean-upcoming.html",
  "riwayat.html",
];

files.forEach((file) => {
  let content = fs.readFileSync(path.join(dir, file), "utf8");
  if (!content.includes("mobile-top-header")) {
    // Insert after <header class="desktop-header"> block or just after <body>
    if (content.includes("</header>")) {
      // If it has a desktop header, we inject mobile header right after it
      content = content.replace(
        /(<header class="desktop-header">.*?<\/header>)/s,
        "$1\n" + headerHTML,
      );
    } else {
      content = content.replace(/<body>/, "<body>\n" + headerHTML);
    }
    fs.writeFileSync(path.join(dir, file), content);
    console.log("Injected mobile header into " + file);
  }
});
