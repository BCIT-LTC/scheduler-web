import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import pdf from '../../openLab-pdf/Guidelines.pdf';
import {useState} from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import ContactModal from '../../components/ContactUs/ContactModal';

export default function Home() {
  const user = jwtDecode(Cookies.get('jwt'));
  const isAdmins = user.isAdmin;
  const [showPDF, setShowPDF] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);

  const handlePDF = () => {
    setShowPDF(pdf);
  };

  const handleContactUsClick = () => {
    setShowContactModal(true);
  };

  return (
    <>
      <h2 className="heading">BCIT BSN Program</h2>
      <div className="buttons">
        <Link className="button" to="/calendar">
          <img src="./calendar-icon.png" alt="" />
          Calendar
        </Link>
        {isAdmins && (
          <Link className="button" to="/update">
            <img src="./update-icon.png" alt="" />
            Update Calendar
          </Link>
        )}
        <Link className="button" to="/survey">
          <img src="./survey-icon.png" alt="" />
          Open Lab General Feedback Survey
        </Link>
        <a
          className="button"
          target="_blank"
          href="https://rise.articulate.com/share/5W_xAmCkleiWUwsk5-6InC4YFvvB0R7p"
          rel="noreferrer"
        >
          <img src="./casestudies-icon.png" alt="" />
          Case Studies
        </a>
        <a
          className="button"
          target="_blank"
          href={showPDF}
          onClick={handlePDF}
          rel="noreferrer"
        >
          <img src="./guidelines-icon.png" alt="" />
          Open Lab Guidelines
        </a>
        {isAdmins && (
          <Link className="button" to="/announcements">
            <img src="./announcements-icon.png" alt="" />
            Create Announcements
          </Link>
        )}
        <button className="button" onClick={handleContactUsClick}>
          <img src="../icons/info-icon.png" alt="" />
          Contact Us
        </button>
      </div>
      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </>
  );
}
