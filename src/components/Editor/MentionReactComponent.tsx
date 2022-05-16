import { useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { BoardProps, DocumentProps, MapProps } from "../../custom-types";
import { Tooltip } from "primereact/tooltip";
import { Card } from "primereact/card";
import RemirrorContext from "./RemirrorContext";
import LinkHoverWindow from "./LinkHover/LinkHoverWindow";
type Props = {
  node: any;
};

export default function MentionReactComponent({ node }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const queryClient = useQueryClient();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { project_id } = useParams();
  const docs: DocumentProps[] | undefined = queryClient.getQueryData(
    `${project_id}-documents`
  );
  const maps: MapProps[] | undefined = queryClient.getQueryData<MapProps[]>(
    `${project_id}-maps`
  );
  const boards: BoardProps[] | undefined = queryClient.getQueryData<
    BoardProps[]
  >(`${project_id}-boards`);
  let docItem: DocumentProps | undefined;
  let mapItem: MapProps | undefined;
  let boardItem: BoardProps | undefined;

  if (node.attrs.name === "at") {
    docItem = docs ? docs.find((doc) => doc.id === node.attrs.id) : undefined;
  } else if (node.attrs.name === "hash") {
    mapItem = maps ? maps.find((map) => map.id === node.attrs.id) : undefined;
  } else {
    boardItem = boards
      ? boards.find((board) => board.id === node.attrs.id)
      : undefined;
  }
  let { id: nodeId, name: nodeName, label: nodeLabel } = node.attrs;
  return (
    <>
      {nodeName === "at" && docItem && (
        <Tooltip
          target={`#link-${nodeId}`}
          className="w-20rem h-20rem"
          showDelay={500}
          hideDelay={750}
          autoHide={false}
          baseZIndex={5555}
          event="hover"
        >
          <Card title={docItem.title} className="w-full h-full overflow-y-auto">
            <LinkHoverWindow content={docItem.content} />
          </Card>
        </Tooltip>
      )}
      <Link
        className={`Lato text-white test`}
        id={`link-${nodeId}`}
        style={{
          fontWeight: "700",
        }}
        to={
          nodeName === "at"
            ? `../${nodeId}`
            : nodeName === "hash"
            ? `../../maps/${nodeId}`
            : `../../boards/${nodeId}`
        }
      >
        {nodeName === "hash" ? (
          <i className="pi pi-map-marker underline"></i>
        ) : (
          ""
        )}
        {nodeName === "at" && docItem ? docItem.title : null}
        {nodeName === "hash" ? mapItem && mapItem.title : null}
        {nodeName === "dollah" && boardItem ? boardItem.title : null}
        {!nodeName && nodeLabel}
      </Link>
    </>
  );
}
