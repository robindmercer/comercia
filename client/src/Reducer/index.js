import { LOG_CONTROL,GET_MENU,GET_MENUID,GET_USUARIOS,GET_PERFIL,GET_STATUS,GET_USUARIOSMENU } from '../actions/constant.js'
import {GET_TABLA,GET_CLIENTE,GET_FACTURA,GET_DIRECCION,SET_IVA } from '../actions/constant.js'
import {GET_PRODUCTOS,GET_PRODUCTOSLANG,GET_PRODUCTOSID,GET_MATERIAPRIMA,GET_MATERIAPRIMAPROD,RESET_PRODMP } from '../actions/constant.js'
import {GET_FACTURADET,GET_FACTCAB, RESET_FAC } from '../actions/constant.js'
const initialState = {
  lang: "",
  actlogin: [],// quien se logeo 
  menu:[],
  usuario:[],
  usuariomenu:[], 
  perfil:[],
  status:[],
  producto:[],
  productoLang:[],
  tabla:[],
  cliente:[],
  factura:[],
  factcab:[],
  factdet:[],
  direccion:[],
  idfact:0,
  idcli:0,
  porciva:[],
  materiaprima:[],
  prodmp:[], // materia prima por producto
}

// Reducer to get foods ordered by alphabet
const rootReducer = (state = initialState, action) => {

  ///////////////////////////////////////////
  // ****        Control                  ***
  ///////////////////////////////////////////
  if (action.type === LOG_CONTROL) {
    return {
      ...state,
      actlogin: action.payload,
    }
  }
  
  ///////////////////////////////////////////
  // ****          Menu                   ***
  ///////////////////////////////////////////
  if (action.type === GET_MENU) {
    return {
      ...state,
      menu: action.payload,
    }
  }
  if (action.type === GET_MENUID) {
    return {
      ...state,
      menu: action.payload,
    }
  }  

  ///////////////////////////////////////////
  // ****         Usuarios                ***
  ///////////////////////////////////////////
  if (action.type === GET_USUARIOS) {
    return {
      ...state,
      usuario: action.payload,
    }
  } 

  if (action.type === GET_USUARIOSMENU) {
    return {
      ...state,
      usuariomenu: action.payload,
    }
  } 
  ///////////////////////////////////////////
  // ****         Cliente                ***
  ///////////////////////////////////////////
  if (action.type === GET_CLIENTE) {
    return {
      ...state,
      cliente: action.payload,
    }
  } 
  ///////////////////////////////////////////
  // ****         Tablas                ***
  ///////////////////////////////////////////
  if (action.type === GET_TABLA) {
    return {
      ...state,
      tabla: action.payload,
    }
  } 
  
  if (action.type === SET_IVA) {
    return {
      ...state,
      porciva: action.payload,
    }
  }
  ///////////////////////////////////////////
  // ****         Producto                ***
  ///////////////////////////////////////////
  if (action.type === GET_PRODUCTOS) {
    return {
      ...state,
      producto: action.payload,
    }
  } 
  if (action.type === GET_PRODUCTOSLANG) {
    return {
      ...state,
      productoLang: action.payload,
    }
  }   
  if (action.type === GET_PRODUCTOSID) {
    return {
      ...state,
      producto: action.payload,
    }
  }  
    ///////////////////////////////////////////
  // ****         Producto                ***
  ///////////////////////////////////////////
  if (action.type === GET_MATERIAPRIMA) {
    return {
      ...state,
      materiaprima: action.payload,
    }
  }  
  if (action.type === GET_MATERIAPRIMAPROD) {
    return {
      ...state,
      prodmp: action.payload,
    }
  }  
  if (action.type === RESET_PRODMP) {
    return {
      ...state,
      prodmp: [],
    }
  }    

  ///////////////////////////////////////////
  // ****         Perfil                  ***
  ///////////////////////////////////////////
  if (action.type === GET_PERFIL) {
    return {
      ...state,
      perfil: action.payload,
    }
  }  
  ///////////////////////////////////////////
  // ****         Status                  ***
  ///////////////////////////////////////////
  if (action.type === GET_STATUS) {
    return {
      ...state,
      status: action.payload,
    }
  }  
  ///////////////////////////////////////////
  // ****         Factura                  ***
  ///////////////////////////////////////////
  if (action.type === GET_FACTURA) {
        return {
      ...state,
      factura: action.payload,
    }
  }  

  if (action.type === GET_FACTCAB) {
    return {
  ...state,
  factcab: action.payload,
}
}  

  if (action.type === GET_FACTURADET) {
   // console.log('Reducer  GET_FACTURADET');
    return {
      ...state,
      factdet: action.payload,
    }
  }    

  if (action.type === RESET_FAC) {
    return {
      ...state,
      factdet: [],
      factcab: [],
    }
  }    

  ///////////////////////////////////////////
  // ****         Direccion                  ***
  ///////////////////////////////////////////
  if (action.type === GET_DIRECCION) {
    return {
      ...state,
      direccion: action.payload,
    }
  }    
  
  return state
}

export default rootReducer;
