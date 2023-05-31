import TableRow from "./TableRow";

const TableBody = ({ searchResults }) => {
	return (
		<>
			<tbody>
				{searchResults.map((result, index) => (
					<TableRow
						key={`${result.primaryAccession}-${index}`}
						index={index}
						result={result}
					/>
				))}
			</tbody>
		</>
	);
};

export default TableBody;
