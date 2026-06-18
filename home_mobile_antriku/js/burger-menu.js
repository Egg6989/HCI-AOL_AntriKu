/**
 * Burger Menu - Slide-in Navigation for Mobile
 * Replaces bottom navigation bar and top auth buttons
 * with a single burger menu icon that opens a full-screen slide panel.
 */
(function () {
  'use strict';

  // Determine current page for active highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function isActivePage(href) {
    const hrefPage = href.split('/').pop();
    // Handle antrean pages grouping
    if (
      hrefPage === 'antrean-today.html' &&
      (currentPage === 'antrean-today.html' ||
        currentPage === 'antrean-upcoming.html' ||
        currentPage === 'antrean-child.html' ||
        currentPage === 'pilih-jadwal.html')
    ) {
      return true;
    }
    // Handle barbershop/home pages grouping
    if (
      hrefPage === 'index.html' &&
      (currentPage === 'index.html' ||
        currentPage === 'detail-layanan.html' ||
        currentPage === '' ||
        currentPage === 'FAQ.html')
    ) {
      return true;
    }
    return hrefPage === currentPage;
  }

  // Navigation items
  const navItems = [
    { icon: 'scissors', label: 'Barbershop', href: 'index.html' },
    { icon: 'clipboard-list', label: 'Antrean', href: 'antrean-today.html' },
    { icon: 'history', label: 'Riwayat', href: 'riwayat.html' },
  ];

  // Build the burger button (top-right)
  const burgerBtn = document.createElement('button');
  burgerBtn.className = 'burger-menu-btn';
  burgerBtn.id = 'burgerMenuBtn';
  burgerBtn.setAttribute('aria-label', 'Buka menu navigasi');
  burgerBtn.setAttribute('aria-expanded', 'false');
  burgerBtn.innerHTML = '<i data-lucide="menu"></i>';

  // Build the overlay
  const overlay = document.createElement('div');
  overlay.className = 'burger-overlay';
  overlay.id = 'burgerOverlay';

  // Build the slide panel
  const panel = document.createElement('nav');
  panel.className = 'burger-panel';
  panel.id = 'burgerPanel';
  panel.setAttribute('aria-label', 'Menu navigasi utama');

  // Close button inside panel
  const closeBtn = document.createElement('button');
  closeBtn.className = 'burger-close-btn';
  closeBtn.id = 'burgerCloseBtn';
  closeBtn.setAttribute('aria-label', 'Tutup menu navigasi');
  closeBtn.innerHTML = '<i data-lucide="x"></i>';

  // Nav list
  const navList = document.createElement('ul');
  navList.className = 'burger-nav-list';

  navItems.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.className = 'burger-nav-link';
    if (isActivePage(item.href)) {
      a.classList.add('active');
    }
    a.innerHTML = `<i data-lucide="${item.icon}"></i><span>${item.label}</span>`;
    li.appendChild(a);
    navList.appendChild(li);
  });

  // Auth buttons container
  const authGroup = document.createElement('div');
  authGroup.className = 'burger-auth-group';
  authGroup.innerHTML = `
    <a href="login-customer.html" class="burger-btn-masuk">
      <i data-lucide="log-in"></i>
      <span>Masuk</span>
    </a>
    <a href="register-customer.html" class="burger-btn-daftar">
      <i data-lucide="user-plus"></i>
      <span>Daftar</span>
    </a>
  `;

  // Assemble panel
  panel.appendChild(closeBtn);
  panel.appendChild(navList);
  panel.appendChild(authGroup);

  // Insert into DOM
  // Place burger button inside the mobile-top-header (right side)
  const mobileHeader = document.querySelector('.mobile-top-header');
  if (mobileHeader) {
    mobileHeader.appendChild(burgerBtn);
  } else {
    // Fallback: append to body if no mobile header exists
    document.body.appendChild(burgerBtn);
  }
  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  // Toggle functions
  function openMenu() {
    panel.classList.add('open');
    overlay.classList.add('open');
    burgerBtn.classList.add('hidden');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Re-render lucide icons for dynamically added elements
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeMenu() {
    panel.classList.remove('open');
    overlay.classList.remove('open');
    burgerBtn.classList.remove('hidden');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burgerBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closeMenu();
    }
  });

  // Initial icon render
  if (window.lucide) {
    lucide.createIcons();
  }
})();
