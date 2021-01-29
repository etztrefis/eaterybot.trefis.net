import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AdminLayout from "./AdminLayout";
import "./Admin.css";

export default class AdminPage extends React.Component {
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
      <div className="adminpage-main">
        <Sidebar />
        <AdminLayout onLayoutChange={this.onLayoutChange} />
      </div>
    );
  }
}

const contentDiv = document.getElementById("root");
const gridProps = window.gridProps || {};
ReactDOM.render(React.createElement(AdminLayout, gridProps), contentDiv);
