export const backend =
	process.env.NODE_ENV === 'production'
		? 'http://dope-kicks.xyz'
		: 'http://localhost:5000';
