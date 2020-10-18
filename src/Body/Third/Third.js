import React from "react";
import LeftSide from "./Sides/LeftSide.js";
import RightSide from "./Sides/RightSide.js"
import "./Third.css";

function Third() {
    return (
        <div className="third-main">
            <div className="left-side">
                <LeftSide />
            </div>
            <div className="right-side">
                <RightSide />
            </div>
        </div>
    );
}

export default Third;
