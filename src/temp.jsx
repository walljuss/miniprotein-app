import React, { useState, useEffect } from "react";
import "./search.css";
import { extractLink } from "./utils";

const Search = () => {
	const [proteinName, setProteinName] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [sortOrder, setSortOrder] = useState("");
	const [sortedColumn, setSortedColumn] = useState("");
	const [nextLink, setNextLink] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSearch = async () => {
		setSearchResults([]);
		setNextLink(null);
		setSortOrder("");
		setSortedColumn("");
		fetchResults(
			`https://rest.uniprot.org/uniprotkb/search?fields=accession,reviewed,id,protein_name,gene_names,organism_name,length,ft_peptide,cc_subcellular_location&query=${proteinName}`
		);
	};

	const fetchResults = async (url) => {
		setLoading(true);
		const response = await fetch(url);
		const data = await response.json();
		const entries = data.results.map((result) => {
			const { primaryAccession, uniProtkbId, organism, genes, sequence } =
				result;

			return {
				accession: primaryAccession,
				id: uniProtkbId,
				gene: genes[0]?.geneName?.value || "-",
				organism_name: organism?.scientificName || "-",
				length: sequence?.length || "-",
			};
		});

		setSearchResults((prevResults) => [...prevResults, ...entries]);

		const linkHeader = response.headers.get("link");
		const nextLink = extractLink(linkHeader);
		console.log(nextLink);
		setNextLink(nextLink);

		setLoading(false);
	};

	const handleSort = (column) => {
		let newSortOrder = sortOrder === "asc" ? "desc" : "asc";
		setSortOrder(newSortOrder);
		setSortedColumn(column);

		let sortedResults = [...searchResults];
		sortedResults.sort((a, b) => {
			if (column === "length") {
				if (newSortOrder === "asc") {
					return a[column] - b[column];
				} else {
					return b[column] - a[column];
				}
			} else {
				if (newSortOrder === "asc") {
					return a[column].localeCompare(b[column]);
				} else {
					return b[column].localeCompare(a[column]);
				}
			}
		});

		setSearchResults(sortedResults);
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

	return (
		<div className="searchContainer">
			<input
				type="text"
				value={proteinName}
				onChange={(event) => setProteinName(event.target.value)}
			/>
			<button onClick={handleSearch}>Search</button>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th onClick={() => handleSort("accession")}>
							Entry - Accession
							{sortedColumn === "accession" && (
								<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
							)}
						</th>
						<th onClick={() => handleSort("id")}>
							Entry Name - ID
							{sortedColumn === "id" && (
								<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
							)}
						</th>
						<th onClick={() => handleSort("gene")}>
							Gene Names
							{sortedColumn === "gene" && (
								<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
							)}
						</th>
						<th onClick={() => handleSort("organism_name")}>
							Organism
							{sortedColumn === "organism_name" && (
								<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
							)}
						</th>
						<th onClick={() => handleSort("length")}>
							Length
							{sortedColumn === "length" && (
								<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
							)}
						</th>
					</tr>
				</thead>
				<tbody>
					{searchResults.map((result, index) => (
						<tr key={index}>
							<td>{index + 1}</td>
							<td>{result.accession}</td>
							<td>{result.id}</td>
							<td>{result.gene}</td>
							<td>{result.organism_name}</td>
							<td>{result.length}</td>
						</tr>
					))}
				</tbody>
			</table>
			{loading && <p>Loading...</p>}
		</div>
	);
};

export default Search;
