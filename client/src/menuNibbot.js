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
