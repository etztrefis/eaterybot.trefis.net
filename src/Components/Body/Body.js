import React from "react";
import First from "./First/First.js";
import Second from "./Second/Second.js";
import Third from "./Third/Third.js";

function Body() {
	return (
		<div>
			<div id="home">
				<First />
			</div>
			<div id="middle">
				<Second />
			</div>
			<Third />
		</div>
	);
}

export default Body;
