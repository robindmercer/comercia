import axios from "axios"


function VerPdf() {
    var file ="http://localhost:3001//comercia//api//src//routes/uploads/1684424610499_formulario_de_res_310.pdf"
    return (
      <a href={file}>
        Open a pdf file<br/>{file}
      </a>
    );
  }
  
  export default VerPdf;