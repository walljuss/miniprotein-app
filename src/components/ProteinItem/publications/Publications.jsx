import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Publications.css";
import linkLogo from "../assets/newLink.png";

const Publications = () => {
	const { id } = useParams();
	const url = `https://rest.uniprot.org/uniprotkb/${id}/publications`;
	const [publications, setPublications] = useState([]);

	useEffect(() => {
		const fetchPublications = async () => {
			const data = await getData(url).then((data) => data.results);
			setPublications(data);
		};
		fetchPublications();
	}, [url]);
	return (
		<div className="publications">
			{publications.map((publication, index) => (
				<div
					key={`${publication.citation.id}-${index}`}
					className="publication"
				>
					<div className="title">{publication.citation.title}</div>
					<div className="authors">
						{publication?.citation?.authors?.join(",") || "no-data"}
					</div>
					<div className="extraPubProp">
						<p className="propertyTitle">Categories:</p>
						<p>
							{publication?.references?.[0]?.sourceCategories?.join(",") ||
								"no-data"}
						</p>
					</div>
					<div className="extraPubProp">
						<p className="propertyTitle">Cited For:</p>
						<p>
							{publication?.references?.[0]?.referencePositions?.join(";") ||
								"no-data"}
						</p>
					</div>
					<div className="extraPubProp">
						<p className="propertyTitle">Source:</p>
						<p>{publication?.references?.[0]?.source?.name || "no-data"}</p>
					</div>
					<div className="journalLinks">
						{publication?.citation?.citationCrossReferences?.map(
							(data, index) => {
								return (
									<Link key={index} target="_blank" to={linkMaker(data)}>
										{data.database}
										<img className="newLink" src={linkLogo} alt="" />
									</Link>
								);
							}
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default Publications;

const getData = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const linkMaker = (obj) => {
	if (!obj) {
		return null;
	}
	switch (obj.database) {
		case "PubMed":
			return `https://pubmed.ncbi.nlm.nih.gov/${obj.id}/`;
		case "DOI":
			return `https://doi.org/${obj.id}`;

		default:
			return null;
	}
};
