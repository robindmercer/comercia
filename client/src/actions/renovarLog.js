import { Link } from "react-router-dom";
import login from "../images/login.jpg";

export function GotoLogin (){

return (
 <>

                         <div>
                            <br />
                            Por favor vuelva a Logonearse
                            <br />
                         <Link to={"/login"} className="dLink" title="Login">
                            <img src={login} height="90px" width="90px" alt="" />
                         </Link>
                         </div>
    
 </>
                        )

}