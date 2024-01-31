import React from "react";
import PropTypes from "prop-types";

// to avoid ```Binding element 'inputEmail' implicitly has an 'any' type```
interface Props {
	children?: any;
	inputEmail: any;
	onChangeEmail: any;
	onClickLogin: any;
}

const Login: React.FC<Props> = ({
	inputEmail,
	onChangeEmail,
	onClickLogin,
}) => {
	return (
		<>
			<input
				placeholder="Inserisci email"
				value={inputEmail}
				onChange={onChangeEmail}
			/>
			<button onClick={onClickLogin} disabled={!inputEmail}>
				Login
			</button>
		</>
	);
};

Login.propTypes = {
	children: PropTypes.node,
	inputEmail: PropTypes.string,
	onChangeEmail: PropTypes.func,
	onClickLogin: PropTypes.func,
};

export default Login;
