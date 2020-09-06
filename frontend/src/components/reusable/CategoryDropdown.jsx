import React, { useState } from 'react';

function CategoryDropdown(props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<span className="category-dropdown" onClick={() => setIsOpen(prev => !prev)}>
			<button className="btn-category">Running</button>
			<ul className={isOpen ? '' : 'hidden'}>
				{props.default ? <li>{props.default}</li> : null}
				<li>Running</li>
				<li>Lifestyle</li>
				<li>Basketball</li>
			</ul>
		</span>
	);
}

export default CategoryDropdown;
