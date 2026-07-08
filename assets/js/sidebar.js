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
  const role = sessionStorage.getItem('pd_role') || 'empresa';

  if (role === 'admin') {
    initSidebarAdmin(el, base);
    return;
  }

  if (role === 'cliente') {
    initSidebarCliente(el, base);
    return;
  }

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
      <button class="nav-item" style="width:100%;border:none;background:none;cursor:pointer;text-align:left;color:var(--danger);" onclick="logout()">
        <i class="ti ti-logout"></i> Cerrar sesión
      </button>
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

/* ── Sidebar del rol Administrador (contador) ──────────────────────────────
   Se usa en cualquier página compartida (ej. Kanban) a la que el admin
   navegue, para que no se le muestre el menú de Empresa.
   ============================================================ */
function initSidebarAdmin(el, base) {
  const adminHome = base ? `${base}/pages/admin/` : 'pages/admin/';
  const kanbanHref = base ? `${base}/pages/kanban/` : 'pages/kanban/';
  const path = window.location.pathname;
  const isKanban = path.includes('/kanban/');

  el.innerHTML = `
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-mark">PD</div>
        <span class="logo-name">PayDesk</span>
      </div>
      <div class="sidebar-company">
        <div class="company-avatar" style="background:rgba(72,202,228,0.15);color:var(--accent);">AD</div>
        <div>
          <div class="company-name">Panel Admin</div>
          <div class="company-sede" style="color:#3A4A5A;">Contador / Admin</div>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav">
      <span class="nav-label">Panel</span>
      <a href="${adminHome}" class="nav-item" data-vista="empresas"><i class="ti ti-building"></i> Empresas</a>
      <a href="${adminHome}" class="nav-item" data-vista="dashboard-empresa"><i class="ti ti-chart-bar"></i> Dashboard empresa</a>
      <a href="${adminHome}" class="nav-item" data-vista="ventas-empresa"><i class="ti ti-receipt"></i> Ventas / CFDI</a>

      <span class="nav-label">Tablero</span>
      <a href="${kanbanHref}" class="nav-item ${isKanban ? 'active' : ''}"><i class="ti ti-layout-kanban"></i> Kanban</a>

      <span class="nav-label">Cuenta</span>
      <a href="${adminHome}" class="nav-item"><i class="ti ti-settings"></i> Configuración</a>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar-sm">JM</div>
        <div>
          <div class="user-name-sm">Jorge Martínez</div>
          <div class="user-role-sm">Contador</div>
        </div>
      </div>
      <button class="nav-item" style="width:100%;border:none;background:none;cursor:pointer;text-align:left;color:var(--danger);" onclick="logout()">
        <i class="ti ti-logout"></i> Cerrar sesión
      </button>
    </div>
  `;
}

/* ── Sidebar del rol Cliente ────────────────────────────────────────────────
   Vista muy reducida: el cliente solo ve su propia cuenta, no el catálogo
   ni la operación de la empresa.
   ============================================================ */
function initSidebarCliente(el, base) {
  const miCuentaHref = base ? `${base}/pages/mi-cuenta/` : 'pages/mi-cuenta/';
  const path = window.location.pathname;
  const isMiCuenta = path.includes('/mi-cuenta/');

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
          <div class="company-sede">Cliente</div>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav">
      <a href="${miCuentaHref}" class="nav-item ${isMiCuenta ? 'active' : ''}"><i class="ti ti-user"></i> Mi cuenta</a>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar-sm">MR</div>
        <div>
          <div class="user-name-sm">Mario Rodríguez</div>
          <div class="user-role-sm">Cliente</div>
        </div>
      </div>
      <button class="nav-item" style="width:100%;border:none;background:none;cursor:pointer;text-align:left;color:var(--danger);" onclick="logout()">
        <i class="ti ti-logout"></i> Cerrar sesión
      </button>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initSidebar);
