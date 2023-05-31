import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import "./PrivateRoute.css";

const PrivateRoute = ({ children, ...rest }) => {
	const isSigned = useSelector((state) => state.auth.isSignedIn);
	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
		});

		return () => {
			listen();
		};
	}, []);

	return isSigned || authUser ? (
		<>
			<div className="privateLayout">
				<Header />
				<Outlet />
			</div>
		</>
	) : (
		<Navigate to="/signin" />
	);
};

export default PrivateRoute;
