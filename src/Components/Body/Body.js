import React from "react";
import First from "./First/First.js";
import Second from "./Second/Second.js";
import Third from "./Third/Third.js";
import Fourth from "./Fourth/Fourth.js";

function Body() {
  return (
    <div>
      <div id="home">
        <First />
      </div>
      <div id="middle"></div>
      <Second />
      <Third />
      <Fourth />
    </div>
  );
}

export default Body;
