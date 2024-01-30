import { memo, useCallback, useEffect, useState } from "react";
// import { MouseEvent, KeyboardEvent } from "react";
import PropTypes from "prop-types";
import "./App.css";

interface Props {
	children?: any;
}

// assigning the type of the is FC functional component
const App: React.FC<Props> = memo((props: Props) => {
	const [isLogged, setIsLogged] = useState(false);

	const [inputEmail, setInputEmail] = useState("");
	const [users, setUsers] = useState<any>({});

	// state of the page, what it shows
	const [page, setPage] = useState<any>(<></>);

	const onClickLogin = useCallback(() => {
		setIsLogged(true);
		localStorage.setItem("email", inputEmail);
		if (!!users[inputEmail]) {
			const newUsers = {
				...users,
				[inputEmail]: {
					counter: users[inputEmail].counter + 1,
					lastAccess: new Date().toISOString(),
				},
			};
			setUsers(newUsers);
			localStorage.setItem("users", JSON.stringify(newUsers));
		} else {
			const newUsers = {
				...users,
				[inputEmail]: {
					counter: 1,
					lastAccess: new Date().toISOString(),
				},
			};

			setUsers(newUsers);
			localStorage.setItem("users", JSON.stringify(newUsers));
		}
	}, [inputEmail, users]);

	const onClickLogout = useCallback(() => {
		setInputEmail("");
		setIsLogged(false);
		localStorage.removeItem("email");
	}, []);

	const onChangeEmail = useCallback(
		(event: any) => setInputEmail(event.target.value),
		[]
	);

	useEffect(
		// on loading / mount, fetching data
		() => {
			console.log("didMount");

			// Version 2.0
			const cachedEmail: string | null = localStorage.getItem("email") || "";
			const storedUsers: string = localStorage.getItem("users") || "";
			const cachedUsers: Object = JSON.parse(storedUsers);

			setIsLogged(!!cachedEmail);

			setInputEmail(cachedEmail);
			setUsers(cachedUsers);
		},
		[]
	);

	useEffect(
		// when isLogged change
		() => {
			console.log("didUpdate");

			const welcomePage = (
				<>
					{!!users[inputEmail] && users[inputEmail].counter > 1 ? (
						<>
							<div>Bentornat* {inputEmail}</div>
							<div>
								Ultimo accesso{" "}
								{new Date(users[inputEmail].lastAccess).toLocaleString()}
							</div>
						</>
					) : (
						<div>Benvenut* {inputEmail}</div>
					)}
					<button onClick={onClickLogout}>Logout</button>
				</>
			);

			const loginPage = (
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

			setPage(isLogged ? welcomePage : loginPage);
		},
		[isLogged, users, inputEmail, onChangeEmail, onClickLogin]
	);

	return (
		<section className="container-fluid d-flex flex-column justify-content-center align-content-center g-1 p-auto m-auto w-50 h-100">
			{page}
		</section>
	);
});

App.propTypes = {
	children: PropTypes.any,
};

export default App;
