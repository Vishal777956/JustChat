import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from "@mui/material";
import { MdHistory } from "react-icons/md";
import "../App.css";
import { AuthContext } from "../contexts/AuthContext.jsx";

function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  // let handleJoinVideoCall = async () => {
  //   await addToUserHistory(meetingCode);
  //   // navigate(`/${meetingCode}`);
  //   navigate(`/room/${meetingCode}`);
  // };

  let handleJoinVideoCall = async () => {
    let roomId = meetingCode;

    // If no code → create new room
    if (!roomId) {
      roomId = Math.random().toString(36).substring(2, 8);
    }

    await addToUserHistory(roomId);

    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <div className="navbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2
            style={{
              color: "whitesmoke",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <img
              style={{ borderRadius: "2rem" }}
              src="/logo.png"
              height={50}
              alt=""
            />
            JustChat Video Call
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <MdHistory
              style={{
                fontWeight: "bold",
                fontSize: "1.8rem",
                color: "whitesmoke",
              }}
            />
          </IconButton>
          <p
            style={{
              marginRight: "2rem",
              color: "whitesmoke",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            History
          </p>

          {localStorage.getItem("token") && (
            <Button
              style={{
                backgroundColor: "orange",
                color: "white",
                fontWeight: "bold",
                fontSize: "0.8rem",
                padding: "0.6rem",
                marginRight: "2rem",
              }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Connect with your Loved Ones! </h2>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <TextField
                style={{ width: "15rem" }}
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Enter / Create Meeting Code"
                variant="outlined"
              />
              <Button
                style={{
                  fontWeight: "bold",
                  backgroundColor: "orange",
                  color: "white",
                }}
                onClick={handleJoinVideoCall}
              >
                Join
              </Button>
            </div>
            <div
              style={{
                marginTop: "1rem",
                maxWidth: "420px",
                background: "#f9f9f9",
                padding: "0.8rem 1rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
                color: "#555",
                lineHeight: "1.4",
              }}
            >
              <strong style={{ color: "#333" }}>💡 Quick Guide:</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.2rem" }}>
                <li>Enter any code to create a room first</li>
                <li>Share the same Meeting code with your friends</li>
                <li>Join using the same Meeting code</li>
                <li>Works for both guest & logged-in users</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(Home);
