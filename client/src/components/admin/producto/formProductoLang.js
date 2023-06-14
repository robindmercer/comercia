import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
   AddProductoLang,
   getProductoLangId,
} from "../../../actions/productoLang";
import Header from "../../Header";
import "../../../css/all.css";
import "../../../css/formProducto.css";

export function validate(input) {
   let errors = {};
   if (input.id === "") {
      errors.id = "Debe indicar Id!";
   }

   if (input.name === "") {
      errors.name = "Debe Ingresar un nombre ";
   }

   if (input.description === "") {
      errors.description = "Debe Ingresar una Descripcion";
   }
   if (input.lang === "") {
      errors.lang = "Debe Ingresar el Lenguaje";
   }
   return errors;
}

function ABMProductoLang() {
   const location = useLocation();
   const { state } = location;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [onChange, setOnChange] = useState(false)
      //const { producto } = useSelector((state) => state);
   var { productolang } = useSelector((state) => state);
   
   const [input, setInput] = useState({
     id: state ? state.id : 0,
     name:  "",
     description: "",
     lang: "ENG",
  });

  console.log('state.id: ', state.id);

   useEffect(() => {
      dispatch(getProductoLangId(state.id));
    }, [dispatch, state.id]);

    useEffect(() => {
      if (onChange) {
      }
    }, [onChange])

   const limpio = () =>{
    //  setInput({name:""});
    //  setInput({description:""});
     window.location.href = "/producto";
   }


   const [errors, setErrors] = useState({});

   if (productolang) {
   //  console.log(' ENTRE ');
      // input.id = productolang.id;
      // input.name = productolang.name;
      // input.description = productolang.description;
      // input.lang = productolang.lang;
   } else {
       //input.id = state.id;
   }
   // console.log("input: ", input,state.id);
   // console.log("productolang: ", productolang);

   function handleChange(e) {
      e.preventDefault();
      if (e.target.name === "lang" ) productolang.lang = e.target.value
      if (e.target.name === "description" ) productolang.description = e.target.value
      if (e.target.name === "name" ) productolang.name = e.target.value
      if (onChange) {
         setOnChange(false)
     } else {
         setOnChange(true)
     }
      console.log('e.target.value: ',e.target.name, e.target.value,productolang);
      // setInput({
      //    ...input,
      //    [e.target.name]: e.target.value,
      // });
      // setErrors(
      //    validate({
      //       ...input,
      //       [e.target.name]: e.target.value,
      //    })
      // );
      // console.log("e.target.name: ",e.target.name)
      // console.log("e.target.value: ",e.target.value)
      // console.log("input: ",input)
      
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(AddProductoLang(productolang));
      console.log("AddProductoLang: ", productolang);
      //window.location.href = "/producto";
   };
   return (
      <>
         <Header />
         <div>
            <div>
               <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="form-style-Prod"
               >
                  <h1 className="justify-self-center">
                     COMPLETE LOS SIGUIENTES CAMPOS:
                  </h1>
                  <br />
                  <ul>
                     <li className="lblId">
                        <label htmlFor="id">Id: </label>
                        <p>{productolang.id}</p>
                     </li>

                     <li>
                        <label htmlFor="name">Titulo: </label>
                        <input
                           type="text"
                           id="name"
                           name="name"
                           value={productolang.name}
                           onChange={handleChange}
                        />
                        <span>Ingrese Nombre</span>
                        {errors.nombre && (
                           <p className="text-red-500">{errors.nombre}</p>
                        )}
                     </li>

                     <li>
                        <label
                           htmlFor="description"
                           className="block text-gray-700 text-sm font-bold mb-2"
                        >
                           Descripción de productolang:{" "}
                        </label>
                        <textarea
                           type="text"
                           id="description"
                           cols="30"
                           rows="5"
                           name="description"
                           value={productolang.description}
                           onChange={handleChange}
                           className="txtarea"
                        />
                        <span>Ingrese Descripción</span>
                        {errors.description && (
                           <p className="text-red-500">{errors.description}</p>
                        )}
                     </li>
                     <li className="lbl-w-50">
                        <label htmlFor="lang">Lenguaje:</label>
                        <input
                           type="text"
                           id="lang"
                           name="lang"
                           value={productolang.lang}
                           onChange={handleChange}
                        />
                        <span>Ingrese Lenguaje (ENG / GER / FRA)</span>
                        {errors.lang && (
                           <p className="text-red-500">{errors.lang}</p>
                        )}
                     </li>
                     <li>
                        <button className="nibbotBtn" type="submit">
                           {state ? "GRABAR" : "AGREGAR"}
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                           className="nibbotBtn"
                           onClick={() => {limpio()
                              ;
                           }}
                        >
                           VOLVER
                        </button>
                     </li>
                  </ul>
               </form>
            </div>
         </div>
      </>
   );
}

export default ABMProductoLang;
