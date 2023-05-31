import ProtvistaUniprot from "protvista-uniprot";
import { useParams } from "react-router-dom";
window.customElements.define("protvista-uniprot", ProtvistaUniprot);
const ProteinViewer = () => {
	const { id } = useParams();
	return (
		<div>
			<protvista-uniprot accession={id} />
		</div>
	);
};
export default ProteinViewer;
