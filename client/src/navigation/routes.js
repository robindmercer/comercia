import React from 'react'
import Logs from '../components/logs/logs'
import Layout from '../components/Layout'
// Admin Menu
import AbmMenu from '../components/admin/abmmenu.js'
import Cliente from '../components/admin/cliente/ClienteMain.jsx'
import Direccion from '../components/admin/cliente/direccion'
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
//import UploadFile from '../Upload'
// import VerPdf from '../verPdf'
import Contrato from '../components/ventas/contrato'
import Backups from '../components/varios/backup'
import Restore  from '../components/varios/restore'
import UpdateMp  from '../components/varios/UpdateMp'
import PlaneacionPdf from '../components/planeacion/planeacionPdf'
import Comentario from '../components/comentario/ComentarioMain'
//Atencion al cliente
import Ticket from '../components/admin/atc/ticket'
import RepTicket from '../components/admin/atc/repticket'
import TicketVer from '../components/admin/atc/TicketVer'
import TicketForm from '../components/admin/atc/ticketForm'
import TicketFormAlta from '../components/admin/atc/ticketFormAlta'
import TicketDet from '../components/admin/atc/ticketDet'
import TicketRepDet from '../components/admin/atc/repticketdet.js'
import Grafico from '../components/ventas/grafico'

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
            path: "/restore",
            element: <Restore/>,
            exact: true,
            private: true,
        },        
        {
            path: "planeacionPdf",
            element: <PlaneacionPdf/>,
            exact: true,
            private: true,
        },        
        {
            path: "/comentario",
            element: <Comentario/>,
            exact: true,
            private: true,
        },        
        {
            path: "/ticket",
            element: <Ticket/>,
            exact: true,
            private: true,
        },  
        {
            path: "/RepTicket",
            element: <RepTicket/>,
            exact: true,
            private: true,
        },        
        {
            path: "/TicketVer",
            element: <TicketVer/>,
            exact: true,
            private: true,
        },        
        {
            path: "/ticketForm",
            element: <TicketForm/>,
            exact: true,
            private: true,
        },        
        {
            path: "/TicketFormAlta",
            element: <TicketFormAlta/>,
            exact: true,
            private: true,
        },           
        {
            path: "/UpdateMp",
            element: <UpdateMp/>,
            exact: true,
            private: true,
        },        
        {
            path: "/Grafico",
            element: <Grafico/>,
            exact: true,
            private: true,
        },        
        {
            path: "/ticketDet",
            element: <TicketDet/>,
            exact: true,
            private: true,
        },        
        {
            path: "/repticketdet",
            element: <TicketRepDet/>,
            exact: true,
            private: true,
        },        
        
    ]
    return routes;
};


export default HandleRoutes;
