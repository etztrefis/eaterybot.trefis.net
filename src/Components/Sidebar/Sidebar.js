import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import "../../Pages/Admin/Admin.css";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
	paper: {
		background: "#060b26",
		color: "white",
	},
	divider: {
		background: "white",
	},
});

function Sidebar(props) {
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const logOut = (props) => {
		localStorage.clear();
		window.location.reload();
	};

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === "top" || anchor === "bottom",
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map(
					(text, index) => (
						<ListItem button key={text}>
							<ListItemIcon style={{ color: "white" }}>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					)
				)}
			</List>
			<Divider classes={{ root: classes.divider }} />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon style={{ color: "white" }}>
							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div className="sidebar-top-wrapper">
			{["left"].map(() => (
				<React.Fragment key={"left"}>
					<Button
						onClick={toggleDrawer("left", true)}
						style={{
							color: "white",
						}}
					>
						{<MenuIcon />}
					</Button>
					<SwipeableDrawer
						anchor={"left"}
						open={state["left"]}
						onClose={toggleDrawer("left", false)}
						onOpen={toggleDrawer("left", true)}
						classes={{ paper: classes.paper }}
					>
						{list("left")}
					</SwipeableDrawer>
				</React.Fragment>
			))}
			{["right"].map(() => (
				<React.Fragment key={"left"}>
					<Button
						onClick={logOut}
						style={{
							color: "white",
							marginLeft: "auto",
						}}
					>
						{<PowerSettingsNewIcon />}
					</Button>
				</React.Fragment>
			))}
		</div>
	);
}

export default Sidebar;
