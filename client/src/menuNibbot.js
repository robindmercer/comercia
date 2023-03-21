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
        url: '/productoLang',
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
        title: 'web development',
        nivel: 12,
        url: '/web-dev',
        submenu: [
          {
            title: 'Frontend',
            nivel: 13,
            url: 'frontend',
          },
          {
            title: 'Backend',
            submenu: [
              {
                title: 'NodeJS',
                nivel: 14,
                url: 'node',
              },
              {
                title: 'PHP',
                nivel: 15,
                url: 'php',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Compras',
    nivel: 16,
    submenu: [
      {
        title: 'Pedidos',
        nivel: 17,
        url: '/factura',
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
