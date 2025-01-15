import { Modal, Button, Alert } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { ClienteContext } from "./ClienteContext";
import Cliente from "./Cliente";
import AddForm from "./EditForm2";
import Pagination from "./Pagination";
import style from "../../../css/cliente.module.css";
import Header from '../../Header';

const ClienteList = () => {
   //console.log('window.innerWidth: ', window.innerWidth,pantalla);
   const { sortedClientes } = useContext(ClienteContext);

   const [showAlert, setShowAlert] = useState(false);

   const [show, setShow] = useState(false);

   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   //const handleShowAlert = () =>setShowAlert(true);
   
   const [currentPage, setCurrentPage] = useState(1);
   var clientesPerPage = 10;
   const [ordenar, setOrdenar] = useState(false);
   
   const [records, setRecords] = useState(sortedClientes);

   var pantalla = "PC"
   if (window.innerWidth < 1000) {
      pantalla = "Phone"
      clientesPerPage = 20
   }

   const [data, setData] = useState({
      id: 0, 
      nombre: "",
      razsoc: "",
   });


   const handleShowAlert = () => {
      setShowAlert(true);
      setTimeout(() => {
         setShowAlert(false);
      }, 2000);
   };

   useEffect(() => {
      handleClose();

      return () => {
         handleShowAlert();
      };
   }, [sortedClientes]);

   const ordenar_RazSoc = () => {
      setOrdenar(!ordenar,true,false);
      sortedClientes.sort((a, b) => {
            if (a.razsoc.toLowerCase() < b.razsoc.toLowerCase()) {
                return -1; // a should come before b in the sorted order
            } else if (a.razsoc.toLowerCase() > b.razsoc.toLowerCase()) {
                return 1; // a should come after b in the sorted order
            } else {
                return 0; // a and b are the same
            }
        });
        console.log('ordenar_RazSoc 2: ',sortedClientes);
      }
      const handleChangeRS = (e) => {
         const filteredRecords = sortedClientes.filter((record) => {
            return record.razsoc
               .toLowerCase()
               .includes(e.target.value.toLowerCase());
         });
         setRecords(filteredRecords);
      };
      const handleChange = (e) => {
         const filteredRecords = sortedClientes.filter((record) => {
            return record.nombre
               .toLowerCase()
               .includes(e.target.value.toLowerCase());
         });
         setRecords(filteredRecords);
      };
      
      const handleChangeAp = (e) => {
         const filteredRecords = sortedClientes.filter((record) => {
            return record.apellido
               .toLowerCase()
               .includes(e.target.value.toLowerCase());
         });
         setRecords(filteredRecords);
      };

      if (records){
         if(records.length>0){
         var indexOfLastCliente = currentPage * clientesPerPage;
         var indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
         var currentClientes = records.slice(
            indexOfFirstCliente,
            indexOfLastCliente
         );
      } else {
         indexOfLastCliente = currentPage * clientesPerPage;
         indexOfFirstCliente = indexOfLastCliente - clientesPerPage;
         currentClientes = sortedClientes.slice(
         indexOfFirstCliente,
         indexOfLastCliente
   );
}   }
   const totalPagesNum = Math.ceil(sortedClientes.length / clientesPerPage);



   return (
      <>
      <Header />
         <br />
         <div className="table-title">
            <div className="row">
               <div className="col-sm-6">
                  <h2>Clientes</h2>
               </div>
               <div className="col-sm-6">
                  <Button
                     onClick={handleShow}
                     className="btn btn-success"
                     data-toggle="modal"
                  >
                     <i className="material-icons">&#xE147;</i>{" "}
                     <span>Alta Cliente</span>
                  </Button>
               </div>
            </div>
         </div>
         {/* <div>
            Buscar Razon Solcial :&nbsp;
         <input type="text" onChange={handleChange} />
         &nbsp;Nombre :&nbsp;
         <input type="text" onChange={handleChangeAp} />
         &nbsp;Apellido :&nbsp;
         <input type="text" onChange={handleChangeAp} />
         </div> */}
         <br />
         <Alert show={showAlert} variant="success">
            Clientes Actualizadas!
         </Alert>

         <table className="table table-striped table-hover">
            <thead>
               <tr className={style.trBuscar}>
                  <th>Buscar</th>
                  {pantalla==="PC" ? (
                     <>
                  <th className={style.thCli}><input type="text" onChange={handleChangeRS} /></th>
                  <th className={style.thCli}><input type="text" onChange={handleChange} /></th>
                  <th className={style.thCli}><input type="text" onChange={handleChangeAp} /></th>
                     </>
               ):(
                  <th className={style.thCli}><input type="text" onChange={handleChangeRS} /></th>
               )
               }
                  <th>&nbsp;</th>
               </tr>
               <tr>
                  {pantalla==="PC" ? (
                     <>
                     <th>id</th>
                     <th  onClick={() =>ordenar_RazSoc()} >Razon social</th>
                     <th className="onlyScreen">Nombre</th>
                     <th className="onlyScreen">Apellido</th>
                     </>
                  ):(
                     <th  onClick={() =>ordenar_RazSoc()} >Razon social</th>
                  )
                  }
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {currentClientes.map((data) => (
                  <tr className={style.trCli} key={data.id}>
                     <Cliente data={data} />
                  </tr>
               ))}
            </tbody>
         </table>

         <Pagination
            pages={totalPagesNum}
            setCurrentPage={setCurrentPage}
            currentClientes={currentClientes}
            sortedClientes={sortedClientes}
         />

         <Modal show={show} onHide={handleClose} className="modal-lg">
            <Modal.Header closeButton>
               <Modal.Title>Agregar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <AddForm theCliente={data} />
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Cerrar
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default ClienteList;
