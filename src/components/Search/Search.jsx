import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchInput from "./SearchInput/SearchInput";
import SearchTable from "./SearchTable/SearchTable";
import {
	setProteinName,
	setSearchResults,
	setLoading,
	setNextLink,
	setTotalNumber,
} from "../../store/searchSlice";
import { extractLink } from "./utils";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { proteinName, searchResults } = useSelector((state) => state.search);

	const fetchResults = async (url) => {
		dispatch(setLoading(true));
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failed to fetch search results.");
			}
			const data = await response.json();
			const entries = data.results.map((result) => {
				const {
					primaryAccession,
					uniProtkbId,
					organism,
					genes,
					sequence,
					comments,
				} = result;

				const subcellularLocations =
					comments?.find(
						(comment) => comment.commentType === "SUBCELLULAR LOCATION"
					)?.subcellularLocations || [];
				const locationValues = subcellularLocations
					.map((location) => location.location.value)
					.join(", ");

				let geneValues = genes?.reduce((accumulator, gene) => {
					const geneName = gene.geneName?.value;
					const synonyms =
						gene.synonyms?.map((synonym) => synonym.value).join(", ") || "";
					return [...accumulator, geneName, synonyms];
				}, []);

				let geneString =
					geneValues?.length > 0
						? geneValues.filter(Boolean).join(", ")
						: "no-data";

				//Some genes object keys are different..Might be some other exceptions as well..
				if (geneString == "") {
					console.log(genes[0].orderedLocusNames[0].value);
					geneString =
						genes[0]?.orfNames?.[0]?.value ||
						genes[0]?.orderedLocusNames?.[0]?.value ||
						"no-data";
				}

				return {
					accession: primaryAccession,
					id: uniProtkbId,
					gene: geneString,
					organism_name: organism?.scientificName || "no-data",
					length: sequence?.length || "no-data",
					subcellularLocations: locationValues || "no-data",
				};
			});

			dispatch(setSearchResults([...searchResults, ...entries]));
			const linkHeader = response.headers.get("link");
			const xTotalResults = response.headers.get("X-Total-Results");
			dispatch(setTotalNumber(xTotalResults));
			// works only if the nextLink or any other data is available, as it thrown an error with no condition
			//some genes values are numbers?
			if (linkHeader) {
				const nextLink = extractLink(linkHeader);
				dispatch(setNextLink(nextLink));
			}
			dispatch(setLoading(false));
		} catch (error) {
			console.error(error);
			dispatch(setLoading(false));
		}
	};

	//when the user directly searches for the protein/browser..
	//input is also works similar with redirection
	useEffect(() => {
		const url = window.location.href;
		const urlParams = new URL(url);
		const query = urlParams.searchParams.get("query");
		if (
			(query == proteinName && proteinName !== "") ||
			(query == "" && proteinName == "*")
		) {
			return;
		}

		if (query) {
			dispatch(setProteinName(query));
			fetchResults(
				`https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${query}`
			);
		} else if (query == "") {
			dispatch(setProteinName("*"));
			fetchResults(
				`https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=*`
			);
			navigate("/search?query=*");
		}
	}, []);

	return (
		<div className="searchContainer">
			<SearchInput />
			<SearchTable fetchResults={fetchResults} />
		</div>
	);
};

export default Search;
