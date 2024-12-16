import React, { useState } from "react";
import "../components/Dialogbox.css";
import CustomAlert from "./CustomAlert"; // Import the CustomAlert component

export default function Dialog({ notes, setNotes, setShowDialog }) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State for custom alert

  const handleCreate = () => {
    if (!groupName.trim() || !selectedColor) {
      setAlertMessage("Please enter a group name and select a color."); // Trigger alert
      return;
    }

    const isDuplicate = notes.some(
      (group) => group.name.toLowerCase() === groupName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setAlertMessage(
        "This group name is already in use. Please choose a unique name for your group."
      ); // Trigger alert
      return;
    }

    const newGroup = {
      name: groupName,
      color: selectedColor,
    };

    setNotes([...notes, newGroup]);
    setGroupName("");
    setSelectedColor("");
    setShowDialog(false);
  };

  return (
    <div className="Dialogdiv">
      <p className="create-new-group">Create New Group</p>
      <div
        style={{
          display: "flex",
          gap: "5%",
          marginTop: "2%",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label className="grp-name-label" htmlFor="Grp-input">
            Group Name
          </label>
        </div>
        <div style={{ width: "60%", height: "31px" }}>
          <input
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "22px",
              border: "2px solid #CCCCCC",
              paddingLeft: "10px",
              fontSize: "0.9rem",
              fontWeight: "400",
              cursor: "auto",
            }}
            placeholder="Enter group name"
            id="Grp-input"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "3.5%", marginTop: "5%" }}>
        <div>
          <label className="color-label" htmlFor="">
            Choose Colour
          </label>
        </div>

        {["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"].map(
          (color) => (
            <button
              key={color}
              style={{
                background: color,
                border: selectedColor === color ? "2px solid black" : "none",
              }}
              className="color-btn"
              onClick={() => setSelectedColor(color)}
            ></button>
          )
        )}
      </div>
      <button className="create-btn" onClick={handleCreate}>
        Create
      </button>

      {/* Render the custom alert */}
      <CustomAlert
        message={alertMessage}
        onClose={() => setAlertMessage("")} // Close alert on button click
      />
    </div>
  );
}
