import React from 'react';
import BestsellersChart from './BestsellersChart';
import RecentSalesChart from './RecentSalesChart';
import GeneralStats from './GeneralStats';

function AdminPage() {
	return (
		<div className="admin-page-container">
			<BestsellersChart />
			<div className="admin-right-panel">
				<GeneralStats />
				<RecentSalesChart />
			</div>
		</div>
	);
}

export default AdminPage;
