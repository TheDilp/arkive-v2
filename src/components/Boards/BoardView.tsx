import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useCallback, useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  BoardContextMenuProps,
  CytoscapeEdgeProps,
  CytoscapeNodeProps,
  edgeUpdateDialogProps,
  nodeUpdateDialogProps,
} from "../../custom-types";
import {
  useCreateEdge,
  useGetBoardData,
  useUpdateNode,
} from "../../utils/customHooks";
import {
  boardLayouts,
  changeLayout,
  cytoscapeGridOptions,
  cytoscapeStylesheet,
  edgehandlesSettings,
  toastWarn,
} from "../../utils/utils";
import BoardContextMenu from "./BoardContextMenu";
import EdgeUpdateDialog from "./EdgeUpdateDialog";
import NodeUpdateDialog from "./NodeUpdateDialog";
import { saveAs } from "file-saver";

type Props = {
  setBoardId: (boardId: string) => void;
  cyRef: any;
};
export default function BoardView({ setBoardId, cyRef }: Props) {
  const navigate = useNavigate();
  const { project_id, board_id } = useParams();
  const board = useGetBoardData(project_id as string, board_id as string);
  const [elements, setElements] = useState<
    (CytoscapeNodeProps | CytoscapeEdgeProps)[]
  >([]);
  const [layout, setLayout] = useState<string | null>();
  const ehRef = useRef() as any;
  const grRef = useRef() as any;
  const cm = useRef() as any;
  const firstRender = useRef(true) as any;

  const [nodeUpdateDialog, setNodeUpdateDialog] =
    useState<nodeUpdateDialogProps>({
      id: "",
      label: "",
      type: "",
      doc_id: undefined,
      width: 0,
      height: 0,
      fontSize: 0,
      backgroundColor: "",
      textHAlign: "center",
      textVAlign: "top",
      zIndex: 1,
      show: false,
    });
  const [edgeUpdateDialog, setEdgeUpdateDialog] =
    useState<edgeUpdateDialogProps>({
      id: "",
      label: "",
      curveStyle: "",
      lineStyle: "",
      lineColor: "",
      controlPointDistances: 0,
      controlPointWeights: 0,
      taxiDirection: "",
      taxiTurn: 0,
      targetArrowShape: "",
      zIndex: 1,
      show: false,
    });
  const [contextMenu, setContextMenu] = useState<BoardContextMenuProps>({
    x: 0,
    y: 0,
    type: "board",
  });
  const [drawMode, setDrawMode] = useState(false);
  const [snap, setSnap] = useState(true);
  const updateNodeMutation = useUpdateNode(project_id as string);
  const createEdgeMutation = useCreateEdge(project_id as string);

  useEffect(() => {
    if (elements.length > 0) {
      cyRef.current.on(
        "ehcomplete",
        (event: any, sourceNode: any, targetNode: any, addedEdge: any) => {
          let sourceData = sourceNode._private.data;
          let targetData = targetNode._private.data;
          // Check due to weird edgehandles behavior when toggling drawmode
          // When drawmode is turned on and then off and then back on
          // It can add an edges to a node that doesn't exist
          try {
            cyRef.current.remove(addedEdge);
          } catch (error) {
            toastWarn(
              "Cytoedge couldn't be removed, there was an error (BoardView 102)"
            );
          }
          makeEdgeCallback(sourceData.id, targetData.id);
        }
      );
    }
    return () => cyRef.current.removeListener("ehcomplete");
  }, [elements]);

  useEffect(() => {
    if (board) {
      let temp_nodes: CytoscapeNodeProps[] = [];
      let temp_edges: CytoscapeEdgeProps[] = [];
      if (board.nodes.length > 0) {
        temp_nodes = board.nodes.map((node) => ({
          data: {
            id: node.id,
            classes: "boardNode",
            label: node.label || "",
            type: node.type,
            width: node.width,
            height: node.height,
            fontSize: node.fontSize,
            textHAlign: node.textHAlign,
            textVAlign: node.textVAlign,
            backgroundColor: node.backgroundColor,
            customImage: node.customImage,
            x: node.x,
            y: node.y,
            zIndex: node.zIndex,
            // Custom image has priority, if not set use document image, if neither - empty array
            // Empty string ("") causes issues with cytoscape, so an empty array must be used
            backgroundImage: node.customImage
              ? node.customImage
              : node.document?.image
              ? node.document.image
              : [],
          },
          scratch: {
            doc_id: node.document?.id,
          },
          position: { x: node.x, y: node.y },
        }));
      }
      if (board.edges.length > 0) {
        temp_edges = board.edges.map((edge) => ({
          data: {
            id: edge.id,
            classes: "boardEdge",
            label: edge.label || "",
            source: edge.source,
            target: edge.target,
            curveStyle: edge.curveStyle,
            lineStyle: edge.lineStyle,
            lineColor: edge.lineColor,
            controlPointDistances: edge.controlPointDistances,
            controlPointWeights: edge.controlPointWeights,
            taxiDirection: edge.taxiDirection,
            taxiTurn: edge.taxiTurn,
            targetArrowShape: edge.targetArrowShape,
            zIndex: edge.zIndex,
          },
        }));
      }
      const elements = [...temp_nodes, ...temp_edges];
      setElements(elements);
    }
  }, [board]);

  // Change function when the board_id changes
  const makeEdgeCallback = useCallback(
    (source, target) => {
      let boardId = board_id;
      createEdgeMutation.mutate({
        id: uuid(),
        board_id: boardId as string,
        source,
        target,
        curveStyle: "straight",
        lineStyle: "solid",
        lineColor: "#595959",
        controlPointDistances: -100,
        controlPointWeights: 0.5,
        taxiDirection: "auto",
        taxiTurn: 50,
        targetArrowShape: "triangle",
        zIndex: 1,
      });
    },
    [board_id]
  );

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.on("click", "node", function (evt: any) {
        const scratch = evt.target._private.scratch;
        if (scratch?.doc_id && evt.originalEvent.shiftKey) {
          navigate(`../../wiki/${scratch?.doc_id}`);
        }
      });
      cyRef.current.on("cxttap", function (evt: any) {
        // If the target is the background of the canvas
        if (evt.target === cyRef.current) {
          cm.current.show(evt.originalEvent);
          setContextMenu({ ...evt.position, type: "board" });
        } else {
          let group = evt.target._private.group;
          if (group === "nodes") {
            cm.current.show(evt.originalEvent);
            setContextMenu({
              ...evt.position,
              type: "node",
              selected: evt.target,
            });
          } else if (group === "edges") {
            cm.current.show(evt.originalEvent);
            setContextMenu({
              ...evt.position,
              type: "edge",
              selected: evt.target,
            });
          }
        }
      });
      cyRef.current.on("dbltap", "node", function (evt: any) {
        let target = evt.target._private;
        setNodeUpdateDialog({
          id: target.data.id,
          label: target.data.label,
          type: target.data.type,
          width: target.data.width,
          height: target.data.height,
          fontSize: target.data.fontSize,
          backgroundColor: target.data.backgroundColor,
          customImage: target.data.customImage,
          doc_id: target.scratch.doc_id,
          textHAlign: target.data.textHAlign,
          textVAlign: target.data.textVAlign,
          zIndex: target.data.zIndex,
          show: true,
        });
      });
      cyRef.current.on("dbltap", "edge", function (evt: any) {
        let target = evt.target._private;
        setEdgeUpdateDialog({
          id: target.data.id,
          label: target.data.label,
          curveStyle: target.data.curveStyle,
          lineStyle: target.data.lineStyle,
          lineColor: target.data.lineColor,
          controlPointDistances: target.data.controlPointDistances,
          controlPointWeights: target.data.controlPointWeights,
          taxiDirection: target.data.taxiDirection,
          taxiTurn: target.data.taxiTurn,
          targetArrowShape: target.data.targetArrowShape,
          zIndex: target.data.zIndex,
          show: true,
        });
      });
      cyRef.current.on("free", "node", function (evt: any) {
        let target = evt.target._private;
        updateNodeMutation.mutate({
          id: target.data.id,
          board_id: board_id as string,
          x: target.position.x,
          y: target.position.y,
        });
      });
    }
  }, [cyRef, board_id]);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
    // Reset when changing board_id
    setDrawMode(false);
    ehRef.current = null;
    grRef.current = null;
    if (board_id) {
      setBoardId(board_id);
    }
    return () => {
      cyRef.current.removeListener("click cxttap dbltap free");
      setBoardId("");
    };
  }, [board_id]);
  useEffect(() => {
    if (cyRef && board?.layout) {
      changeLayout(board.layout, cyRef);
      setLayout(board.layout);
    }
  }, [board?.layout, cyRef]);
  useEffect(() => {
    grRef.current = null;

    grRef.current = cyRef.current.gridGuide({
      ...cytoscapeGridOptions,
      snapToGridDuringDrag: snap,
    });
  }, [snap]);

  return (
    <div className="w-full h-full">
      <div className="absolute flex flex-nowrap z-5">
        <div className="relative">
          <Dropdown
            options={boardLayouts}
            value={layout || "Preset"}
            onChange={(e) => {
              setLayout(e.value);
              changeLayout(e.value as string, cyRef);
              cyRef.current.fit();
            }}
          />
        </div>
        <Button
          className={`p-button-rounded mx-2 ${
            drawMode ? "p-button-success" : "p-button-secondary"
          }`}
          icon="pi pi-pencil"
          onClick={() => {
            setDrawMode((prev) => {
              if (prev) {
                ehRef.current.disable();
                ehRef.current.disableDrawMode();
                cyRef.current.autoungrabify(false);
                cyRef.current.autounselectify(false);
                cyRef.current.autolock(false);
                cyRef.current.zoomingEnabled(true);
                cyRef.current.userZoomingEnabled(true);
                cyRef.current.panningEnabled(true);
                setDrawMode(false);
              } else {
                ehRef.current.enable();
                ehRef.current.enableDrawMode();
                setDrawMode(true);
              }
              return !prev;
            });
          }}
          tooltip="Draw Mode"
        />
        <Button
          className={`p-button-rounded ${
            snap ? "p-button-success" : "p-button-secondary"
          }`}
          icon="pi pi-th-large"
          tooltip="Snapping"
          onClick={() => {
            setSnap((prev) => {
              return !prev;
            });
          }}
        />
        <Button
          icon="pi pi-save"
          onClick={() => {
            saveAs(
              new Blob(
                [
                  cyRef.current.png({
                    output: "blob",
                    bg: "#121212",
                    full: true,
                  }),
                ],
                {
                  type: "image/png",
                }
              ),
              `${board?.title || "ArkiveBoard"}.png`
            );
          }}
        />
      </div>

      <BoardContextMenu
        cm={cm}
        ehRef={ehRef}
        cyRef={cyRef}
        contextMenu={contextMenu}
        setDrawMode={setDrawMode}
      />
      {nodeUpdateDialog.show && (
        <NodeUpdateDialog
          nodeUpdateDialog={nodeUpdateDialog}
          setNodeUpdateDialog={setNodeUpdateDialog}
        />
      )}
      {edgeUpdateDialog.show && (
        <EdgeUpdateDialog
          edgeUpdateDialog={edgeUpdateDialog}
          setEdgeUpdateDialog={setEdgeUpdateDialog}
        />
      )}

      <CytoscapeComponent
        elements={elements}
        minZoom={0.1}
        maxZoom={5}
        zoom={1}
        className="Lato"
        wheelSensitivity={0.1}
        style={{ width: "100%", height: "100%" }}
        cy={(cy: any) => {
          if (!cyRef.current) {
            cyRef.current = cy;
          }
          if (!ehRef.current) {
            cy.center();
            ehRef.current = cyRef.current.edgehandles(edgehandlesSettings);
            grRef.current = cyRef.current.gridGuide({
              ...cytoscapeGridOptions,
              snapToGridDuringDrag: snap,
            });
          }
        }}
        stylesheet={cytoscapeStylesheet}
      />
    </div>
  );
}
