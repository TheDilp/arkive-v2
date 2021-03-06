import { Link } from "react-router-dom";
type Props = {
  title?: string;
  nodeId: string | undefined;
  nodeLabel: string;
};
export default function MapMention({ title, nodeId, nodeLabel }: Props) {
  return nodeId ? (
    <Link
      className={`Lato text-white text-base fontWeight700`}
      id={`link-${nodeId}`}
      to={`../../maps/${nodeId}`}
    >
      <i className="pi pi-map-marker underline"></i>
      {title || nodeLabel}
    </Link>
  ) : (
    <div className="Lato text-white">{nodeLabel}</div>
  );
}
