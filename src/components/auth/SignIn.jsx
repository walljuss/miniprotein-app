import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useSelector } from "react-redux";

const SignIn = () => {
	const userEmail = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (userEmail) {
			navigate("/search");
		}
	});

	const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (email.trim() === "" || password.trim() === "") {
			setErrorMessage("Please complete all fields");
			return;
		}

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const { email } = userCredential.user;
				dispatch(setUser(email));
				navigate("/search");
			})
			.catch((error) => {
				const errorCode = error.code;
				let errorMessage = "";

				switch (errorCode) {
					case AuthErrorCodes.USER_DELETED:
					case AuthErrorCodes.INVALID_PASSWORD:
						errorMessage = "Either email or password is incorrect";
						break;
					case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
						errorMessage = "Too many attempts. Try again later";
						break;
					default:
						errorMessage = "An error occurred";
						break;
				}

				setErrorMessage(errorMessage);
				console.log(error);
			});
	};

	return (
		<div className="sign-form">
			<form onSubmit={handleSubmit}>
				<p className="authHeader">Login</p>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={errorMessage ? "errorInput" : ""}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={errorMessage ? "errorInput" : ""}
				/>

				<button className="signBtn" type="submit">
					Login
				</button>

				{errorMessage && <p className="error">{errorMessage}</p>}

				<div>
					<span>
						Don't have an account? <Link to="/signup">Sign Up</Link>
					</span>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
