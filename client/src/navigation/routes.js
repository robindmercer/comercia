import React from 'react'
import Logs from '../components/logs/logs'
import Layout from '../components/Layout'
// Admin Menu
import AbmMenu from '../components/admin/abmmenu.js'
import Cliente from '../components/admin/cliente/cliente'
import Direccion from '../components/admin/cliente/direccion'
import FormCliente from '../components/admin/cliente/formCliente'
import FormDireccion from '../components/admin/cliente/formdireccion'
import FormProdmp from '../components/admin/producto/prodMp'
import FormProducto from '../components/admin/producto/formProducto'
import Condiciones from '../components/admin/condiciones/CondicionMain'
// import Condiciones from '../components/admin/condiciones'
import FormTabla from '../components/admin/tabla/formTabla'
import FormUsuario from '../components/admin/formUsuario'
import Landing from '../components/Landing/Landing'
import MateriaPrima from '../components/admin/mp/MateriaPrimaMain'
import Producto from '../components/admin/producto/producto';
import ProductoLang from '../components/admin/producto/productoLang' // '../components/admin/productolang';
import FormProductoLang from '../components/admin/producto/formProductoLang' // '../components/admin/productolang';
import Tablas from '../components/admin/tabla/tablas'
import Usuarios from '../components/admin/usuario/UsuarioMain';
import Factura from '../components/ventas/factura'
import Formfactura from '../components/ventas/formfactura'
import FormfacturaAlta from '../components/ventas/formfacturaAlta'
import FacturaCompleta from '../components/ventas/facturaCompleta';
import FormfacturaPDF from '../components/ventas/formfacturaPdf'
// Manejo Materias Primas de OC confeccionadas
import FacturaMP from '../components/planeacion/facturaMP'
import FormfacturaMP from '../components/planeacion/formfacturaMP'
//Cotizaciones 
import Cotizacion from '../components/ventas/cotizacion'
import CotizacionModif from '../components/ventas/cotizacionModif'
import CotizacionAlta from '../components/ventas/cotizacionAlta'
import CotizacionPDF from '../components/ventas/cotizacionPDF'
import UploadFile from '../Upload'
// import VerPdf from '../verPdf'
import Contrato from '../components/ventas/contrato'
import Backups from '../components/backup'
import PlaneacionPdf from '../components/planeacion/planeacionPdf'

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
            path: "/condiciones",
            element: <Condiciones />,
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
        },
        {
            path: "/cotizacion",
            element: <Cotizacion />,
            exact: true,
            private: true,
        },
        {
            path: "/cotizacionAlta",
            element: <CotizacionAlta />,
            exact: true,
            private: true,
        },
        {
            path: "/cotizacionModif",
            element: <CotizacionModif />,
            exact: true,
            private: true,
        },
        {
            path: "/logs",
            element: <Logs />,
            exact: true,
            private: true,
        },
        {
            path: "/cotizacionPDF",
            element: <CotizacionPDF />,
            exact: true,
            private: true,
        },
        
        {
            path: "/upload",
            element: <UploadFile />,
            exact: true,
            private: true,
        },
        {
            path: "/contrato",
            element: <Contrato />,
            exact: true,
            private: true,
        },
        {
            path: "/formProductoLang",
            element: <FormProductoLang/>,
            exact: true,
            private: true,
        },
        {
            path: "/backups",
            element: <Backups/>,
            exact: true,
            private: true,
        },
        {
            path: "planeacionPdf",
            element: <PlaneacionPdf/>,
            exact: true,
            private: true,
        },
    ]
    return routes;
};


export default HandleRoutes;
