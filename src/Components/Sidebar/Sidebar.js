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
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PrintIcon from '@material-ui/icons/Print';
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MainPDF from '../../Pages/Admin/PDF/classdocument';
import "../../Pages/Admin/Admin.css";

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: "auto",
	},
	paper: {
		backgroundColor: "rgba(0, 0, 0, 0.767)",
		color: "white",
	},
	divider: {
		background: "white",
	},
	upper_divider: {
		background: "white",
		marginTop: "10px",
	},
});

function Sidebar(props) {
	let history = useHistory();
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const logOut = (props) => {
		localStorage.removeItem('tokens');
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
			<img src={process.env.PUBLIC_URL + '/favicon.png'} width="64px" style={{ width: "64px", height: "64px", margin: "0 auto", marginTop: "20px", marginBottom: "20px", display: "block" }} />
			<Divider classes={{ root: classes.upper_divider }} />
			<List>
				<ListItem button onClick={() => history.push("/admin")}>
					<ListItemIcon style={{ color: "white" }}>
						<AccountBoxIcon />
					</ListItemIcon>
					<ListItemText primary="Профиль" />
				</ListItem>
				<ListItem button onClick={() => history.push("/admin/stats")}>
					<ListItemIcon style={{ color: "white" }}>
						<EqualizerIcon />
					</ListItemIcon>
					<ListItemText primary="Статистика" />
				</ListItem>
				<ListItem button onClick={() => history.push("/admin/orders")}>
					<ListItemIcon style={{ color: "white" }}>
						<MenuBookIcon />
					</ListItemIcon>
					<ListItemText primary="Заказы и меню" />
				</ListItem>
				<ListItem button onClick={() => { }}>
					<ListItemIcon style={{ color: "white" }}>
						<PrintIcon />
					</ListItemIcon>
					<PDFDownloadLink document={<MainPDF />} fileName="menudata.pdf" style={{ color: "white", textDecoration: "none" }}>
						{({ blob, url, loading, error }) => (loading ? 'Загрузка документа...' : 'Печать меню')}
					</PDFDownloadLink>
				</ListItem>
			</List>
			<Divider classes={{ root: classes.divider }} />
			<List>
				<ListItem button onClick={() => history.push("/admin/dishes")}>
					<ListItemIcon style={{ color: "white" }}>
						<FastfoodIcon />
					</ListItemIcon>
					<ListItemText primary="Блюда и составы" />
				</ListItem>
				<ListItem button onClick={() => history.push("/admin/products")}>
					<ListItemIcon style={{ color: "white" }}>
						<LocalPizzaIcon />
					</ListItemIcon>
					<ListItemText primary="Продукты" />
				</ListItem>
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
