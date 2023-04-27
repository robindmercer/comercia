export const menuItems = [
  {
    title: 'Logout',
    nivel: 0,
    url: '/',
  },
  {
    title: 'Administracion',
    nivel: 1,
    url: '/layout',
    submenu: [
      {
        title: 'Clientes',
        nivel: 6,
        url: '/cliente',
      }, 
      {
        title: 'Productos',
        nivel: 3,
        url: '/producto',
      },
      {
        title: 'Traducciones',
        nivel: 4,
        url: '/productolang',
      },
      {
        title: 'Materia Prima',
        nivel: 5,
        url: '/materiaprima',
      },
      {
        title: 'Usuarios',
        nivel: 2,
        url: '/usuarios',
      },
      {
        title: 'Tablas',
        nivel: 7,
        url: '/tablas',
      },
    ]
  },
  {
    title: 'Ventas',
    nivel: 10,
    url: '/factura',
    submenu: [
      {
        title: 'Orden de Compra',
        nivel: 11,
        url: '/factura',
      },
      {
        title: 'Cotizacion',
        nivel: 12,
        url: '/formfacturaAlta',
      },
    ],
  },
  {
    title: 'Compras',
    nivel: 16,
    submenu: [
      {
        title: 'Stock',
        nivel: 17,
        url: '/factura',
      },
    ]
  },
  {
    title: 'Planeación',
    nivel: 18,
    submenu: [
      {
        title: 'Pendientes',
        nivel: 19,
        url: '/facturaMP',
      },
    ]
  },  
  {
    title: 'About',
    nivel: 0,
    url: '/about',
    submenu: [
      {
        title: 'Who we are',
        nivel: 0,
        url: 'who-we-are',
      },
      {
        title: 'Our values',
        nivel: 0,
        url: 'our-values',
      },
    ],
  },
];
