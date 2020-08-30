import React from 'react';
import BestsellersChart from './partial/BestsellersChart';
import RecentSalesChart from './partial/RecentSalesChart';
import GeneralStats from './partial/GeneralStats';

function AdminPage() {
	return (
		<div className="admin-page-container">
			<div className="admin-left-panel">{/* <BestsellersChart /> */}</div>
			<div className="admin-right-panel">
				<GeneralStats />
				<RecentSalesChart />
			</div>
		</div>
	);
}

export default AdminPage;
