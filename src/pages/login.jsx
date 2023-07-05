import React, { useEffect } from "react";
import variables from "../variables.json";
import jwtDecode from "jwt-decode";
import { atom, useAtom } from "jotai";
import { userAtom } from "./atom";

const myLogin = () => {
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
      client_id: variables.clientID,
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
      {" "}
      {/*En container for å sette knappen på midten av login siden*/}
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
        <div className="col">
          {/* Øverste for deploy, nederste for dev pga filstruktur ;) */}
          {/* src="assets/lb.jpg" */}
          {/* src="src/assets/lb.jpg" */}
          <img src="src/assets/lb.jpg" alt="" />
          Den offisielle ølstraff siden åsånn
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <div id="signInDiv" className="col items-center "></div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
export default myLogin;
