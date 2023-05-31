import { Link } from "react-router-dom";

const TableRow = ({ index, result }) => {
	return (
		<tr>
			<td>{index + 1}</td>
			<td>
				<Link to={`/protein/${result.accession}`}>{result.accession}</Link>
			</td>
			<td>{result.id}</td>
			<td>{geneBoldText(result.gene)}</td>

			<td>
				<span className="organismCell">{result.organism_name}</span>
			</td>
			<td>{result.subcellularLocations}</td>
			<td>{result.length}</td>
		</tr>
	);
};

export default TableRow;

const geneBoldText = (text) => {
	const words = text.split(",");
	if (words.length == 1) {
		return (
			<>
				<strong>{text}</strong>
			</>
		);
	}
	const firstWord = words[0].trim();

	return (
		<>
			<strong>{firstWord},</strong>
			{words.slice(1).join(",")}
		</>
	);
};
