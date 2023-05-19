import React, { useContext, useState } from "react";
import "./popup.css";
import { GlobalContext } from "../context";
import FormContainer from "./FormContainer";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export default function PopUp() {
    let jwt = Cookies.get("jwt");
    let user = null;
    if (jwt !== undefined) {
        user = jwtDecode(jwt);
    }
    const context = useContext(GlobalContext);

    const [editFormVisible, setEditFormVisible] = useState(false);

    function handleClose() {
        setEditFormVisible(false);
        context.setPopup(false);
        context.setSelectedDay({});
    }

    if (context.state.popupOpen) {
        return (
            <div className="popup">
                {Object.keys(context.state.selectedDay).length > 0 ? (
                    context.state.selectedDay.map((d) => (
                        <div className="lab-section">
                            <div>
                                Facilitator: {d.facilitator}
                            </div>
                            <div>
                                Start-time:{" "}
                                {d["start_time"]}
                            </div>
                            <div>
                                End-time: {d["end_time"]}
                            </div>
                            <div>
                                Room Number: {d["room"]}
                            </div>
                            <div>
                                Stat: {(d["stat"] === 1) ? "Yes" : "No"}
                            </div>
                        </div>
                    ))
                ) : (
                    <div> No Open Lab </div>
                )
                }
                <button className="button" onClick={handleClose}>
                    Close
                </button>
                {
                    user.isAdmin && !editFormVisible && (
                        <button
                            className="button"
                            onClick={() => setEditFormVisible(true)}
                        >
                            Edit
                        </button>
                    )
                }
                {
                    editFormVisible && (
                        Object.keys(context.state.selectedDay).length > 0 ? (
                            <FormContainer
                                disableAddRowButton={true}
                                initialFormState={context.state.selectedDay}
                                updateOrCreate={"update"}
                                fetchOnSubmit={true}
                            />
                        ) : (
                            <FormContainer
                                disableAddRowButton={true}
                                updateOrCreate={"create"}
                                fetchOnSubmit={true}
                            />
                        )
                    )
                }
            </div >
        );
    }
    return <></>;
}
