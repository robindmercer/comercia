import React from 'react'

import Layout from '../components/Layout'
// Admin Menu
import AbmMenu from '../components/admin/abmmenu.js'
import Cliente from '../components/admin/cliente'
import Direccion from '../components/admin/direccion'
import FormCliente from '../components/admin/formCliente'
import FormDireccion from '../components/admin/formdireccion'
import FormMateriaPrima from '../components/admin/formMateriaprima'
import FormProdmp from '../components/admin/prodMp'
import FormProducto from '../components/admin/formProducto'
import FormProductoLang from '../components/admin/formProductoLang'
import FormTabla from '../components/admin/formTabla'
import FormUsuario from '../components/admin/formUsuario'
import Landing from '../components/Landing/Landing'
import MateriaPrima from '../components/admin/materiaprima'
import Producto from '../components/admin/producto';
import ProductoLang from '../components/admin/productolang' // '../components/admin/productolang';
import Tablas from '../components/admin/tablas'
import Usuarios from '../components/admin/usuario';
import Factura from '../components/ventas/factura'
import Formfactura from '../components/ventas/formfactura'
import FormfacturaAlta from '../components/ventas/formfacturaAlta'
import FacturaCompleta from '../components/ventas/facturaCompleta';
import FormfacturaPDF from '../components/ventas/formfacturaPdf'
// Manejo Materias Primas de OC confeccionadas
import FacturaMP from '../components/planeacion/facturaMP'
import FormfacturaMP from '../components/planeacion/formfacturaMP'

function HandleRoutes() {

    const routes = [
        {
            path: "/",
            element: <Landing />,
            exact: true,
            private: true,
        },
        {
            path: "/layout",
            element: <Layout />,
            exact: true,
            private: true,
        },
        {
            path: "/usuarios",
            element: <Usuarios />,
            exact: true,
            private: true,
        },
        {
            path: "/producto",
            element: <Producto />,
            exact: true,
            private: true,
        },
        {
            path: "/productolang",
            element: <ProductoLang />,
            exact: true,
            private: true,
        },
        {
            path: "/formUsuario",
            element: <FormUsuario />,
            exact: true,
            private: true,
        },
        {
            path: "/formProducto",
            element: <FormProducto />,
            exact: true,
            private: true,
        },
        {
            path: "/formProductoLang",
            element: <FormProductoLang />,
            exact: true,
            private: true,
        },
        {
            path: "/tablas",
            element: <Tablas />,
            exact: true,
            private: true,
        },
        {
            path: "/formTabla",
            element: <FormTabla />,
            exact: true,
            private: true,
        },
        {
            path: "/cliente",
            element: <Cliente />,
            exact: true,
            private: true,
        },
        {
            path: "/direccion",
            element: <Direccion />,
            exact: true,
            private: true,
        },
        {
            path: "/formCliente",
            element: <FormCliente />,
            exact: true,
            private: true,
        },
        {
            path: "/formDireccion",
            element: <FormDireccion />,
            exact: true,
            private: true,
        },
        {
            path: "/materiaprima",
            element: <MateriaPrima />,
            exact: true,
            private: true,
        },
        {
            path: "/formMateriaprima",
            element: <FormMateriaPrima />,
            exact: true,
            private: true,
        },
        {
            path: "/prodmp",
            element: <FormProdmp />,
            exact: true,
            private: true,
        },
        {
            path: "/abmmenu",
            element: <AbmMenu />,
            exact: true,
            private: true,
        },
        {
            path: "/factura",
            element: <Factura />,
            exact: true,
            private: true,
        },
        {
            path: "/formfactura",
            element: <Formfactura />,
            exact: true,
            private: true,
        },
        {
            path: "/formfacturaAlta",
            element: <FormfacturaAlta />,
            exact: true,
            private: true,
        },
        {
            path: "/facturaCompleta",
            element: <FacturaCompleta />,
            exact: true,
            private: true,
        },
        {
            path: "/facturaMP",
            element: <FacturaMP />,
            exact: true,
            private: true,
        },
        {
            path: "/formfacturaMP",
            element: <FormfacturaMP />,
            exact: true,
            private: true,
        },
        {
            path: "/FormfacturaPdf",
            element: <FormfacturaPDF />,
            exact: true,
            private: true,
        }
                                
    ]
    return routes;
};


export default HandleRoutes;
