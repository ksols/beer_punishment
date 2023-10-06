import React from "react";
import { Link } from "react-router-dom";
function BasicExample() {
  return (
    <header>
      <div className="row">
        <div className="col">{/*Må beholdes tom bare for plassering*/}</div>
        <div className="col">
          <div className="row">
            <div className="col">
              <ul className="nav">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Main
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <ul className="nav">
                <li className="nav-item">
                  <Link to={"/straffer"} className="nav-link">
                    Straffer
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div className="col">
              <ul className="nav">
                <li className="nav-item">
                  <Link to={"/logg"} className="nav-link">
                    Logg
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="col">{/*Må beholdes tom bare for plassering*/}</div>
      </div>
    </header>
  );
}

export default BasicExample;
