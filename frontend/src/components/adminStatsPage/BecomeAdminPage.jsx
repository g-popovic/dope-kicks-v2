import React, { useState } from 'react';
import axiosApp from '../../utils/axiosConfig';
import Navbar from '../reusable/Navbar';
import EditProductPanel from '../editProduct/EditProductPanel';

export default function BecomeAdminPage() {
	const [isLoading, setIsLoading] = useState(false);

	async function becomeAdmin() {
		setIsLoading(true);

		try {
			await axiosApp.post('/auth/become-admin');
			window.location.pathname = '/admin';
		} catch (err) {
			console.log(err);
			alert('Something went wrong');
		}

		setIsLoading(false);
	}

	return (
		<>
			<Navbar />
			<EditProductPanel />
			<div className="become-admin-container">
				<h1>Do you want to upgrade to Admin status?</h1>
				<button
					onClick={isLoading ? null : becomeAdmin}
					className={
						'btn-primary' + (isLoading ? ' btn-primary-loading' : '')
					}>
					BECOME ADMIN
				</button>
			</div>
		</>
	);
}
