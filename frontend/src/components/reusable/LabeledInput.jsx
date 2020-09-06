import React from 'react';

function LabeledInput(props) {
	return (
		<div className="input-container">
			<label htmlFor={props.name}>{props.label}</label>
			<input
				name={props.name}
				id={props.name}
				type={
					props.inputType === 'password'
						? 'password'
						: props.inputType === 'number'
						? 'number'
						: 'text'
				}
				autoComplete="off"
				placeholder={props.placeholder}></input>
		</div>
	);
}

export default LabeledInput;
