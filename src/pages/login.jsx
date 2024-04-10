import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { atom, useAtom } from "jotai";
import { userAtom } from "./atom";
import lbImg from "../assets/lb.jpg";
import "../App.css";

const myLogin = () => {
  const clientId = import.meta.env.VITE_API_CLIENTID;
  const [user, setUser] = useAtom(userAtom);
  const handleCallbackResponse = (response) => {
    setUser(jwtDecode(response.credential));
    document.getElementById("signInDiv").hidden = true;
    window.location.href = "/straffer";
  };
  const handleSignOut = (event) => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  return (
    <div className="container">
      {/* Container to center the login button */}
      <div className="row">
        <div className="col"></div>
        <div className="col">
          {Object.keys(user).length != 0 && (
            <button className="btn" onClick={(e) => handleSignOut(e)}>
              Sign out
            </button>
          )}
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col image-container">
          {/* Apply CSS to this container */}
          <img src={lbImg} alt="" className="lb-image" />
          <p
            style={{
              fontSize: "70px",
              fontWeight: "600",
              backgroundImage: "linear-gradient(to left, #ffffff, #ffffff)", // Gradient from black to red
              color: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent", // Ensures the text fill color is transparent in Webkit browsers
              display: "inline", // Required for background clip to work properly
            }}
          >
            LaBamba
          </p>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div id="signInDiv" className="col items-center"></div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
export default myLogin;
