import React from 'react';
import LabeledInput from '../reusable/LabeledInput';
import CategoryDropdown from '../reusable/CategoryDropdown';
import UploadIcon from '../../images/cloud_upload-24px.svg';
import CloseIcon from '../../images/close_black-24px.svg';

import { useSelector, useDispatch } from 'react-redux';
import { toggleEditPanel } from '../../redux/actions';

function EditProductPanel() {
	const isEditPanelOpen = useSelector(state => state.isEditPanelOpen);
	const dispatch = useDispatch();

	return !isEditPanelOpen ? null : (
		<div
			id="edit-panel-background"
			className="edit-product-background"
			onClick={e => {
				if (e.target.id === 'edit-panel-background') {
					dispatch(toggleEditPanel());
				}
			}}>
			<div className="edit-product-container">
				<button
					className="exit-edit-product"
					onClick={() => dispatch(toggleEditPanel())}>
					<img alt="close" src={CloseIcon} />
				</button>
				<div className="edit-product-right-panel">
					<h1>Edit Product</h1>
					<div className="edit-product-flex-container">
						<div className="upload-image-container">
							<div className="upload-image">
								<img
									src="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
									alt="product"
								/>
								<label
									// className="unselected"
									htmlFor="product-image">
									<img
										className="upload-icon"
										alt="upload"
										src={UploadIcon}
									/>
								</label>
							</div>
							<label htmlFor="product-image">Product Image</label>
							<input
								type="file"
								id="product-image"
								name="product-image"
							/>
						</div>
						<div className="edit-product-right-panel">
							<LabeledInput
								label="Product Name"
								name="name"
								placeholder="Name of product"
							/>
							<LabeledInput
								label="Price (IN CENTS)"
								name="price"
								placeholder="Price of product"
								inputType="number"
							/>
							<LabeledInput
								label="Short Description"
								name="description"
								placeholder="Description of product"
							/>
							<CategoryDropdown />
						</div>
					</div>

					<div className="product-edit-buttons">
						<button
							onClick={() => dispatch(toggleEditPanel())}
							className="btn-secondary">
							CANCEL
						</button>
						<button className="btn-primary">SAVE</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProductPanel;
