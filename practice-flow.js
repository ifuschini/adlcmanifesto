import React from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client?deps=react@18.3.1";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  MarkerType,
  Position
} from "https://esm.sh/@xyflow/react@12.8.5?bundle&deps=react@18.3.1,react-dom@18.3.1";

const labelsByLang = {
  en: {
    step: "Step",
    nodes: [
      "Requirements Gate",
      "Implement",
      "Review",
      "Test",
      "Deploy",
      "Operate",
      "Improve",
      "Orchestrate"
    ]
  },
  es: {
    step: "Step",
    nodes: [
      "Quality Gate",
      "Implement",
      "Review",
      "Test",
      "Deploy",
      "Operate",
      "Improve",
      "Orchestrate"
    ]
  },
  fr: {
    step: "Step",
    nodes: [
      "Quality Gate",
      "Implement",
      "Review",
      "Test",
      "Deploy",
      "Operate",
      "Improve",
      "Orchestrate"
    ]
  },
  it: {
    step: "Step",
    nodes: [
      "Quality Gate",
      "Implement",
      "Review",
      "Test",
      "Deploy",
      "Operate",
      "Improve",
      "Orchestrate"
    ]
  }
};

const positions = [
  { x: 330, y: 42 },
  { x: 56, y: 128 },
  { x: 56, y: 272 },
  { x: 368, y: 470 },
  { x: 580, y: 272 },
  { x: 580, y: 128 },
  { x: 112, y: 500 },
  { x: 262, y: 250 }
];

const nodeMeta = [
  { source: Position.Left, target: Position.Bottom },
  { source: Position.Bottom, target: Position.Right },
  { source: Position.Right, target: Position.Top },
  { source: Position.Right, target: Position.Top },
  { source: Position.Top, target: Position.Left },
  { source: Position.Left, target: Position.Bottom },
  { source: Position.Top, target: Position.Right },
  { source: Position.Bottom, target: Position.Top }
];

const nodeStyle = {
  border: "none",
  background: "transparent",
  boxShadow: "none",
  padding: 0,
  width: 172
};

const layerNodeStyle = {
  ...nodeStyle,
  width: 210
};

const humanInLoopSteps = new Set([0, 2, 4, 5]);

function buildHumanBadge() {
  return React.createElement(
    "span",
    {
      className: "loop-human-badge",
      title: "Human in the loop",
      "aria-label": "Human in the loop"
    },
    React.createElement("span", {
      className: "loop-human-icon",
      "aria-hidden": "true"
    })
  );
}

function buildLabel(stepLabel, step, label, isLayer = false) {
  return React.createElement(
    "div",
    { className: `loop-node-card${isLayer ? " loop-node-layer" : ""}` },
    React.createElement(
      "div",
      { className: "loop-node-topline" },
      React.createElement("span", null, `${stepLabel} ${step}`),
      humanInLoopSteps.has(step) ? buildHumanBadge() : null
    ),
    React.createElement("strong", null, label),
    isLayer
      ? React.createElement(
          "small",
          { className: "loop-layer-note" },
          "Cross-cutting coordination layer"
        )
      : null
  );
}

function buildNodes(lang) {
  const labels = labelsByLang[lang] || labelsByLang.en;

  return labels.nodes.map((label, index) => ({
    id: String(index),
    position: positions[index],
    data: {
      label: buildLabel(labels.step, index, label, index === 7),
      targetId: `step-${index}`
    },
    sourcePosition: nodeMeta[index].source,
    targetPosition: nodeMeta[index].target,
    draggable: false,
    selectable: false,
    style: index === 7 ? layerNodeStyle : nodeStyle
  }));
}

function buildEdges() {
  const base = {
    type: "smoothstep",
    animated: true,
    selectable: false,
    style: {
      stroke: "#d46a3f",
      strokeWidth: 2.2
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#d46a3f"
    }
  };

  const layerEdge = {
    type: "smoothstep",
    animated: true,
    selectable: false,
    style: {
      stroke: "rgba(212, 106, 63, 0.72)",
      strokeWidth: 1.9,
      strokeDasharray: "6 6"
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "rgba(212, 106, 63, 0.72)"
    }
  };

  return [
    { id: "e0-1", source: "0", target: "1", pathOptions: { offset: 22, borderRadius: 42 }, ...base },
    { id: "e1-2", source: "1", target: "2", pathOptions: { offset: 20, borderRadius: 32 }, ...base },
    { id: "e2-3", source: "2", target: "3", pathOptions: { offset: 30, borderRadius: 38 }, ...base },
    { id: "e3-4", source: "3", target: "4", pathOptions: { offset: 28, borderRadius: 36 }, ...base },
    { id: "e4-5", source: "4", target: "5", pathOptions: { offset: 20, borderRadius: 32 }, ...base },
    { id: "e5-0", source: "5", target: "0", pathOptions: { offset: 24, borderRadius: 42 }, ...base },
    { id: "e5-6", source: "5", target: "6", pathOptions: { offset: 42, borderRadius: 48 }, ...base },
    { id: "e6-3", source: "6", target: "3", pathOptions: { offset: 30, borderRadius: 42 }, ...base },
    { id: "e7-0", source: "7", target: "0", pathOptions: { offset: 20, borderRadius: 22 }, ...layerEdge },
    { id: "e7-1", source: "7", target: "1", pathOptions: { offset: 34, borderRadius: 28 }, ...layerEdge },
    { id: "e7-2", source: "7", target: "2", pathOptions: { offset: 22, borderRadius: 26 }, ...layerEdge },
    { id: "e7-4", source: "7", target: "4", pathOptions: { offset: 22, borderRadius: 26 }, ...layerEdge },
    { id: "e7-5", source: "7", target: "5", pathOptions: { offset: 34, borderRadius: 28 }, ...layerEdge },
    { id: "e7-6", source: "7", target: "6", pathOptions: { offset: 24, borderRadius: 28 }, ...layerEdge }
  ];
}

function scrollToStage(node) {
  const targetId = node?.data?.targetId;
  if (!targetId) {
    return;
  }

  const element = document.getElementById(targetId);
  if (!element) {
    return;
  }

  history.replaceState(null, "", `#${targetId}`);
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function FlowDiagram({ lang }) {
  return React.createElement(
    ReactFlowProvider,
    null,
    React.createElement(
      ReactFlow,
      {
        nodes: buildNodes(lang),
        edges: buildEdges(),
        fitView: true,
        fitViewOptions: { padding: 0.06 },
        panOnDrag: false,
        zoomOnScroll: false,
        zoomOnPinch: false,
        zoomOnDoubleClick: false,
        nodesDraggable: false,
        nodesConnectable: false,
        elementsSelectable: false,
        preventScrolling: false,
        onNodeClick: (_event, node) => scrollToStage(node),
        proOptions: { hideAttribution: true }
      },
      React.createElement(Background, {
        color: "rgba(31, 26, 23, 0.08)",
        gap: 22,
        size: 1
      })
    )
  );
}

document.querySelectorAll(".practice-flow").forEach((container) => {
  const lang = document.documentElement.lang || "en";
  const root = createRoot(container);
  root.render(React.createElement(FlowDiagram, { lang }));
});
