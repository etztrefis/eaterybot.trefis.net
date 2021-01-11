import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fade from "react-reveal/Fade";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "../First.css";

function LeftSide() {
	const useStyles = makeStyles(() => ({
		button: {
			boxShadow: "none",
			color: "antiquewhite",
			backgroundColor: "transparent",
			padding: "6px 12px",
			border: "1px solid",
			lineHeight: 1.5,
			borderColor: "white",
			"&:hover": {
				backgroundColor: "antiquewhite",
				boxShadow:
					"0 9px 20px rgba(0,0,0,0.25), 0 7px 7px rgba(0,0,0,0.22)",
				color: "#6f42c1",
			},
			"&:active": {
				boxShadow: "none",
				backgroundColor: "antiquewhite",
				borderColor: "antiquewhite",
			},
			"&:focus": {
				backgroundColor: "antiquewhite",
				color: "#6f42c1",
				borderColor: "antiquewhite",
				boxShadow: "0 0 0 0.2rem antiquewhite",
			},
		},
	}));

	const classes = useStyles();

	return (
		<div className="left-side-text-component">
			<Fade top cascade>
				<div>
					<p className="left-side-text-component-header">
						Простое решение.
					</p>
					<p className="left-side-text-component-header-second">
						Для простого бизнеса.
					</p>
					<p className="left-side-text-component-text">
						Чат-бот, как средство продвижения инофрмационных
						технологий во все сферы деятельности предприятий.
					</p>

					<AnchorLink
						href="#middle"
						style={{ textDecoration: "none" }}
					>
						<Button
							variant="outlined"
							color="primary"
							className={classes.button}
						>
							Узнать больше
						</Button>
					</AnchorLink>
				</div>
			</Fade>
		</div>
	);
}
export default LeftSide;
