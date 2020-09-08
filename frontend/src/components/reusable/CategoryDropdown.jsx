import React from 'react';

function CategoryDropdown(props) {
	return (
		<span className="category-dropdown" onClick={() => alert('clicked')}>
			<button className="btn-category">Running</button>
			<ul className={'hidden'}>
				{props.default ? <li>{props.default}</li> : null}
				<li>Running</li>
				<li>Lifestyle</li>
				<li>Basketball</li>
			</ul>
		</span>
	);
}

export default CategoryDropdown;
