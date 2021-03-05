import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import StatsLayout from "./StatsLayout";
import "../Admin.css";

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { layout: [] };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    this.setState({ layout: layout });
  }

  render() {
    return (
      <div className="stats-main">
        <Sidebar />
        <StatsLayout onLayoutChange={this.onLayoutChange} />
      </div>
    );
  }
}

const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(StatsLayout, gridProps), contentDiv);
