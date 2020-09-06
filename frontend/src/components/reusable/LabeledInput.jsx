import React from 'react';

function LabeledInput(props) {
	return (
		<div className="input-container">
			<label htmlFor={props.name}>{props.label}</label>
			<input
				name={props.name}
				type={props.isPassword ? 'password' : 'text'}
				autoComplete="off"
				placeholder={props.placeholder}></input>
		</div>
	);
}

export default LabeledInput;
