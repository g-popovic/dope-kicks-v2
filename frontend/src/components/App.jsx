import React from 'react';
import Homepage from './homePage/Homepage';
// import ProductPage from './ProductPage';
// import LoginPage from './LoginPage';
// import AdminPage from './AdminPage';
import CheckoutPage from './checkoutPage/CheckoutPage';
import EditProductPanel from './editProduct/EditProductPanel';
import Navbar from './reusable/Navbar';

function App() {
	return (
		<>
			<Navbar />
			<Homepage />
			<EditProductPanel />
		</>
	);
}

export default App;
