import React, {
  useState,
  useEffect,
  useRef
} from "react";


const PDFUpload = () => {

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('pdfFile', selectedFile);

    fetch(
        process.env.PUBLIC_URL  + '/labGuidelines', {
          method: 'POST',
          body: formData,
        }
      )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <form onSubmit = {
        handleSubmission
      }
      method = "post"
      enctype = "multipart/form-data" >
      <input
        type="file"
        accept=".pdf"
        name="pdfFile"
        onChange = {changeHandler}
      /> {
        isFilePicked ? (
          <div>
        <p> Filename: {
          selectedFile.name
          } </p>
          <p> Filetype: {
          selectedFile.type
          } </p>
          <p> Size in bytes: {
          selectedFile.size
            } </p>
            <p>
        lastModifiedDate: {
          ' '
        } {
          selectedFile.lastModifiedDate.toLocaleDateString()
              } </p>
            </div >
      ) : ( <p> Select a file to show details </p>
      )
    } <div>
          <button
            type="submit"
            >
            Submit
          </button>
        </div >
        </form>
      </div>
)
}

export default PDFUpload;