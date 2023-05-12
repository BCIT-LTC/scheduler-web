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
                    <div>
                        <div>
                            Facilitator: {context.state.selectedDay.facilitator}
                        </div>
                        <div>
                            Start-time:{" "}
                            {context.state.selectedDay["start_time"]}
                        </div>
                        <div>
                            End-time: {context.state.selectedDay["end_time"]}
                        </div>
                        <div>
                            Room Number: {context.state.selectedDay["room"]}
                        </div>
                    </div>
                ) : (
                    <div> No Open Lab </div>
                )}
                <button className="button" onClick={handleClose}>
                    close
                </button>
                {user.isAdmin && !editFormVisible && (
                    <button
                        className="button"
                        onClick={() => setEditFormVisible(true)}
                    >
                        Edit
                    </button>
                )}
                {editFormVisible && (
                    <FormContainer
                        disableAddRowButton={true}
                        initialFormState={context.state.selectedDay}
                        updateOrCreate={
                            Object.keys(context.state.selectedDay).length > 0
                                ? "update"
                                : "create"
                        }
                        fetchOnSubmit={true}
                    />
                )}
            </div>
        );
    }
    return <></>;
}
