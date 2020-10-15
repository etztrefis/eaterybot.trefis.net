import React, { Component } from 'react'

export default class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scroll: 0
        };
    }

    progress = () => {
        const scrollTotal = document.documentElement.scrollTop;
        const heightWin = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${scrollTotal / heightWin * 100}%`

        this.setState({
            scroll: scroll,
        });
    };

    componentDidMount() {
        window.addEventListener("scroll", this.progress)
    }
    componentWillUnmount() {
        window.addEventListener("scroll", this.progress)
    }

    render() {
        const progressWrapper = {
            background: "#343a40",
            height: "5px",
            zIndex: 101,
            width: "100%"
        };

        const progressStyle = {
            height: "5px",
            background: "yellow",
            width: this.state.scroll,
        };

        return (
            <div className="progress-bar" style={progressWrapper}>
                <div style={progressStyle} />
            </div>
        )
    }
}
