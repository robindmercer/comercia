import {
  LOG_CONTROL,
  GET_MENU,
  GET_MENUID,
  GET_USUARIOS,
  GET_PERFIL,
  GET_STATUS,
  GET_USUARIOSMENU,
  GET_MAILS,
  GET_FACTURAMP,
} from "../actions/constant.js";
import {
  GET_TABLA,
  GET_CLIENTE,
  GET_FACTURA,
  GET_DIRECCION,
  SET_IVA,
} from "../actions/constant.js";
import {
  GET_PRODUCTOS,
  GET_PRODUCTOSLANG,
  GET_PRODUCTOSID,
  GET_MATERIAPRIMA,
  GET_MATERIAPRIMAPROD,
  RESET_PRODMP,
} from "../actions/constant.js";
import {
  GET_FACTURADET,
  GET_FACTCAB,
  RESET_FAC,
  GET_MPDEFAC,
  GET_CONDICION,
  GET_FACTCOND,
} from "../actions/constant.js";
import {
  GET_COTIZACION,
  GET_COTIZACIONDET,
  GET_COTCAB,
  GET_COTCOND,
} from "../actions/constant.js";
const initialState = {
  lang: "",
  mails: [],
  actlogin: [], // quien se logeo
  menu: [],
  usuario: [],
  usuariomenu: [],
  perfil: [],
  status: [],
  producto: [],
  productolang: [],
  tabla: [],
  cliente: [],
  direccion: [],
  condiciones: [], // Condiciones Generales
  factura: [],
  factcab: [],
  factcond: [], // Condiciones Generales elegidas en una factura
  factdet: [],
  porciva: [],
  materiaprima: [],
  facturaMP: [],
  mpfactura: [],
  prodmp: [], // materia prima por producto
  cotizacion: [],
  cotizacioncab: [],
  cotizaciondet: [],
  cotizacioncond: [], // Condiciones Generales
  idfact: 0,
  idcli: 0,
};

// Reducer to get foods ordered by alphabet
const rootReducer = (state = initialState, action) => {
  ///////////////////////////////////////////
  // ****        Control                  ***
  ///////////////////////////////////////////
  if (action.type === LOG_CONTROL) {
    return {
      ...state,
      actlogin: action.payload,
    };
  }

  ///////////////////////////////////////////
  // ****          Menu                   ***
  ///////////////////////////////////////////
  if (action.type === GET_MENU) {
    return {
      ...state,
      menu: action.payload,
    };
  }
  if (action.type === GET_MENUID) {
    return {
      ...state,
      menu: action.payload,
    };
  }

  ///////////////////////////////////////////
  // ****         Usuarios                ***
  ///////////////////////////////////////////
  if (action.type === GET_USUARIOS) {
    return {
      ...state,
      usuario: action.payload,
    };
  }

  if (action.type === GET_USUARIOSMENU) {
    return {
      ...state,
      usuariomenu: action.payload,
    };
  }
  ///////////////////////////////////////////
  // ****         Cliente                ***
  ///////////////////////////////////////////
  if (action.type === GET_CLIENTE) {
    return {
      ...state,
      cliente: action.payload,
    };
  }
  ///////////////////////////////////////////
  // ****         Tablas                ***
  ///////////////////////////////////////////
  if (action.type === GET_TABLA) {
    return {
      ...state,
      tabla: action.payload,
    };
  }

  if (action.type === SET_IVA) {
    return {
      ...state,
      porciva: action.payload,
    };
  }
  ///////////////////////////////////////////
  // ****         Producto                ***
  ///////////////////////////////////////////
  if (action.type === GET_PRODUCTOS) {
    return {
      ...state,
      producto: action.payload,
    };
  }
  if (action.type === GET_PRODUCTOSLANG) {
    return {
      ...state,
      productolang: action.payload,
    };
  }
  if (action.type === GET_PRODUCTOSID) {
    return {
      ...state,
      producto: action.payload,
    };
  }
  ///////////////////////////////////////////
  // ****         Producto                ***
  ///////////////////////////////////////////
  if (action.type === GET_MATERIAPRIMA) {
    return {
      ...state,
      materiaprima: action.payload,
    };
  }
  if (action.type === GET_MATERIAPRIMAPROD) {
    return {
      ...state,
      prodmp: action.payload,
    };
  }
  if (action.type === RESET_PRODMP) {
    return {
      ...state,
      prodmp: [],
    };
  }

  ///////////////////////////////////////////
  // ****         Perfil                  ***
  ///////////////////////////////////////////
  if (action.type === GET_PERFIL) {
    return {
      ...state,
      perfil: action.payload,
    };
  }
  ///////////////////////////////////////////
  // ****         Status                  ***
  ///////////////////////////////////////////
  if (action.type === GET_STATUS) {
    return {
      ...state,
      status: action.payload,
    };
  }
  ///////////////////////////////////////////
  // ****         Factura                  ***
  ///////////////////////////////////////////
  if (action.type === GET_FACTURA) {
    return {
      ...state,
      factura: action.payload,
    };
  }

  if (action.type === GET_FACTCAB) {
    return {
      ...state,
      factcab: action.payload,
    };
  }

  if (action.type === GET_FACTURADET) {
    // console.log('Reducer  GET_FACTURADET');
    return {
      ...state,
      factdet: action.payload,
    };
  }

  if (action.type === RESET_FAC) {
    return {
      ...state,
      factdet: [],
      factcab: [],
    };
  }
  ///////////////////////////////////////////
  // ****         Planeacion                  ***
  ///////////////////////////////////////////
  if (action.type === GET_FACTURAMP) {
    return {
      ...state,
      facturaMP: action.payload,
    };
  }
  if (action.type === GET_MPDEFAC) {
    return {
      ...state,
      mpfactura: action.payload,
    };
  }
  ///////////////////////////////////////////
  // ****         Direccion                  ***
  ///////////////////////////////////////////
  if (action.type === GET_DIRECCION) {
    return {
      ...state,
      direccion: action.payload,
    };
  }

  // Se usa en confirmacion de facturas
  if (action.type === GET_MAILS) {
    return {
      ...state,
      mails: action.payload,
    };
  }
  ///////////////////////////////////////////
  // Condiciones generales
  ///////////////////////////////////////////
  if (action.type === GET_CONDICION) {
    return {
      ...state,
      condiciones: action.payload,
    };
  }
  if (action.type === GET_FACTCOND) {
    return {
      ...state,
      factcond: action.payload,
    };
  }
   
  ///////////////////////////////////////////
  // Cotizaciones
  ///////////////////////////////////////////
  if (action.type === GET_COTIZACION) {
    return {
      ...state,
      cotizacion: action.payload,
    };
  }

  if (action.type === GET_COTCAB) {
    return {
      ...state,
      cotizacioncab: action.payload,
    };
  }

  if (action.type === GET_COTIZACIONDET) {
    return {
      ...state,
      cotizaciondet: action.payload,
    };
  }

  if (action.type === GET_COTCOND) {
    return {
      ...state,
      cotizacioncond: action.payload,
    };
  }

  return state;
};

export default rootReducer;
