import React, { useState, useEffect, useRef } from "react";
import '../../App.css';
import Cookies from 'js-cookie';

/**
 * represents announcement dropdown
 */
const DropdownAnnouncement = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [hasNewAnnouncements, setHasNewAnnouncements] = useState(false);
  const firstRender = useRef(true);

  /**
   * get hashed announcment from local storage when the page is rendered
   */
  useEffect(() => {
    const storedHasNewAnnouncements = localStorage.getItem("hasNewAnnouncements");
    if (storedHasNewAnnouncements) {
      setHasNewAnnouncements(JSON.parse(storedHasNewAnnouncements));
    }
  }, []);

  /**
   * determine if there has been a new announcement every 3 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${process.env.PUBLIC_URL}/announcement`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt')}`,
        }
      })
        .then(response => response.json())
        .then(data => {
          const newAnnouncements = data.reverse().slice(0, 5);
          const lastLogoutTime = localStorage.getItem("lastLogoutTime");

          if (lastLogoutTime) {
            const logoutTime = new Date(lastLogoutTime).getTime();
            const latestAnnouncementTime = new Date(newAnnouncements[0]?.date).getTime();

            if (latestAnnouncementTime > logoutTime) {
              setHasNewAnnouncements(true);
              localStorage.setItem("hasNewAnnouncements", JSON.stringify(true));
            }
          }
          if (newAnnouncements.some(a => a.announcements_id > announcements[0]?.announcements_id)) {
            setHasNewAnnouncements(true);
            localStorage.setItem("hasNewAnnouncements", JSON.stringify(true));
          }
          setAnnouncements(newAnnouncements);
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [announcements]);

  /**
   * change the icon color if there has been a new announcement
   */
  useEffect(() => {
    if (!firstRender.current) {
      const icon = document.getElementById('icon');

      if (hasNewAnnouncements) {
        //replace images to new one
        icon.href = './newIcon.png';
        localStorage.setItem('hasNewAnnouncements', true);
      } else {
        icon.href = './logo192.png';
        localStorage.removeItem('hasNewAnnouncements');
      }

    } else {
      firstRender.current = false;

      if (localStorage.getItem('hasNewAnnouncements')) {
        setHasNewAnnouncements(true);
      }
    }
  }, [hasNewAnnouncements]);

  /**
   * onClick handler for the notification icon
   */
  const handleIconClick = () => {
    if (hasNewAnnouncements) {
      setHasNewAnnouncements(false);
      localStorage.removeItem("hasNewAnnouncements");
      localStorage.removeItem("lastLogoutTime");
    }
    setShowDropdown(!showDropdown);
  };


  return (
    <div className="announcement-container">
      <link rel="icon" href="./logo192.png" type="image/png" id='icon' />
      <img
        src={hasNewAnnouncements ? "./newIcon.png" : "./logo192.png"}
        onClick={handleIconClick}
        alt="Announcement"
        style={{ width: 24, height: 24 }}
      />
      {showDropdown && (
        <div className="dropdown-announcement-container">
          <div className="dropdown-announcement">
            {announcements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <p>{announcement.title}</p>
                <p>{announcement.description}</p>
                <p>{new Date(announcement.date).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownAnnouncement;
