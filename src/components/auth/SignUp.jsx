import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./auth.css";

const SignUp = () => {
	const navigate = useNavigate();
	const userEmail = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (userEmail) {
			navigate("/search");
		}
	});

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateEmail(email)) {
			setErrorMessage("Invalid email address");
			return;
		}

		if (password !== repeatPassword) {
			setErrorMessage("Passwords don't match");
			return;
		}

		if (!validatePassword()) {
			return;
		}

		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigate("/search");
			})
			.catch((error) => {
				const errorCode = error.code;
				if (errorCode === "auth/weak-password") {
					setErrorMessage("Password must be at least 6 characters");
				} else if (errorCode == "auth/email-already-in-use") {
					setErrorMessage("Email already in use/registered");
				} else {
					console.log(error);
				}
			});
	};

	const validatePassword = () => {
		if (!/(?=.*[a-z])/.test(password)) {
			setErrorMessage("Password must contain at least one lowercase letter");
			return false;
		}
		if (!/(?=.*[A-Z])/.test(password)) {
			setErrorMessage("Password must contain at least one uppercase letter");
			return false;
		}
		return true;
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			return false;
		}

		return true;
	};

	return (
		<div className="sign-form">
			<form onSubmit={handleSubmit}>
				<h1>Sign Up</h1>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => {
						setErrorMessage("");
						setEmail(e.target.value);
					}}
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => {
						setErrorMessage("");
						setPassword(e.target.value);
					}}
				/>
				<label htmlFor="repeatPassword">Repeat Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					value={repeatPassword}
					onChange={(e) => {
						setErrorMessage("");
						setRepeatPassword(e.target.value);
					}}
				/>
				{errorMessage && (
					<p style={{ color: "red", marginTop: "5px" }}>{errorMessage}</p>
				)}
				<button className="signBtn" type="submit" disabled={errorMessage}>
					Create Account
				</button>
				<div>
					<span>
						Already have an account? <Link to="/signin">Sign In</Link>
					</span>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
