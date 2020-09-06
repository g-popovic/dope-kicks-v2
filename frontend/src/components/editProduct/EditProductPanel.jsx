import React from 'react';
import LabeledInput from '../reusable/LabeledInput';
import CategoryDropdown from '../reusable/CategoryDropdown';
import UploadIcon from '../../images/cloud_upload-24px.svg';

function EditProductPanel() {
	return (
		<div className="edit-product-background">
			<div className="edit-product-container">
				<div className="edit-product-right-panel">
					<h1>Edit Product</h1>
					<div className="edit-product-flex-container">
						<div className="upload-image-container">
							<div className="upload-image">
								{/* <img
							src="https://images.nike.com/is/image/DotCom/315115_112?$NIKE_PWP_GRAY$&wid=600&hei=700"
							alt="product"
						/> */}
								<label
									className="unselected"
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
						<button className="btn-secondary">CANCEL</button>
						<button className="btn-primary">SAVE</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProductPanel;
