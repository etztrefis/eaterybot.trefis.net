import React from "react";
import RightSide from "./Sides/RightSide.js";
import LeftSide from "./Sides/LeftSide.js";
import "./First.css";

function First() {
  return (
    <div className="flex-container">
      <div className="second"><RightSide /></div>
      <div className="first"><LeftSide /></div>
    </div >
  );
}

export default First;
