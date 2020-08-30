import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import dayjs from 'dayjs';

function RecentSalesChart() {
	const [series, setSeries] = useState([
		{
			data: [
				[1357772400000, 38.62],
				[1357858800000, 38.09],
				[1358118000000, 38.16],
				[1358204400000, 38.15],
				[1358290800000, 37.88],
				[1358377200000, 37.73],
				[1358463600000, 37.98],
				[1358809200000, 37.95],
				[1358895600000, 38.25],
				[1358982000000, 38.1],
				[1359068400000, 38.32],
				[1359327600000, 38.24],
				[1359414000000, 38.52],
				[1359500400000, 37.94],
				[1359586800000, 37.83],
				[1359673200000, 38.34],
				[1359932400000, 38.1],
				[1360018800000, 38.51],
				[1360105200000, 38.4],
				[1360191600000, 38.07],
				[1360278000000, 39.12],
				[1360537200000, 38.64],
				[1360623600000, 38.89],
				[1360710000000, 38.81],
				[1360796400000, 38.61],
				[1360882800000, 38.63],
				[1361228400000, 38.99],
				[1361314800000, 38.77],
				[1361401200000, 38.34],
				[1361487600000, 38.55],
				[1361746800000, 38.11],
				[1361833200000, 38.59],
				[1361919600000, 39.6]
			]
		}
	]);
	const [options, setOptions] = useState({
		chart: {
			type: 'area',
			height: 350,
			zoom: {
				enabled: false
			},
			toolbar: false
		},
		stroke: {
			curve: 'straight'
		},
		dataLabels: {
			enabled: false
		},
		labels: {},
		xaxis: {
			type: 'datetime',
			labels: {
				show: true,
				formatter: value => {
					return dayjs(value).format('MMM DD');
				},
				style: {
					cssClass: 'chart-label',
					fontFamily: 'Roboto, sans-serif'
				},
				rotate: 0
			},
			tickAmount: 4,
			tooltip: { enabled: false }
		},
		yaxis: {
			labels: {
				style: {
					cssClass: 'chart-lebal',
					fontFamily: 'Roboto, sans-serif'
				}
			}
		},
		tooltip: {
			y: {
				title: {
					formatter: (value, { dataPointIndex }) => {
						return 'Sales: ';
					}
				}
			},
			x: {
				show: true
				// formatter: value => {
				// 	return value;
				// }
			},
			marker: {
				show: false
			}
		}
	});

	return (
		<div className="recent-sales-container">
			<h1 className="admin-stats-title">Sales Last 30 Days</h1>
			<Chart options={options} series={series} type="area" />
		</div>
	);
}

export default RecentSalesChart;
