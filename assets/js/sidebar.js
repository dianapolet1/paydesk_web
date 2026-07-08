/* ============================================================
   PayDesk — Sidebar compartido
   Agregar en cada página:
     <body data-base="../..">   ← páginas en pages/nombre/
     <aside id="sidebar"></aside>
     <script src="../../assets/js/sidebar.js"></script>
   ============================================================ */

function initSidebar() {
  const el = document.getElementById('sidebar');
  if (!el) return;
  el.classList.add('sidebar');

  const base = document.body.getAttribute('data-base') || '';

  const nav = [
    { label: 'Principal', type: 'section' },
    { label: 'Inicio',            icon: 'ti-home',              page: 'dashboard',     href: 'pages/dashboard/' },
    { label: 'Punto de venta',    icon: 'ti-shopping-cart',     page: 'venta',         href: 'pages/venta/' },
    { label: 'Ventas',            icon: 'ti-receipt',            page: 'ventas',        href: 'pages/ventas/' },
    { label: 'CFDI',              icon: 'ti-file-invoice',      page: 'cfdi',          href: 'pages/cfdi/' },

    { label: 'Catálogo', type: 'section' },
    { label: 'Productos',         icon: 'ti-package',           page: 'catalogo',      href: 'pages/catalogo/' },
    { label: 'Categorías',        icon: 'ti-category',          page: 'categorias',    href: 'pages/catalogo/categorias/' },
    { label: 'Descuentos',        icon: 'ti-tag',               page: 'descuentos',    href: 'pages/descuentos/' },
    { label: 'Listas de precios', icon: 'ti-currency-dollar',   page: 'precios',       href: 'pages/precios/' },

    { label: 'Inventario', type: 'section' },
    { label: 'Inventario',        icon: 'ti-building-warehouse', page: 'inventario',   href: 'pages/inventario/' },
    { label: 'Proveedores',       icon: 'ti-truck',             page: 'proveedores',   href: 'pages/proveedores/' },
    { label: 'Compras',           icon: 'ti-shopping-bag',      page: 'compras',       href: 'pages/compras/' },

    { label: 'Clientes', type: 'section' },
    { label: 'Clientes',          icon: 'ti-users',             page: 'clientes',      href: 'pages/clientes/' },
    { label: 'Cuentas por cobrar',icon: 'ti-credit-card',       page: 'cuentas-cobrar',href: 'pages/cuentas-cobrar/' },

    { label: 'Finanzas', type: 'section' },
    { label: 'Caja',              icon: 'ti-cash',              page: 'caja',          href: 'pages/caja/' },
    { label: 'Reportes',          icon: 'ti-chart-bar',         page: 'reportes',      href: 'pages/reportes/' },

    { label: 'Configuración', type: 'section' },
    { label: 'Sedes',             icon: 'ti-building',          page: 'sedes',         href: 'pages/sedes/' },
    { label: 'Usuarios',          icon: 'ti-users-group',       page: 'usuarios',      href: 'pages/usuarios/' },
    { label: 'Configuración',     icon: 'ti-settings',          page: 'configuracion', href: 'pages/configuracion/' },
  ];

  const path = window.location.pathname;

  const navHTML = nav.map(item => {
    if (item.type === 'section') {
      return `<span class="nav-label">${item.label}</span>`;
    }
    const isActive = path.includes(`/${item.page}/`) ? 'active' : '';
    const href = base ? `${base}/${item.href}` : item.href;
    return `<a href="${href}" class="nav-item ${isActive}" data-page="${item.page}">
      <i class="ti ${item.icon}"></i> ${item.label}
    </a>`;
  }).join('');

  const ventaHref = base ? `${base}/pages/venta/` : 'pages/venta/';

  el.innerHTML = `
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-mark">PD</div>
        <span class="logo-name">PayDesk</span>
      </div>
      <div class="sidebar-company">
        <div class="company-avatar">TC</div>
        <div>
          <div class="company-name">Todo Cerámicas</div>
          <div class="company-sede">Sede Centro</div>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav">
      <button class="nav-new-btn" onclick="window.location.href='${ventaHref}'">
        <i class="ti ti-plus"></i> Nueva venta
      </button>
      ${navHTML}
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar-sm">SR</div>
        <div>
          <div class="user-name-sm">Sofía Reyes</div>
          <div class="user-role-sm">Administradora</div>
        </div>
      </div>
    </div>
  `;

  // ── Scroll memory ───────────────────────────────────────────────────────
  const navEl = document.getElementById('sidebar-nav');

  // Restaurar posición guardada
  const saved = sessionStorage.getItem('pd_sidebar_scroll');
  if (saved) navEl.scrollTop = parseInt(saved);

  // Guardar posición antes de salir a otra página
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('pd_sidebar_scroll', navEl.scrollTop);
  });
}

document.addEventListener('DOMContentLoaded', initSidebar);