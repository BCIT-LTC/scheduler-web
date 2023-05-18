import { useState, useEffect } from "react";
import Alert from "../Alert";
import Cookies from "js-cookie";

const FaqTable = () => {
  const [table, setTable] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState({
    isOpen: false,
    idx: -1,
  }); // when the user clicks on a button, deleteClicked is updated
  const [editClicked, setEditClicked] = useState({ isOpen: false, idx: -1 }); // when the user clicks on a button, editClicked is updated
  // idx stores the row of the faq that the delete button belongs to

  useEffect(() => {
    const interval = setInterval(() => {
      //fetch faq data every 3 seconds
      fetch(`${process.env.PUBLIC_URL}/faq`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      }) //retrieve faqs for faq table
        .then((response) => response.json())
        .then((data) => setTable(data.reverse())) //reverse the elements so the most recent appear first
        .catch((error) => console.error(error));
    }, 3000); //set interval

    return () => clearInterval(interval); //stop the interval
  }, []);

  //sends table data to /delete endpoint
  const deleteFaq = async (userid) => {
    return await fetch(`${process.env.PUBLIC_URL}/faq`, {
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
      // fetch is done again to update the table, because it won't update without getting the faq table
      fetch(`${process.env.PUBLIC_URL}/faq`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      }).catch((error) => console.error(error));
    });
  };

  const editFaq = async (userid, updatedQuestion, updatedAnswer) => {
    return await fetch(`${process.env.PUBLIC_URL}/faq`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
      body: JSON.stringify({
        id: userid,
        question: updatedQuestion,
        answer: updatedAnswer,
      }),
    })
      .then(() => {
        setEditClicked({ isOpen: false, idx: -1 });
        // fetch is done again to update the table, because it won't update without getting the faq table
        fetch(`${process.env.PUBLIC_URL}/faq`, {
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

  // the map function is used below to iterate through each faq in the database and append it to a row, with the question, answer, and delete button

  //the position for the delete button is set to relative so that it does not dissapear when the Alert component appears

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, index) => (
              <tr key={row.faqs_id} className="table-item">
                <td>{row.question}</td>
                <td className="text-overflow">{row.answer}</td>

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
                    <div style={{ position: "absolute", top: "100%", left: 0 }}>
                      <Alert
                        isOpen={true}
                        popupType={"edit"}
                        onClose={() =>
                          setEditClicked({ isOpen: false, idx: -1 })
                        }
                        title="Edit Faq"
                        description="Make your changes to the faq below and click 'Save' to save your changes."
                        faqQuestion={row.question}
                        faqAnswer={row.answer}
                        confirmBtnLabel="Save"
                        onConfirm={(updatedQuestion, updatedAnswer) =>
                          editFaq(row.faqs_id, updatedQuestion, updatedAnswer)
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
                    <div style={{ position: "absolute", top: "100%", left: 0 }}>
                      <Alert
                        isOpen={true}
                        onClose={() =>
                          setDeleteClicked({ isOpen: false, idx: -1 })
                        }
                        title="Delete Faq"
                        description="Are you sure you want to delete this?"
                        confirmBtnLabel="Delete"
                        onConfirm={() => deleteFaq(row.faqs_id)}
                      />
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FaqTable;
