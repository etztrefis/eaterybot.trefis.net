import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
	{
		title: "Home",
		path: "/admin",
		icon: <AiIcons.AiFillHome />,
		cName: "nav-text",
	},
	{
		title: "Devices",
		path: "/admin/devices",
		icon: <AiIcons.AiFillAlipayCircle />,
		cName: "nav-text",
	},
	{
		title: "Test",
		path: "/admin/test",
		icon: <AiIcons.AiFillTablet />,
		cName: "nav-text",
	},
];
