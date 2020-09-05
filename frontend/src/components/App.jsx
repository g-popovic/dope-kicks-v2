import React from 'react';
import Homepage from './Homepage';
import ProductPage from './ProductPage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import CheckoutPage from './CheckoutPage';
import Navbar from './partial/Navbar';

function App() {
	return (
		<>
			<Navbar />
			<CheckoutPage />
		</>
	);
}

export default App;
