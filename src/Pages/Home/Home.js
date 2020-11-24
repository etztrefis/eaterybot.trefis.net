import React from "react";
//import { Circle2 } from 'react-preloaders';
import NavBar from "../../Components/Nav/Nav.js";
import Body from "../../Components/Body/Body.js";

function Home(props) {
	return (
		<div>
			<div>
				<NavBar />
				<Body />
			</div>
			{/* <Circle2
				background="linear-gradient(to right bottom, #6509e2 40%, #5a02b4 70%)"
				time={2000}
				animation="slide-left"
				color="yellow"
			/> */}
		</div>
	);
}

export default Home;
