import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
	Document,
	Page,
	View,
	Text,
	Image,
	Link,
	Font,
	StyleSheet,
} from '@react-pdf/renderer';

Font.register({
	family: 'Roboto', fonts: [
		{ src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxP.ttf", },
	]
});

export default class MyDocument extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuData: '',
			getDate: '',
			dayOfWeek: ''
		};

		this.styles = StyleSheet.create({
			title: {
				margin: "0px, 20px, 20px, 20px",
				fontSize: 25,
				textAlign: 'center',
				backgroundColor: '#e4e4e4',
				textTransform: 'uppercase',
				fontFamily: 'Roboto',
			},
			linktitile: {
				margin: 20,
				fontSize: 12,
				textAlign: 'center',
				backgroundColor: '#e4e4e4',
				fontFamily: 'Roboto',
			},
			body: {
				flexGrow: 1,
			},
			row: {
				flexGrow: 1,
				flexDirection: 'row',
				height: "30px",
				width: "115%"
			},
			block: {
				flexGrow: 1,
			},
			text_header: {
				fontSize: 18,
				margin: 5,
				fontFamily: 'Roboto',
				textAlign: 'center',
				textDecoration: "underline"
			},
			textItalic: {
				width: '60%',
				margin: 10,
				fontFamily: 'Roboto',
				textAlign: 'center',
				marginLeft: '20%',
				marginBottom: '15px'
			},
			textItalicSmolFont: {
				fontSize: 14,
				margin: 10,
				fontFamily: 'Roboto',
				textAlign: 'center',
				marginLeft: '10%',
			},
			textItalicSmol: {
				width: '40%',
				margin: 10,
				fontSize: 14,
				fontFamily: 'Roboto',
				textAlign: 'center',
				marginLeft: '20%',
				marginBottom: '15px'
			},
			image: {
				width: '20%',
				marginTop: "10px",
				marginBottom: "30px",
				marginLeft: "30px",
			},
			container: {
				flexDirection: 'row',
				borderBottomWidth: 2,
				borderBottomColor: '#112131',
				borderBottomStyle: 'solid',
				alignItems: 'stretch',

				marginLeft: "20px",
				marginRight: "20px",
				marginBottom: "10px"
			},
			fill2: {
				flexGrow: 2,
				backgroundColor: '#e6672d',
			},
			fill3: {
				flexGrow: 2,
				backgroundColor: '#e78632',
			},
			fill4: {
				flexGrow: 2,
				backgroundColor: '#e29e37',
			},
		});
	}

	async componentDidMount() {
		this._isMounted = true;

		let now = new Date(),
			year = now.getFullYear(),
			month = now.getMonth(),
			mday = now.getDate(),
			dayOfWeek = now.getDay()
		const hardDays = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		if (hardDays.includes(mday)) {
			mday = "0" + mday;
		}
		if (hardDays.includes(month)) {
			month = "0" + month;
		}

		if (this._isMounted) {
			this.setState({
				getDate: `${mday}.${month}.${year}`,
				dayOfWeek: dayOfWeek
			})
		}

		const server = `${process.env.REACT_APP_API_SERVER}menu/day/${dayOfWeek == 0 ? 1 : this.state.dayOfWeek}`;
		const config = { headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` } };
		await axios.get(server, config)
			.then((apiResponse) => {
				if (apiResponse.status == 200) {
					let rows = [
						JSON.stringify(apiResponse.data.message[0].Name),
						JSON.stringify(apiResponse.data.message[0].Price),
						JSON.stringify(apiResponse.data.message[0].EnergyValue),
						JSON.stringify(apiResponse.data.message[1].Name),
						JSON.stringify(apiResponse.data.message[1].Price),
						JSON.stringify(apiResponse.data.message[1].EnergyValue),
						JSON.stringify(apiResponse.data.message[2].Name),
						JSON.stringify(apiResponse.data.message[2].Price),
						JSON.stringify(apiResponse.data.message[2].EnergyValue),
						JSON.stringify(apiResponse.data.message[3].Name),
						JSON.stringify(apiResponse.data.message[3].Price),
						JSON.stringify(apiResponse.data.message[3].EnergyValue),
					];
					let message = `\n1. ${rows[0]}: ${rows[1]} руб. \n Энерг. ценность: ${rows[2]} ккал.\n
2. ${rows[3]}: ${rows[4]} руб. \n Энерг. ценность: ${rows[2]} ккал.\n
2. ${rows[3]}: ${rows[4]} руб. \n Энерг. ценность: ${rows[5]} ккал. \n
3. ${rows[6]}: ${rows[7]} руб. \n Энерг. ценность: ${rows[8]} ккал. \n
4. ${rows[9]}: ${rows[10]} руб. \n Энерг. ценность: ${rows[11]} ккал. \n`;

					if (this._isMounted) {
						this.setState({
							menuData: message.replace(/"/g, '').replace(/\\/g, '')
						})
					}
				} else {
					if (this._isMounted) {
						this.setState({
							menuData: 'Ошибка во время выполнения запроса.'
						})
					}
				}
			})
			.catch((e) => {
				console.log(e);
				if (this._isMounted) {
					this.setState({
						menuData: 'Ошибка 404 во время выполнения запроса.'
					})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		let name, surname, post = "";
		if (global.localStorage.getItem('personalData') != null) {
			const localData = JSON.parse(global.localStorage.getItem('personalData'));
			name = localData.name;
			surname = localData.surname;
			post = localData.post;
		}
		return (
			<Document>
				<Page size="A4">
					<View style={this.styles.body}>
						<View style={this.styles.row}>
							<Image
								style={this.styles.image}
								src={process.env.PUBLIC_URL + '/black_favicon.png'}
							/>
							<Text style={this.styles.textItalicSmol}>
								Директор:
								____________
							</Text>
						</View>
					</View>
					<Link style={this.styles.title} >
						Меню
					</Link>
					<View style={this.styles.container} />
					<Text style={this.styles.text_header}>
						По столовой на {this.state.getDate}.
					</Text>
					<Text style={this.styles.textItalic}>
						{this.state.menuData}
					</Text>
					<View style={this.styles.container} />
					<Text style={this.styles.textItalicSmolFont}>
						{post}: {name} {surname}
					</Text>
					<Text style={this.styles.textItalicSmolFont}>
						Подпись: ______
					</Text>
					<Text style={this.styles.textItalic}>
						 
					</Text>
					<Text style={this.styles.textItalic}>
						 
					</Text>
					<Text style={this.styles.textItalic}>
						 
					</Text>
					<Link style={this.styles.linktitile} >
						eaterybot.trefis.net
					</Link>
				</Page>
			</Document>
		);
	}
}
