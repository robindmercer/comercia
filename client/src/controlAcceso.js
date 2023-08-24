function controlAccesos (menuitem,id) {
    const found = menuitem.find((element) => element.nivel === id);
    if (found) {
         if (found.accion === 'C'){
              return false
            } else {
                return true                
         }
    }
}
 
export default controlAccesos;