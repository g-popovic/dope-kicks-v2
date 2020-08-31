import React, { useState } from 'react';
import Chart from 'react-apexcharts';

function BestsellersChart() {
	const [series, setSeries] = useState([
		{
			name: 'Times Sold',
			data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
		}
	]);
	const [options, setOptions] = useState({
		chart: {
			type: 'bar',
			toolbar: { show: false }
		},
		dataLabels: {
			enabled: true,
			textAnchor: 'start',
			formatter: function (val, opt) {
				return opt.w.globals.labels[opt.dataPointIndex];
			},
			background: {
				enabled: true,
				opacity: 0.6,
				borderWidth: 0
			},
			style: {
				colors: ['#499ffb']
			}
		},
		plotOptions: {
			bar: {
				horizontal: true,
				dataLabels: {
					position: 'bottom'
				}
			}
		},
		xaxis: {
			categories: [
				'South Korea',
				'Canada',
				'United Kingdom',
				'Netherlands',
				'Italy',
				'France',
				'Japan',
				'United States',
				'China',
				'Germany'
			]
		},
		yaxis: {
			labels: { show: false }
		}
	});

	return (
		<div className="bestsellers-chart-container">
			<h1>Best-Sellers</h1>
			<Chart options={options} series={series} type="bar" height="500px" />
		</div>
	);
}

export default BestsellersChart;
