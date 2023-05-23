import FormData from "form-data";
import Axios from "axios";
import { useState } from "react";

function UploadFile() {
  const [file, setFile] = useState(null);
  const upload = (e) => {
    e.preventDefault();
    console.log('e.target.files[0]: ', file);
    let formData = new FormData();
    formData.append("screenshot", file);
    console.log('File complete ', Axios.defaults.baseURL + "/upload/" + file.name);
    console.log('formData: ', formData);
    Axios.post(Axios.defaults.baseURL + "/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      console.log("Success ", res);
    });
  };
  return (
    <div className="UploadFile">
      <input
        type="file"
        name="screenshot"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={(e) => upload(e)}>Submit</button>
    </div>
  );
}

export default UploadFile;
