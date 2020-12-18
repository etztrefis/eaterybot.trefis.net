import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

function Sidebar() {
	const [sideBar, setSideBar] = useState(false);

	const showSideBar = () => setSideBar(!sideBar);

	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<div className="sidebar">
					<Link to="/admin" className="menu-bars">
						<FaIcons.FaBars onClick={showSideBar} />
					</Link>
				</div>
				<nav className={sideBar ? "nav-menu active" : "nav-menu"}>
					<ul className="nav-menu-items" onClick={showSideBar}>
						<li className="navbar-toggle">
							<Link to="/admin" className="menu-bars">
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link to={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}

export default Sidebar;
