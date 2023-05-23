import React, {useState, useEffect, useRef} from 'react';
import Cookies from 'js-cookie';
import './PDFUpload.css';

const PDFUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    // Handle file input change event
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = (e) => {
    console.log(e);
    e.preventDefault();
    // Create a new FormData object
    const formData = new FormData();
    // Get the selected file from the file input
    const fileData = document.getElementById('pdf').files[0];
    setSelectedFile(fileData);
    // Append the file to the FormData object
    formData.append('pdfFile', selectedFile);
    // Send a POST request to the server with the file data
    fetch(`${process.env.PUBLIC_URL}/labGuidelines`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')} `,
        'content-length': `${selectedFile.size}`,
      },
      mode: 'cors',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
        // Reload the page after successful submission
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="pdf-upload">
      <form
        className="form"
        onSubmit={handleSubmission}
        method="post"
        encType="multipart/form-data"
      >
        <div className="pdf-selector">
          <label for="pdf" className="custom-file-upload">
            Choose File
          </label>
          <input
            type="file"
            id="pdf"
            accept=".pdf"
            name="pdfFile"
            onChange={changeHandler}
            style={{display: 'none'}}
          />
        </div>
        {isFilePicked ? (
          <div>
            <p> Filename: {selectedFile.name} </p>
            <p> Filetype: {selectedFile.type} </p>
            <p> Size in bytes: {selectedFile.size} </p>
          </div>
        ) : (
          <p> Select a file to show details </p>
        )}{' '}
        <div>
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PDFUpload;
