import React, {useEffect, useState} from 'react';
import PDFUpload from '../components/PDFUpload/PDFUpload';
import {Document, Page, pdfjs} from 'react-pdf';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

/**
 *
 * @returns {JSX.Element} - Lab Guidelines Page
 */
const LabGuidelinesPage = () => {
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  let jwt = Cookies.get('jwt');
  let user = null;
  if (jwt !== undefined) {
    user = jwtDecode(jwt);
  }

  useEffect(() => {
    // Fetches the lab guidelines PDF data
    fetch(`${process.env.PUBLIC_URL}/labGuidelines`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt')} `,
      },
    })
      .then((res) => res.arrayBuffer())
      .then((data) => setPdfData(data));
  }, []);

  useEffect(() => {
    // Logs the PDF data when it changes
    console.log(pdfData);
  }, [pdfData]);

  return (
    <>
      <div className="pdf-doc">
        <Document
          file={pdfData}
          onLoadSuccess={({numPages}) => setNumPages(numPages)}
        >
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => (
              <Page pageNumber={page} />
            ))}
        </Document>
        {user.isAdmin && <PDFUpload />}
      </div>
    </>
  );
};

export default LabGuidelinesPage;
