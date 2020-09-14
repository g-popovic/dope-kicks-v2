import React, { useState, useEffect } from 'react';
import Product from './Product';

import Navbar from '../reusable/Navbar';
import EditProductPanel from '../editProduct/EditProductPanel';
import axiosApp from '../../utils/axiosConfig';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setQueries } from '../../redux/reduxActions';

function Homepage() {
	const dispatch = useDispatch();
	const products = useSelector(state => state.products);
	const userRole = useSelector(state => state.userRole);
	const editPanelState = useSelector(state => state.editPanelState);
	const queries = useSelector(state => state.queries);

	const [query, setQuery] = useState(queries.query || '');
	const [minPrice, setMinPrice] = useState(queries.minPrice || '');
	const [maxPrice, setMaxPrice] = useState(queries.maxPrice || '');
	const [category, setCategory] = useState(queries.category || '');
	const [page, setPage] = useState(queries.page || 1);
	const [totalPages, setTotalPages] = useState(null);

	const pages = [];
	for (let i = 0; i < totalPages; i++) {
		pages.push(
			<li
				onClick={() => setPageFilter(i + 1)}
				className={page === i + 1 ? 'active-page' : ''}>
				<a>{i + 1}</a>
			</li>
		);
	}

	useEffect(() => {
		const source = axios.CancelToken.source();
		const itemsPerPage = 1;

		dispatch(setProducts('loading'));

		async function getProducts() {
			// get products
			try {
				const result = await axiosApp.get(
					`/products/?itemsPerPage=${itemsPerPage}&query=${query}&minPrice=${minPrice}&maxPrice=${maxPrice}&category=${category}&page=${page}`,
					{
						cancelToken: source.token
					}
				);

				console.log(result.data);
				dispatch(setProducts(result.data.results));
				setTotalPages(result.data.pages);
			} catch (err) {
				dispatch(setProducts([]));
				console.log(err);
			}
		}

		getProducts();

		return () => {
			source.cancel();
		};
	}, [query, minPrice, maxPrice, category, editPanelState, page]);

	useEffect(() => {
		console.log('called dispatcj');
		dispatch(
			setQueries({
				query,
				minPrice,
				maxPrice,
				category,
				page
			})
		);
	}, [query, minPrice, maxPrice, category, page]);

	function setPageFilter(value) {
		setPage(value > totalPages ? totalPages : value || 1);
	}

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
									value={minPrice / 100 || ''}
									onChange={e =>
										setMinPrice(
											e.target.value
												? e.target.value * 100
												: ''
										)
									}
								/>
							</span>
							<span>
								<p>To:</p>
								<input
									type="number"
									placeholder="$$$"
									value={maxPrice / 100 || ''}
									onChange={e =>
										setMaxPrice(
											e.target.value
												? e.target.value * 100
												: ''
										)
									}
								/>
							</span>
						</span>

						<select
							onChange={e => setCategory(e.target.value)}
							className="btn-category">
							<option value="">All Categories</option>
							<option value="running">Running</option>
							<option value="lifestyle">Lifestyle</option>
							<option value="basketball">Basketball</option>
						</select>
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
					<a className="prev-page" onClick={() => setPageFilter(page - 1)}>
						Previous
					</a>
					<div className="pages-container">
						<ul>{pages}</ul>
					</div>
					<a className="next-page" onClick={() => setPageFilter(page + 1)}>
						Next
					</a>
				</div>
			</div>
		</>
	);
}

export default Homepage;
