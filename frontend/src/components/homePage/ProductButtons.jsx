import React from 'react';
import SettingsIcon from '../../images/settings-24px.svg';
import { useDispatch, batch } from 'react-redux';
import { toggleEditPanel } from '../../redux/actions';

function ProductButtons(props) {
	const dispatch = useDispatch();

	function openEditPanel() {
		dispatch(toggleEditPanel(props.product));
	}

	return (
		<span className="product-buttons-container">
			<button className="btn-primary">ADD TO CART</button>
			{props.isAdmin ? (
				<button
					onClick={() => (props.canEdit ? openEditPanel() : null)}
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
