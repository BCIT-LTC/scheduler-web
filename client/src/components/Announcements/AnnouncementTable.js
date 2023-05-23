import { useState, useEffect } from "react";
import Alert from "../Alert";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import "./Announcements.css";

const AnnouncementTable = () => {
  const [table, setTable] = useState([]);
  // when the user clicks on a button, deleteClicked is updated
  const [deleteClicked, setDeleteClicked] = useState({
    isOpen: false,
    // idx stores the row of the announcement that the delete button belongs to
    idx: -1,
  });
  // when the user clicks on a button, editClicked is updated
  const [editClicked, setEditClicked] = useState({ isOpen: false, idx: -1 });

  const user = jwtDecode(Cookies.get("jwt"));
  const isAdmins = user.isAdmin;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${process.env.PUBLIC_URL}/announcement`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setTable(data.reverse()))
        .catch((error) => console.error(error));
    };

    // Initial fetch
    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);


  //sends table data to /delete endpoint
  const deleteAnnouncement = async (userid) => {
    return await fetch(`${process.env.PUBLIC_URL}/announcement`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userid,
      }),
    }).then(() => {
      setDeleteClicked({ isOpen: false, idx: -1 });
      // fetch is done again to update the table, because it won't update without getting the announcement table
      fetch(`${process.env.PUBLIC_URL}/announcement`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      }).catch((error) => console.error(error));
    });
  };

  const editAnnouncement = async (userid, updatedTitle, updatedDescription) => {
    return await fetch(`${process.env.PUBLIC_URL}/announcement`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
      body: JSON.stringify({
        id: userid,
        title: updatedTitle,
        description: updatedDescription,
      }),
    })
      .then(() => {
        setEditClicked({ isOpen: false, idx: -1 });
        // fetch is done again to update the table, because it won't update without getting the announcement table
        fetch(`${process.env.PUBLIC_URL}/announcement`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => setTable(data.reverse().slice()))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };

  const submitButton = document.getElementById("submit-button");
  if (deleteClicked.isOpen) {
    document.body.classList.add("active-modal");
    submitButton.style.pointerEvents = "none";
  } else {
    document.body.classList.remove("active-modal");
    if (submitButton) {
      submitButton.style.pointerEvents = "auto";
    }
  }

  return (
    <div>
      <div>
        {isAdmins && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, index) => (
                <tr key={row.announcements_id} className="table-item">
                  <td>{row.title}</td>
                  <td className="text-overflow">{row.description}</td>
                  <td>
                    {" "}
                    {new Date(row.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      timeZone: "America/Los_Angeles",
                    })}
                  </td>
                  <td width="20%" style={{ position: "relative" }}>
                    <button
                      className="button"
                      id="edit-button"
                      type="submit"
                      onClick={() => {
                        setEditClicked({ isOpen: true, idx: index });
                      }}
                    >
                      Edit
                    </button>
                    {editClicked.isOpen && editClicked.idx === index ? (
                      <div
                        style={{ position: "absolute", top: "100%", left: 0 }}
                      >
                        <Alert
                          isOpen={true}
                          popupType={"edit"}
                          onClose={() =>
                            setEditClicked({ isOpen: false, idx: -1 })
                          }
                          title="Edit Announcement"
                          description="Make your changes to the announcement below and click 'Save' to save your changes."
                          announcementTitle={row.title}
                          announcementDescription={row.description}
                          confirmBtnLabel="Save"
                          onConfirm={(updatedTitle, updatedDescription) =>
                            editAnnouncement(
                              row.announcements_id,
                              updatedTitle,
                              updatedDescription
                            )
                          }
                        />
                      </div>
                    ) : null}
                  </td>

                  <td width="20%" style={{ position: "relative" }}>
                    <button
                      className="button"
                      id="delete-button"
                      type="submit"
                      onClick={() => {
                        setDeleteClicked({ isOpen: true, idx: index });
                      }}
                    >
                      Delete
                    </button>
                    {deleteClicked.isOpen && deleteClicked.idx === index ? (
                      <div
                        style={{ position: "absolute", top: "100%", left: 0 }}
                      >
                        <Alert
                          isOpen={true}
                          onClose={() =>
                            setDeleteClicked({ isOpen: false, idx: -1 })
                          }
                          title="Delete Announcement"
                          description="Are you sure you want to delete this?"
                          confirmBtnLabel="Delete"
                          onConfirm={() =>
                            deleteAnnouncement(row.announcements_id)
                          }
                        />
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!isAdmins && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, index) => (
                <tr key={row.announcements_id} className="table-item">
                  <td>{row.title}</td>
                  <td className="text-overflow">{row.description}</td>
                  <td>
                    {" "}
                    {new Date(row.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      timeZone: "America/Los_Angeles",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AnnouncementTable;
