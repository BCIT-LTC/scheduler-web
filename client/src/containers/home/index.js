import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import pdf from "../../openLab-pdf/Guidelines.pdf";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import ContactModal from "../../components/ContactUs/ContactModal";
import InfoIcon from "./icons/info-icon.png";

export default function Home() {
  const user = jwtDecode(Cookies.get("jwt"));
  const isAdmin = user.isAdmin;
  const [showContactModal, setShowContactModal] = useState(false);

  const handleContactUsClick = () => {
    setShowContactModal(true);
  };

  return (
    <>
      <h2 className="heading">BCIT BSN Program</h2>
      <div className="buttons">
        <Link className="button" to="/openlabsignin">
          <img src="./survey-icon.png" alt="" />
          Open Lab Sign In
        </Link>
        <Link className="button" to="/openlabs">
          <img src="./calendar-icon.png" alt="" />
          Calendar
        </Link>
        {isAdmin && (
          <Link className="button" to="/update">
            <img src="./update-icon.png" alt="" />
            Schedule Open Lab
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
        <Link Link className="button" to="/guidelines">
          <img src="./guidelines-icon.png" alt="" />
          Open Lab Guidelines
        </Link>
        <Link className="button" to="/announcements">
          <img src="./announcements-icon.png" alt="" />
          Announcements
        </Link>
        <button className="button" onClick={handleContactUsClick}>
          <img src={InfoIcon} alt="" />
          Contact Us
        </button>
        <Link className="button" to="/faq">
          <img src="./faq.png" alt="" />
          Frequently Asked Questions
        </Link>
      </div>
      {showContactModal && (
        <ContactModal
          onClose={() => setShowContactModal(false)}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
}
