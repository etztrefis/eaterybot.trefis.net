import React from "react";
import "../First.css";

function RightSide() {
    return (
        <div className="vert-move">
            <img src={require("../images/cat.gif")} alt="Cat" style={{ width: "300px" }} />
        </div>
    );
}

export default RightSide;
