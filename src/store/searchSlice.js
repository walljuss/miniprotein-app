import { createSlice, createAction } from "@reduxjs/toolkit";

const searchSlice = createSlice({
	name: "search",
	initialState: {
		proteinName: "",
		searchResults: [],
		loading: false,
		nextLink: null,
		totalNumber: 0,
	},
	reducers: {
		setProteinName: (state, action) => {
			state.proteinName = action.payload;
		},
		setSearchResults: (state, action) => {
			state.searchResults = action.payload;
		},
		setNextLink: (state, action) => {
			state.nextLink = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setTotalNumber: (state, action) => {
			state.totalNumber = action.payload;
		},
		resetSearchSlice: () => {
			return {
				proteinName: "",
				searchResults: [],
				loading: false,
				nextLink: null,
				totalNumber: 0,
			};
		},
	},
});

export const {
	setProteinName,
	setSearchResults,
	setNextLink,
	setLoading,
	setTotalNumber,
	resetSearchSlice,
} = searchSlice.actions;

export default searchSlice.reducer;
