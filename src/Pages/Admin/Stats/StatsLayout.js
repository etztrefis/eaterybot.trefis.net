import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Button } from 'react-bootstrap';
import MaterialTable from 'material-table';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS('layouts') || {};
const tableRef = React.createRef();
import axios from 'axios';
import { XAxis, YAxis, Area, Tooltip, CartesianGrid, AreaChart, ResponsiveContainer } from 'recharts';

export default class ResponsiveLocalStorageLayout extends React.PureComponent {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			layouts: JSON.parse(JSON.stringify(originalLayouts)),
			menu: [],
			orders: [],
			products: []
		};

		this.data = [
			{
				'name': 'Page A',
				'uv': 4000,
				'pv': 2400,
				'amt': 2400,
			},
			{
				'name': 'Page B',
				'uv': 3000,
				'pv': 1398,
				'amt': 2210,
			},
			{
				'name': 'Page C',
				'uv': 2000,
				'pv': 8800,
				'amt': 2290,
			},
			{
				'name': 'Page D',
				'uv': 2780,
				'pv': 3908,
				'amt': 2000,
			},
			{
				'name': 'Page E',
				'uv': 1890,
				'pv': 4800,
				'amt': 2181,
			},
			{
				'name': 'Page F',
				'uv': 2390,
				'pv': 3800,
				'amt': 2500,
			},
			{
				'name': 'Page G',
				'uv': 3490,
				'pv': 4300,
				'amt': 2100,
			},
		];
	}

	async componentDidMount() {

	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	static get defaultProps() {
		return {
			className: 'layout',
			cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
			rowHeight: 30,
		};
	}

	resetLayout() {
		this.setState({ layouts: {} });
	}

	onLayoutChange(layout, layouts) {
		saveToLS('layouts', layouts);
		this.setState({ layouts });
	}

	render() {
		return (
			<div>
				<ResponsiveReactGridLayout
					className="layout"
					cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					rowHeight={30}
					layouts={this.state.layouts}
					onLayoutChange={(layout, layouts) =>
						this.onLayoutChange(layout, layouts)
					}
				>
					<div key="1" data-grid={{ w: 6, h: 9, x: 0, y: 0, static: true }} >
						<ResponsiveContainer>
							<AreaChart width={930} height={300} data={this.data}
								margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
								<defs>
									<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
										<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis dataKey="name" />
								<YAxis />
								<CartesianGrid strokeDasharray="3 3" />
								<Tooltip />
								<Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
								<Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
							</AreaChart>
						</ResponsiveContainer>
					</div>
					<div key="2" data-grid={{ w: 6, h: 9, x: 6, y: 0, static: true }}>

					</div>
					<div key="3" data-grid={{ w: 6, h: 9, x: 0, y: 0, static: true }} >

					</div>
					<div key="4" data-grid={{ w: 6, h: 9, x: 6, y: 0, static: true }}>

					</div>
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

function getFromLS(key) {
	let ls = {};
	if (global.localStorage) {
		try {
			ls = JSON.parse(global.localStorage.getItem('rgl-8-stats')) || {};
		} catch (e) {
			/* Ignore*/
		}
	}
	return ls[key];
}

function saveToLS(key, value) {
	if (global.localStorage) {
		global.localStorage.setItem(
			'rgl-8-stats',
			JSON.stringify({
				[key]: value,
			}),
		);
	}
}