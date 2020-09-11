import React, { useState, useEffect } from 'react';
import Product from './Product';
import CategoryDropdown from '../reusable/CategoryDropdown';

import Navbar from '../reusable/Navbar';
import EditProductPanel from '../editProduct/EditProductPanel';
import axiosApp from '../../utils/axiosConfig';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../../redux/actions';

function Homepage() {
	const [query, setQuery] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const [category, setCategory] = useState(0);

	const dispatch = useDispatch();
	const products = useSelector(state => state.products);
	const userRole = useSelector(state => state.userRole);

	useEffect(() => {
		const source = axios.CancelToken.source();

		async function getProducts() {
			// get products
			try {
				const result = await axiosApp.get('/products/', {
					cancelToken: source.token
				});

				console.log(result.data);
				dispatch(setProducts(result.data.results));
			} catch (err) {
				console.log(err);
			}
		}

		getProducts();

		return () => {
			source.cancel();
		};
	}, [query, minPrice, maxPrice, category]);

	return (
		<>
			<Navbar />
			<EditProductPanel />
			<div className="products-main-container">
				<div className="search-filters">
					<div className="search">
						<input
							type="text"
							placeholder="Search"
							value={query}
							onChange={e => setQuery(e.target.value)}
						/>
						<button className="btn-primary">SEARCH</button>
					</div>
					<div className="filters">
						<span className="price-filters">
							<span>
								<p>From:</p>
								<input
									type="number"
									placeholder="$$$"
									value={minPrice}
									onChange={e => setMinPrice(e.target.value)}
								/>
							</span>
							<span>
								<p>To:</p>
								<input
									type="number"
									placeholder="$$$"
									value={maxPrice}
									onChange={e => setMaxPrice(e.target.value)}
								/>
							</span>
						</span>
						<CategoryDropdown default="All Categories" />
					</div>
				</div>
				{/* "https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700" */}
				<div className="products">
					{products === 'loading' ? (
						<h2>Loading...</h2>
					) : products.length === 0 ? (
						<h1>No products</h1>
					) : (
						products.map(product => (
							<Product
								product={product}
								userRole={userRole}
								key={product._id}
							/>
						))
					)}
				</div>

				<div className="page-selection">
					<a className="prev-page" href="">
						Previous
					</a>
					<ul>
						<li>
							<a>1</a>
						</li>
						<li className="active-page">
							<a>2</a>
						</li>
						<li>
							<a>3</a>
						</li>
					</ul>
					<a className="next-page" href="">
						Next
					</a>
				</div>
			</div>
		</>
	);
}

export default Homepage;
