import React, { useState, useEffect, useRef } from "react";
import { Outlet, useParams } from "react-router-dom";
import "./proteinItem.css";
import { useMatch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { getData } from "../Search/utils";
import copyBtn from "./assets/copyButton.png";

const Protein = () => {
	const { id } = useParams();
	const [proteinData, setProteinData] = useState(null);
	const [loading, setLoading] = useState(false);
	const match = useMatch("/protein/:id");
	const url = `https://rest.uniprot.org/uniprotkb/${id}`;
	const textRef = useRef(null);
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(textRef.current.innerText);
			console.log("Text copied to clipboard!");
		} catch (error) {
			console.error("Failed to copy text:", error);
		}
	};
	useEffect(() => {
		const fetchProteinData = async () => {
			setLoading(true);
			const data = await getData(url);
			setProteinData(data);
			setLoading(false);
		};

		fetchProteinData();
	}, [id]);

	if (loading) {
		return <p className="protein">Loading protein data...</p>;
	}

	if (!proteinData) {
		return <p className="protein">No protein data found.</p>;
	}

	return (
		<div className="protein">
			<div className="proteinHeader">
				<div className="proteinName">
					<div className="proteinAccession">
						{proteinData?.primaryAccession || "no-data"} ,
						{proteinData?.uniProtkbId || "no-data"}
					</div>
					<div className="proteinScientificName blueCircle">
						{proteinData?.organism?.scientificName || "no-data"}
					</div>
				</div>
				<div className="proteinExtraInfo">
					<p className="grey16">Protein</p>
					<p>
						{proteinData?.proteinDescription?.recommendedName?.fullName
							?.value || "no-data"}
					</p>
					<p className="grey16">Gene</p>
					<p>{proteinData?.genes?.[0]?.geneName?.value || "no-data"}</p>
				</div>
			</div>

			<div className="proteinLinks">
				<NavLink
					className={({ isActive }) =>
						isActive ? "activeClass" : "inactiveClass"
					}
					end
					to={`/protein/${id}`}
				>
					Details
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? "activeClass" : "inactiveClass"
					}
					to={`/protein/${id}/feature`}
				>
					Feature Viewer
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? "activeClass" : "inactiveClass"
					}
					to={`/protein/${id}/publications`}
				>
					Publications
				</NavLink>
			</div>

			{match ? (
				<>
					<button className="copyButton" onClick={handleCopy}>
						<img src={copyBtn} alt="" />
					</button>
					<div ref={textRef} className="proteinSequence proteinExtraDetails">
						{proteinData?.sequence?.value}
					</div>
				</>
			) : (
				<div className="proteinExtraDetails">
					<Outlet />
				</div>
			)}
		</div>
	);
};

export default Protein;
