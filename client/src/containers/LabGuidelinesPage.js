import React, {
  useEffect,
  useRef
} from 'react'
import PDFUpload from '../components/PDFUpload/PDFUpload'

// display pdf and pdf upload form
const LabGuidelinesPage = () => {
  return (
    <div className="App">
      <PDFUpload />

    </div>
  )
}

export default LabGuidelinesPage