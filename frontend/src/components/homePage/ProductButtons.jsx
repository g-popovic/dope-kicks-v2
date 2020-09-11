import React from 'react';
import SettingsIcon from '../../images/settings-24px.svg';
import { useDispatch } from 'react-redux';
import { toggleEditPanel } from '../../redux/reduxActions';
import { ROLES } from '../../utils/data';

function ProductButtons(props) {
	const dispatch = useDispatch();

	const canEdit =
		props.userRole === ROLES.MASTER ||
		(props.userRole === ROLES.ADMIN && !props.product.isDefault);

	const isAdmin =
		props.userRole === ROLES.ADMIN || props.userRole === ROLES.MASTER;

	function openEditPanel() {
		dispatch(toggleEditPanel(props.product));
	}

	return (
		<span className="product-buttons-container">
			<button className="btn-primary">ADD TO CART</button>
			{isAdmin ? (
				<button
					onClick={() => (canEdit ? openEditPanel() : null)}
					className={'btn-edit ' + (canEdit ? '' : ' not-editable')}>
					<img src={SettingsIcon} />
					{canEdit ? null : (
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
