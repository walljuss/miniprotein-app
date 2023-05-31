import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableHeader from "../searchResultsTable/TableHeader";
import TableBody from "../searchResultsTable/TableBody";
import "./SearchTable.css";
import NoData from "../NoData/NoData";
import { useLocation } from "react-router-dom";
import Loading from "../../Loading/Loading";

const SearchTable = ({ fetchResults }) => {
	const location = useLocation();
	const { searchResults, nextLink, loading, totalNumber, proteinName } =
		useSelector((state) => state.search);
	let isProteinData = false;
	isProteinData = searchResults.length > 0 ? true : false;

	const handleSort = () => {
		return;
	};

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight && nextLink && !loading) {
			fetchResults(nextLink);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [nextLink, loading]);

	const proteinNameRender = () => {
		const queryParams = new URLSearchParams(location.search);
		const query = queryParams.get("query");

		if (query && query == (null || "" || "*")) {
			return "all";
		} else if (query) {
			return query.charAt(0).toUpperCase() + query.slice(1);
		}
		return;
	};

	return (
		<>
			{!isProteinData ? (
				<NoData />
			) : (
				<>
					<div className="totalNumber">
						{totalNumber} Search Results for {proteinNameRender()}
					</div>
					<div className="tableContainer">
						<table className="proteinList">
							<TableHeader onSort={handleSort} />
							<TableBody searchResults={searchResults} />
						</table>
						{loading && <Loading />}
						<div></div>
					</div>
				</>
			)}
		</>
	);
};

export default SearchTable;
