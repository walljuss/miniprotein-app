const TableHeader = ({ onSort }) => {
	return (
		<thead>
			<tr>
				<th className="proteinNumber">#</th>
				<SortableHeader
					className="proteinAccessionHeader"
					onClick={onSort}
					column="accession"
				>
					Entry
				</SortableHeader>
				<SortableHeader className="proteinID" onClick={onSort} column="id">
					Entry Names
				</SortableHeader>
				<SortableHeader className="proteinGene" onClick={onSort} column="gene">
					Genes
				</SortableHeader>
				<SortableHeader
					className="proteinOrganism"
					onClick={onSort}
					column="organism_name"
				>
					Organism
				</SortableHeader>
				<SortableHeader
					className="proteinSubcellularLocation"
					onClick={onSort}
					column="SubLocations"
				>
					Subcellular Locations
				</SortableHeader>
				<SortableHeader
					className="proteinLength"
					onClick={onSort}
					column="length"
				>
					Length
				</SortableHeader>
			</tr>
		</thead>
	);
};

const SortableHeader = ({ onClick, column, children, className }) => {
	return (
		<th className={className} onClick={() => onClick(column)}>
			{children}
		</th>
	);
};

export default TableHeader;
