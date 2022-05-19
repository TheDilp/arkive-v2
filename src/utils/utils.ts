import { NodeModel } from "@minoru/react-dnd-treeview";
import { saveAs } from "file-saver";
import { toast, ToastOptions } from "react-toastify";
import { CytoscapeNodeProps } from "../custom-types";
const defaultToastConfig: ToastOptions = {
  autoClose: 1250,
  theme: "dark",
};

export const toastSuccess = (message: string) =>
  toast.success(message, defaultToastConfig);
export const toastError = (message: string) =>
  toast.error(message, defaultToastConfig);
export const toastWarn = (message: string) =>
  toast.warn(message, defaultToastConfig);
// Filter autocomplete for categories
export const searchCategory = (
  event: any,
  categories: string[],
  setFilteredCategories: (categories: string[]) => void
) => {
  setTimeout(() => {
    let _filteredCategories;
    if (!event.query.trim().length) {
      _filteredCategories = [...categories];
    } else {
      _filteredCategories = categories.filter((category) => {
        return category.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }

    setFilteredCategories(_filteredCategories);
  }, 250);
};
// Get depth of node in tree in editor view
export const getDepth = (
  tree: NodeModel[],
  id: number | string,
  depth = 0
): number => {
  const target: NodeModel | undefined = tree.find((node) => node.id === id);

  if (target) {
    return getDepth(tree, target.parent, depth + 1);
  }

  return depth;
};

// Regex for email and password
export const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

export const passwordRegex =
  /"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/g;

export const uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

// Template Tree Utils
export const defaultTemplate = {
  title: "New Template",
  icon: "mdi:file",
  categories: [],
  folder: false,
  content: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        attrs: {
          style: "",
          nodeIndent: null,
          nodeLineHeight: null,
          nodeTextAlignment: null,
        },
        content: [
          {
            text: "Customize your new template!",
            type: "text",
          },
        ],
      },
    ],
  },
};

// Board Utils
export const boardNodeShapes = [
  {
    label: "Rectangle",
    value: "rectangle",
  },
  {
    label: "Ellipse",
    value: "ellipse",
  },
  {
    label: "Triangle",
    value: "triangle",
  },
  {
    label: "Barrel",
    value: "barrel",
  },
  {
    label: "Rhomboid",
    value: "rhomboid",
  },

  {
    label: "Diamond",
    value: "diamond",
  },
  {
    label: "Pentagon",
    value: "pentagon",
  },
  {
    label: "Hexagon",
    value: "hexagon",
  },
  {
    label: "Heptagon",
    value: "heptagon",
  },
  {
    label: "Octagon",
    value: "octagon",
  },
  {
    label: "Star",
    value: "star",
  },
  {
    label: "Cut Rectangle",
    value: "cut-rectangle",
  },
  {
    label: "Round Triangle",
    value: "round-triangle",
  },
  {
    label: "Round Rectangle",
    value: "round-rectangle",
  },
  {
    label: "Bottom Round Rectangle",
    value: "bottom-round-rectangle",
  },

  {
    label: "Round Diamond",
    value: "round-diamond",
  },
  {
    label: "Round Pentagon",
    value: "round-pentagon",
  },
  {
    label: "Round Hexagon",
    value: "round-hexagon",
  },
  {
    label: "Round Heptagon",
    value: "round-heptagon",
  },
  {
    label: "Round Octagon",
    value: "round-octagon",
  },
  {
    label: "Round Diamond",
    value: "round-diamond",
  },
];
export const boardEdgeCurveStyles = [
  {
    label: "Straight",
    value: "straight",
  },
  {
    label: "Bezier",
    value: "unbundled-bezier",
  },
  {
    label: "Taxi",
    value: "taxi",
  },
];
export const boardEdgeLineStyles = [
  {
    label: "Solid",
    value: "solid",
  },
  {
    label: "Dashed",
    value: "dashed",
  },
  {
    label: "Dotted",
    value: "dotted",
  },
];

