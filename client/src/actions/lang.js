import { GET_LANG } from "./constant";

export function PutLang(id) {
  console.log('Put Lang: ',id);
  return async function (dispatch) {
    var lang = id;
    return dispatch({
      type: GET_LANG,
      payload: lang,
    });
  };
}
