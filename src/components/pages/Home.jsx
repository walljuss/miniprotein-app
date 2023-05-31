import { Link } from "react-router-dom";
import "./home.css";
import SignIn from "../auth/SignIn";

const Home = () => {
	return (
		<div className="homeLayoutContainer">
			<div className="homeLayoutContent">
				<h1>Q1 Search</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dicta
					quaerat tempora eveniet ipsum laudantium minus expedita. Mollitia
				</p>
				<div className="homeLayoutButton">
					<Link to="/signin">Login</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
