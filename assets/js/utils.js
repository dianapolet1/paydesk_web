/* ============================================================
   PayDesk — Utils JS globales
   ============================================================ */

// ── Offline detector ──────────────────────────────────────────────────────
function initOfflineDetector() {
  const banner = document.getElementById('offline-banner');
  if (!banner) return;

  const update = () => {
    if (!navigator.onLine) {
      banner.classList.add('visible');
    } else {
      banner.classList.remove('visible');
    }
  };

  window.addEventListener('online', update);
  window.addEventListener('offline', update);
  update();
}

// ── Modales ───────────────────────────────────────────────────────────────
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// Cerrar modal con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// ── Nav activo ────────────────────────────────────────────────────────────
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href && path.includes(href.replace('/pages/', '').replace('/', ''))) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// ── Formatear moneda MXN ──────────────────────────────────────────────────
function formatMXN(amount) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount);
}

// ── Formatear fecha ───────────────────────────────────────────────────────
function formatDate(date, opts = {}) {
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...opts,
  }).format(new Date(date));
}

// ── Toast notifications ───────────────────────────────────────────────────
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px;
    background: ${type === 'error' ? 'var(--danger)' : type === 'warning' ? 'var(--warning)' : 'var(--dark)'};
    color: #fff; padding: 12px 20px;
    border-radius: var(--radius-full);
    font-size: 13px; font-weight: 500;
    box-shadow: var(--shadow-lg);
    z-index: 500;
    animation: slideIn 0.2s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ── Init global ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initOfflineDetector();
  setActiveNav();
});