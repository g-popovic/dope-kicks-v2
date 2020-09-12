import React, { useEffect, useState } from 'react';
import BestsellersChart from './BestsellersChart';
import RecentSalesChart from './RecentSalesChart';
import GeneralStats from './GeneralStats';

import Navbar from '../reusable/Navbar';
import EditProductPanel from '../editProduct/EditProductPanel';
import axiosApp from '../../utils/axiosConfig';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAdminStats } from '../../redux/reduxActions';

function AdminPage() {
	const stats = useSelector(state => state.adminStats);
	const dispatch = useDispatch();

	useEffect(() => {
		const source = axios.CancelToken.source();

		async function fetchStats() {
			try {
				const result = await axios.all([
					axiosApp.get('/admin/general-stats'),
					axiosApp.get('/admin/bestsellers'),
					axiosApp.get('/admin/sales-stats')
				]);

				const data = {
					general: result[0].data,
					bestsellers: result[1].data,
					recentSales: result[2].data
				};

				dispatch(setAdminStats(data));
			} catch (err) {
				console.log(err);
			}
		}

		fetchStats();

		return () => {
			source.cancel();
		};
	}, []);

	return stats === 'loading' ? (
		<h1>Loading...</h1>
	) : (
		<>
			<Navbar />
			<EditProductPanel />
			<div className="admin-page-container">
				<BestsellersChart stats={stats.bestsellers} />
				<div className="admin-right-panel">
					<GeneralStats stats={stats.general} />
					<RecentSalesChart stats={stats.recentSales} />
				</div>
			</div>
		</>
	);
}

export default AdminPage;
