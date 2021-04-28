import React from "react";
import HeaderComponent from "./HeaderComponent/HeaderComponent.js";
import BodyComponent from "./BodyComponent/BodyComponent.js";
import Footer from "./FooterComponent/FooterComponent.js";

function Body() {
  return (
    <div>
      <HeaderComponent />
      <BodyComponent />
      <Footer />
    </div>
  );
}

export default Body;
