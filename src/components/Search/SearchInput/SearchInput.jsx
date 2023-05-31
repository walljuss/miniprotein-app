import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProteinName } from "../../../store/searchSlice";
import "./SearchInput.css";

const SearchInput = () => {
	const dispatch = useDispatch();
	const { proteinName } = useSelector((state) => state.search);

	const handleSubmit = (event) => {
		event.preventDefault();
		//tried to redirect to this link and from there handle the search..
		//why navigate behavior is different?
		const url = `/search?query=${proteinName}`;
		location.href = url;
	};

	return (
		<form className="searchInput" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="ex: collagen"
				value={proteinName}
				onChange={(event) => {
					dispatch(setProteinName(event.target.value));
				}}
			/>
			<button type="submit">Search</button>
		</form>
	);
};

export default SearchInput;
