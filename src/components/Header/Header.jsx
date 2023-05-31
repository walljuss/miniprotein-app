import "./header.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { resetSearchSlice } from "../../store/searchSlice";

const Header = () => {
	const userEmail = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleClick = () => {
		signOut(auth)
			.then(() => {
				dispatch(resetSearchSlice());
				dispatch(clearUser());
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="header">
			<p>{userEmail}</p>
			<button className="signOutBtn" onClick={handleClick}>
				Sign Out
			</button>
		</div>
	);
};
export default Header;
