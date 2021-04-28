import React, { Component } from "react";

export default class ProgressBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scroll: 0,
		};
	}

	progress = () => {
		const scrollTotal = document.documentElement.scrollTop;
		const heightWin =
			document.documentElement.scrollHeight -
			document.documentElement.clientHeight;
		const scroll = `${(scrollTotal / heightWin) * 100}%`;

		this.setState({
			scroll: scroll,
		});
	};

	componentDidMount() {
		window.addEventListener("scroll", this.progress);
	}
	componentWillUnmount() {
		window.addEventListener("scroll", this.progress);
	}

	render() {
		const progressWrapper = {
			opacity: "0.8",
			backgroundColor: "rgba(255,255,255,0.1)",
			height: "5px",
			zIndex: 101,
			width: "100%",
		};

		const progressStyle = {
			height: "5px",
			background: "#9D22E6",
			width: this.state.scroll,
		};

		return (
			<div className="progress-bar" style={progressWrapper}>
				<div style={progressStyle} />
			</div>
		);
	}
}
