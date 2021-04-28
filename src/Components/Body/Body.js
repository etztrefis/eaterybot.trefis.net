import React from "react";
import HeaderComponent from "./HeaderComponent/HeaderComponent.js";
import BodyComponent from "./BodyComponent/BodyComponent.js";
import FooterComponent from "./FooterComponent/FooterComponent.js";

function Body() {
  return (
    <>
      <HeaderComponent />
      <BodyComponent />
      <FooterComponent />
    </>
  );
}

export default Body;