export const boardEdgeTaxiDirections = [
  {
    label: "Auto",
    value: "auto",
  },
  {
    label: "Vertical",
    value: "vertical",
  },
  {
    label: "Horizontal",
    value: "horizontal",
  },
  {
    label: "Upward",
    value: "upward",
  },
  {
    label: "Downward",
    value: "downward",
  },
  {
    label: "Leftward",
    value: "leftward",
  },
  {
    label: "Rightward",
    value: "rightward",
  },
];
export const edgeTargetArrowShapes = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Triangle",
    value: "triangle",
  },
  {
    label: "Triangle-tee",
    value: "triangle-tee",
  },
  {
    label: "Triangle-cross",
    value: "triangle-cross",
  },
  {
    label: "Triangle-backcurve",
    value: "triangle-backcurve",
  },
  {
    label: "Circle-triangle",
    value: "circle-triangle",
  },
  {
    label: "Vee",
    value: "vee",
  },
  {
    label: "Tee",
    value: "tee",
  },
  {
    label: "Circle",
    value: "circle",
  },
  {
    label: "Diamond",
    value: "diamond",
  },
  {
    label: "Chevron",
    value: "chevron",
  },
];
export const boardNodeFontSizes = [
  10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
  48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84,
  86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118,
  120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148,
  150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178,
  180, 182, 184, 186, 188, 190, 192, 194, 196, 198, 200,
];
export const edgehandlesSettings = {
  canConnect: function (sourceNode: any, targetNode: any) {
    return (
      !sourceNode.outgoers().includes(targetNode) &&
      !sourceNode.same(targetNode)
    );
    // whether an edge can be created between source and target
    // e.g. disallow loops
  },
  edgeParams: function (sourceNode: any, targetNode: any) {
    // for edges between the specified source and target
    // return element object to be passed to cy.add() for edge
    return {
      class: "eh-ghost-edge",
      data: {
        source: sourceNode.id(),
        target: targetNode.id(),
        curveStyle: "straight",
        lineStyle: "solid",
        lineColor: "#1e1e1e",
      },
    };
  },
  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
  snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
  noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
  disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
};
export const boardLayouts = [
  "Preset",
  "Grid",
  "Breadthfirst",
  "Circle",
  "Concentric",
  "Random",
];
export const presetLayoutSettings = {
  name: "preset",
  fit: false,
  positions: function (node: any) {
    let { x, y } = node.data();
    return { x, y };
  },
};
export const breadthFirstLayoutSettings = {
  name: "breadthfirst",
  directed: true,
  padding: 10,
  fit: false,
};
export const concentricLayoutSettings = {
  name: "concentric",
  fit: false,
  concentric: function (node: any) {
    return node.degree();
  },
  levelWidth: function (nodes: any) {
    return 2;
  },
};
export const circleLayoutSettings = {
  name: "circle",
  fit: false,
};
export const randomLayoutSettings = {
  name: "random",
  fit: false,
};
export const textHAlignOptions = [
  {
    label: "Left",
    value: "left",
  },
  {
    label: "Center",
    value: "center",
  },
  {
    label: "Right",
    value: "right",
  },
];
export const textVAlignOptions = [
  {
    label: "Top",
    value: "top",
  },
  {
    label: "Center",
    value: "center",
  },
  {
    label: "Bottom",
    value: "bottom",
  },
];
export function changeLayout(layout: string, cyRef: any) {
  if (layout === "Preset") {
    // Enable movement only when in the default positions set by the user
    cyRef.current.autoungrabify(false);
    cyRef.current.layout(presetLayoutSettings).run();
  } else {
    // Disable movement when using layouts so the default positions don't get messed up
    cyRef.current.autoungrabify(true);
    if (layout === "Grid") {
      cyRef.current.layout({ name: "grid" }).run();
    } else if (layout === "Breadthfirst") {
      cyRef.current.layout(breadthFirstLayoutSettings).run();
    } else if (layout === "Concentric") {
      cyRef.current.layout(concentricLayoutSettings).run();
    } else if (layout === "Circle") {
      cyRef.current.layout(circleLayoutSettings).run();
    } else if (layout === "Random") {
      cyRef.current.layout(randomLayoutSettings).run();
    }
  }
}
export function initialLayout(layout: string, cy: any) {
  if (layout === "Preset") {
    // Enable movement only when in the default positions set by the user
    cy.autoungrabify(false);
    cy.layout(presetLayoutSettings).run();
  } else {
    // Disable movement when using layouts so the default positions don't get messed up
    cy.autoungrabify(true);
    if (layout === "Grid") {
      cy.layout({ name: "grid" }).run();
    } else if (layout === "Breadthfirst") {
      cy.layout(breadthFirstLayoutSettings).run();
    } else if (layout === "Concentric") {
      cy.layout(concentricLayoutSettings).run();
    } else if (layout === "Circle") {
      cy.layout(circleLayoutSettings).run();
    } else if (layout === "Random") {
      cy.layout(randomLayoutSettings).run();
    }
  }
}
export const cytoscapeGridOptions = {
  // On/Off Modules
  /* From the following four snap options, at most one should be true at a given time */
  snapToGridOnRelease: false, // Snap to grid on release
  snapToAlignmentLocationOnRelease: false, // Snap to alignment location on release
  snapToAlignmentLocationDuringDrag: false, // Snap to alignment location during drag
  distributionGuidelines: false, // Distribution guidelines
  geometricGuideline: false, // Geometric guidelines
  initPosAlignment: false, // Guideline to initial mouse position
  centerToEdgeAlignment: false, // Center to edge alignment
  resize: false, // Adjust node sizes to cell sizes
  parentPadding: false, // Adjust parent sizes to cell sizes by padding
  drawGrid: false, // Draw grid background

  // General
  gridSpacing: 50, // Distance between the lines of the grid.
  snapToGridCenter: true, // Snaps nodes to center of gridlines. When false, snaps to gridlines themselves. Note that either snapToGridOnRelease or snapToGridDuringDrag must be true.

  // Draw Grid
  zoomDash: true, // Determines whether the size of the dashes should change when the drawing is zoomed in and out if grid is drawn.
  panGrid: true, // Determines whether the grid should move then the user moves the graph if grid is drawn.
  gridStackOrder: -1, // Namely z-index
  gridColor: "#fff", // Color of grid lines
  lineWidth: 1.0, // Width of grid lines

  // Guidelines
  guidelinesStackOrder: 4, // z-index of guidelines
  guidelinesTolerance: 2.0, // Tolerance distance for rendered positions of nodes' interaction.
  guidelinesStyle: {
    // Set ctx properties of line. Properties are here:
    strokeStyle: "#fff", // color of geometric guidelines
    geometricGuidelineRange: 400, // range of geometric guidelines
    range: 100, // max range of distribution guidelines
    minDistRange: 10, // min range for distribution guidelines
    distGuidelineOffset: 10, // shift amount of distribution guidelines
    horizontalDistColor: "#ff0000", // color of horizontal distribution alignment
    verticalDistColor: "#00ff00", // color of vertical distribution alignment
    initPosAlignmentColor: "#0000ff", // color of alignment to initial mouse location
    lineDash: [0, 0], // line style of geometric guidelines
    horizontalDistLine: [0, 0], // line style of horizontal distribution guidelines
    verticalDistLine: [0, 0], // line style of vertical distribution guidelines
    initPosAlignmentLine: [0, 0], // line style of alignment to initial mouse position
  },

  // Parent Padding
  parentSpacing: -1, // -1 to set paddings of parents to gridSpacing
};
// export const cytoscapeCompoundDnDOptions = {
//   grabbedNode: (node: any) => true, // filter function to specify which nodes are valid to grab and drop into other nodes
//   dropTarget: (dropTarget: any, grabbedNode: any) => true, // filter function to specify which parent nodes are valid drop targets
//   dropSibling: (dropSibling: any, grabbedNode: any) => true, // filter function to specify which orphan nodes are valid drop siblings
//   newParentNode: (grabbedNode: any, dropSibling: any) => ({}), // specifies element json for parent nodes added by dropping an orphan node on another orphan (a drop sibling). You can chose to return the dropSibling in which case it becomes the parent node and will be preserved after all its children are removed.
//   boundingBoxOptions: {
//     // same as https://js.cytoscape.org/#eles.boundingBox, used when calculating if one node is dragged over another
//     includeOverlays: false,
//     includeLabels: true,
//   },
//   overThreshold: 50, // make dragging over a drop target easier by expanding the hit area by this amount on all sides
//   outThreshold: 50, // make dragging out of a drop target a bit harder by expanding the hit area by this amount on all sides
// };
export const cytoscapeStylesheet = [
  {
    selector: "node[classes]",
    style: {
      shape: "data(type)",
      width: "data(width)",
      height: "data(height)",
      "font-size": "data(fontSize)",
      "font-family": "Lato",
      label: "data(label)",
      color: "white",
      "text-outline-color": "black",
      "text-outline-width": "2px",
      "background-image": "data(backgroundImage)",
      "background-fit": "cover",
      "background-clip": "node",
      "background-color": "data(backgroundColor)",
      "background-opacity": "data(backgroundOpacity)",
      "text-halign": "data(textHAlign)",
      "text-valign": "data(textVAlign)",
      "text-wrap": "wrap",
      "text-max-width": "data(width)",
      "z-index": "data(zIndex)",
      "z-index-compare": "data(zIndexCompare)",
    },
  },
  {
    selector: "node[class = '.eh-presumptive-target']",
    style: {
      shape: "rectangle",
      width: "50rem",
      height: "50rem",
      "font-size": "20rem",
      label: "TARGET",
      color: "white",
      "text-outline-color": "black",
      "text-outline-width": "2px",
      "overlay-color": "lightblue",
      "overlay-opacity": "0",
    },
  },
  {
    selector: ".eh-ghost-node",
    style: {
      shape: "square",
      width: "50",
      height: "50",
      "font-size": "16",
      label: "New Edge",
      color: "red",
      "text-outline-color": "black",
      "text-outline-width": "2px",
      "text-halign": "center",
      "text-valign": "top",
      opacity: 0,
    },
  },
  // Edges in general
  {
    selector: "edge[classes]",
    style: {
      label: "data(label)",
      color: "white",
      "text-outline-color": "black",
      "text-outline-width": "2px",
      "target-arrow-shape": "data(targetArrowShape)",
      "arrow-scale": 2,
      "target-arrow-color": "data(lineColor)",
      "line-color": "data(lineColor)",
      "line-style": "data(lineStyle)",
      "line-dash-pattern": [5, 10],
      "taxi-turn": "data(taxiTurn)",
      "taxi-direction": "data(taxiDirection)",
      "curve-style": "data(curveStyle)",
      "text-rotation": "autorotate",
      "control-point-distances": "data(controlPointDistances)",
      "control-point-weights": "data(controlPointWeights)",
      "z-index": "data(zIndex)",
      "z-index-compare": "manual",
    },
  },
  {
    selector: ".eh-ghost-edge",
    style: {
      "target-arrow-shape": "triangle-backcurve",
      "target-arrow-color": "cyan",
      "line-color": "cyan",
      "line-style": "solid",
      "line-dash-pattern": [5, 10],
      "curve-style": "straight",
      "taxi-turn": "100",
      "taxi-direction": "auto",
      label: "",
      "control-point-distances": "10",
      "control-point-weights": "0.5",
    },
  },
  {
    selector: ".eh-preview",
    style: {
      "target-arrow-shape": "triangle-backcurve",
      "target-arrow-color": "cyan",
      "line-color": "cyan",
      "line-style": "solid",
      "line-dash-pattern": [5, 10],
      "curve-style": "straight",
      "taxi-turn": "100",
      "taxi-direction": "auto",
      label: "",
      "control-point-distances": "10",
      "control-point-weights": "0.5",
    },
  },

  // Classes for highlighting
  {
    selector: ":selected",
    style: {
      "border-width": 4,
      "border-color": "green",
      "line-color": "green",
      "target-arrow-color": "green",
    },
  },

  {
    selector: ".incomingEdgeHighlight",
    style: {
      "target-arrow-shape": "triangle-backcurve",
      "target-arrow-color": "blue",
      "line-color": "blue",
      "line-style": "dotted",
      "line-dash-pattern": [5, 10],
      "curve-style": "straight",
    },
  },
  {
    selector: ".incomingNodeHighlight",
    style: {
      "border-width": 4,
      "border-color": "blue",
      padding: "15px",
    },
  },
  {
    selector: ".outgoingEdgeHighlight",
    style: {
      "target-arrow-shape": "triangle-backcurve",
      "target-arrow-color": "cyan",
      "line-color": "cyan",
      "line-style": "solid",
      "line-dash-pattern": [5, 10],
      "curve-style": "straight",
    },
  },
  {
    selector: ".outgoingNodeHighlight",
    style: {
      "border-width": 4,
      "border-color": "cyan",
    },
  },
  {
    selector: ".selectedHighlight",
    style: {
      "background-image-opacity": 0,
      "background-color": "yellow",
    },
  },
];

export interface Bucket {
  id: string;
  name: string;
  owner: string;
  created_at: string;
  updated_at: string;
  public: boolean;
}
