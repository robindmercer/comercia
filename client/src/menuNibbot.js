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
        title: 'Compania',
        nivel: 28,
        url: '/compania',
      }, 
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
        title: 'Condiciones',
        nivel: 4,
        url: '/condiciones',
      },
      {
        title: 'Materia Prima',
        nivel: 5,
        url: '/materiaprima',
      },
      {
        title: 'Compras',
        nivel: 27,
        url: '/compra',
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
        title: 'Cotizacion',
        nivel: 12,
        url: '/cotizacion',
      },
      {
        title: 'Orden de Compra',
        nivel: 11,
        url: '/factura',
      },
    ],
  },
  // {
  //   title: 'Planeación',
  //   nivel: 18,
  //   submenu: [
  //     {
  //       title: 'Pendientes',
  //       nivel: 19,
  //       url: '/facturaMP',
  //     },
  //   ]
  // },  
  {
    title: 'Manufactura',
    nivel: 20,
    submenu: [
      {
        title: 'Pendientes',
        nivel: 21,
        url: '/facturaMP',
      },
    ]
  },  
  {
    title: 'Calidad',
    nivel: 22,
    submenu: [
      {
        title: 'Ordenes de Compra',
        nivel: 23,
        url: '/factura',
      },
    ]
  },    
  {
    title: 'Atención Clientes',
    nivel: 24,
    submenu: [
      {
        title: 'Tickets',
        nivel: 25,
        url: '/ticket',
      },
      {
        title: 'Reporte',
        nivel: 26,
        url: '/repticket',
      },

    ]
  },       

];
