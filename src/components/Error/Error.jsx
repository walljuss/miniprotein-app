import Search from "../Search/Search";
import { Link } from "react-router-dom";
import "./error.css";

const Error = () => {
	return (
		<div className="errorContainer">
			<div className="errTop">
				<p className="err404">404</p>
				<p>Page Not Found</p>
			</div>
			<div className="errBot">
				<Link to="/search" element={<Search />}>
					Back to Search
				</Link>
			</div>
		</div>
	);
};
export default Error;
