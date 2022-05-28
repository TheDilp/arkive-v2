import { Link } from "react-router-dom";
type Props = {
  title?: string;
  nodeId: string | undefined;
  nodeLabel: string;
};
export default function PublicMapMention({ title, nodeId, nodeLabel }: Props) {
  return (
    <Link
      className={`Lato text-white test`}
      id={`link-${nodeId}`}
      style={{
        fontWeight: "700",
      }}
      to={`../../maps/${nodeId}`}
    >
      <i className="pi pi-map-marker underline"></i>
      {title || nodeLabel}
    </Link>
  );
}