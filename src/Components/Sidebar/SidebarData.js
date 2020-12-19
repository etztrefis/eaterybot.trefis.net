import React from "react";

import * as AiIcons from "react-icons/ai";

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
