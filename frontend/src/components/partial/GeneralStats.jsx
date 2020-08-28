import React from 'react';
import GeneralStatsItem from './GeneralStatsItem';

function GeneralStats() {
	return (
		<div className="general-stats-container">
			<h1>General Stats</h1>
			<ul>
				<GeneralStatsItem label="Total Users" count={14} />
				<GeneralStatsItem label="Total Products" count={52} />
				<GeneralStatsItem label="Total Sales" count={92} />
			</ul>
		</div>
	);
}

export default GeneralStats;
