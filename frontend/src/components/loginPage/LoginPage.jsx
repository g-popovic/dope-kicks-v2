import React from 'react';
import LabeledInput from '../reusable/LabeledInput';
import GoogleLogo from '../../images/google-icon.svg';
import LoginBackground from '../../images/Nike Sneakers Background.jpg';

function LoginPage() {
	return (
		<>
			<div className="login-page-container">
				<div className="login-content-container">
					<h2 className="amazoon-logo">AMAZOON</h2>
					<h1>CREATE AN ACCOUNT</h1>
					<LabeledInput
						label="Username"
						name="username"
						placeholder="Enter Username"
					/>
					<LabeledInput
						label="Password"
						name="password"
						placeholder="Enter Password"
						isPassword={true}
					/>

					<div className="sign-in-buttons">
						<button className="btn-primary">REGISTER</button>
						<a>Have an account?</a>
					</div>

					<div className="login-seperation">
						<span>OR</span>
					</div>

					<button className="google">
						<img alt="google-icon" src={GoogleLogo} />
						<span>Continue with Google</span>
					</button>
				</div>
			</div>
			<div className="image-tint"></div>
			<img className="hide-mobile login-background" src={LoginBackground} />
		</>
	);
}

export default LoginPage;
