import React from 'react';
import BestsellersChart from './BestsellersChart';
import RecentSalesChart from './RecentSalesChart';
import GeneralStats from './GeneralStats';

import Navbar from '../reusable/Navbar';
import EditProductPanel from '../editProduct/EditProductPanel';

function AdminPage() {
	return (
		<>
			<Navbar />
			<EditProductPanel />
			<div className="admin-page-container">
				<BestsellersChart />
				<div className="admin-right-panel">
					<GeneralStats />
					<RecentSalesChart />
				</div>
			</div>
		</>
	);
}

export default AdminPage;
