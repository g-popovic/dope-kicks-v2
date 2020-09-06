import React from 'react';
import SettingsIcon from '../../images/settings-24px.svg';

function ProductButtons(props) {
	return (
		<span className="product-buttons-container">
			<button className="btn-primary">ADD TO CART</button>
			{props.isAdmin ? (
				<button
					className={'btn-edit ' + (props.canEdit ? '' : ' not-editable')}>
					<img src={SettingsIcon} />
					{props.canEdit ? null : (
						<span className="not-editable-tooltip">
							You can't edit a default product.
						</span>
					)}
				</button>
			) : null}
		</span>
	);
}

export default ProductButtons;
