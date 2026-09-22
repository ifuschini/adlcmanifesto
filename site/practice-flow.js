import React from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client?deps=react@18.3.1";
import { ReactFlow, Handle, MarkerType, Position } from "https://esm.sh/@xyflow/react@12.8.5?bundle&deps=react@18.3.1,react-dom@18.3.1";

const h = React.createElement;
const translations = {
  en: {
    nodes: ["Requirements Quality Gate", "Implement", "Review", "Test", "Deploy", "Operate", "Improve"],
    checks: { 0: "Human approval", 2: "Expert review", 4: "Release approval", 5: "Human oversight" },
    delivery: "Delivery", learning: "Learning and revalidation",
    return: "The next increment returns to the requirements gate.",
    orchestrate: "Orchestrate", layer: "Across every stage: agents, skills, policies, permissions, and evidence.",
    legend: "Human checkpoints require trained reviewers with authority to intervene.",
  },
  it: {
    nodes: ["Quality Gate dei requisiti", "Implementare", "Revisionare", "Testare", "Rilasciare", "Operare", "Migliorare"],
    checks: { 0: "Approvazione umana", 2: "Revisione esperta", 4: "Autorizzazione release", 5: "Supervisione umana" },
    delivery: "Delivery", learning: "Apprendimento e rivalidazione",
    return: "Il prossimo incremento torna al quality gate dei requisiti.",
    orchestrate: "Orchestrare", layer: "In ogni fase: agent, skill, policy, permessi ed evidenze.",
    legend: "I checkpoint umani richiedono reviewer formati con autorità di intervento.",
  },
  es: {
    nodes: ["Quality Gate de requisitos", "Implementar", "Revisar", "Probar", "Desplegar", "Operar", "Mejorar"],
    checks: { 0: "Aprobación humana", 2: "Revisión experta", 4: "Autorización de release", 5: "Supervisión humana" },
    delivery: "Entrega", learning: "Aprendizaje y revalidación",
    return: "El siguiente incremento vuelve al quality gate de requisitos.",
    orchestrate: "Orquestar", layer: "En cada etapa: agentes, skills, políticas, permisos y evidencias.",
    legend: "Los checkpoints humanos requieren revisores formados con autoridad para intervenir.",
  },
  fr: {
    nodes: ["Quality Gate des exigences", "Implémenter", "Revoir", "Tester", "Déployer", "Exploiter", "Améliorer"],
    checks: { 0: "Approbation humaine", 2: "Revue experte", 4: "Autorisation de release", 5: "Supervision humaine" },
    delivery: "Delivery", learning: "Apprentissage et revalidation",
    return: "Le prochain incrément revient au quality gate des exigences.",
    orchestrate: "Orchestrer", layer: "À chaque étape : agents, skills, politiques, permissions et preuves.",
    legend: "Les checkpoints humains exigent des reviewers formés et habilités à intervenir.",
  },
};

function StageNode({ data }) {
  return h(React.Fragment, null,
    ...Object.entries(Position).flatMap(([key, position]) => [
      h(Handle, { key: key + "-s", id: position + "-s", type: "source", position }),
      h(Handle, { key: key + "-t", id: position + "-t", type: "target", position }),
    ]),
    h("a", { href: "#step-" + data.index, className: "delivery-node nodrag" + (data.index === 6 ? " learning-node" : "") },
      h("span", { className: "delivery-node-number" }, String(data.index).padStart(2, "0")),
      h("strong", null, data.title),
      data.check ? h("span", { className: "delivery-checkpoint" },
        h("span", { "aria-hidden": true }, "✓ "), data.check)
        : h("span", { className: "delivery-node-caption" }, data.caption),
    ),
  );
}

const nodeTypes = { stage: StageNode };
const desktopPositions = [
  { x: 30, y: 24 }, { x: 265, y: 24 }, { x: 500, y: 24 }, { x: 735, y: 24 },
  { x: 735, y: 240 }, { x: 500, y: 240 }, { x: 265, y: 240 },
];

function diagramData(labels, vertical, width) {
  const nodeWidth = vertical ? Math.min(360, Math.max(190, width - 70)) : 190;
  const nodes = labels.nodes.map((title, index) => ({
    id: String(index), type: "stage", position: vertical ? { x: 48, y: 16 + index * 150 } : desktopPositions[index],
    data: { title, index, check: labels.checks[index], caption: index === 6 ? labels.learning : labels.delivery },
    style: { width: nodeWidth, height: 118 },
    draggable: false, selectable: false, focusable: false,
  }));
  const connections = [[0, 1, "right", "left"], [1, 2, "right", "left"], [2, 3, "right", "left"],
    [3, 4, "bottom", "top"], [4, 5, "left", "right"], [5, 6, "left", "right"], [6, 0, "left", "bottom"]];
  const edges = connections.map(([from, to, source, target]) => {
    const learning = from >= 5;
    if (vertical) { source = from === 6 ? "left" : "bottom"; target = from === 6 ? "left" : "top"; }
    const color = learning ? "#28705d" : "#1859a9";
    return { id: from + "-" + to, source: String(from), target: String(to),
      sourceHandle: source + "-s", targetHandle: target + "-t", type: "smoothstep",
      style: { stroke: color, strokeWidth: 2, ...(learning ? { strokeDasharray: "6 4" } : {}) },
      pathOptions: { borderRadius: 10, offset: from === 6 ? 30 : 18 },
      markerEnd: { type: MarkerType.ArrowClosed, color }, selectable: false, focusable: false,
    };
  });
  return { nodes, edges };
}

function FlowDiagram({ labels, width }) {
  const vertical = width < 940;
  const { nodes, edges } = diagramData(labels, vertical, width);
  return h(React.Fragment, null,
    h("div", { className: "delivery-legend" },
      h("span", { className: "delivery-key" }, labels.delivery),
      h("span", { className: "learning-key" }, labels.learning)),
    h("div", { className: "delivery-canvas", style: { height: vertical ? 1060 : 400 } },
      h(ReactFlow, { key: String(vertical) + "-" + Math.round(width), nodes, edges, nodeTypes,
        fitView: true, fitViewOptions: { padding: 0.02 }, minZoom: 0.5, maxZoom: 1,
        panOnDrag: false, panOnScroll: false, zoomOnScroll: false, zoomOnPinch: false,
        zoomOnDoubleClick: false, nodesDraggable: false, nodesConnectable: false,
        elementsSelectable: false, preventScrolling: false, proOptions: { hideAttribution: true },
      })),
    h("p", { className: "delivery-return" }, labels.return),
    h("a", { href: "#step-7", className: "orchestration-band" },
      h("strong", null, labels.orchestrate), h("span", null, labels.layer)),
    h("p", { className: "delivery-human-legend" }, labels.legend),
  );
}

document.querySelectorAll(".practice-flow").forEach(container => {
  const labels = translations[document.documentElement.lang] || translations.en;
  const root = createRoot(container);
  let previousWidth = 0;
  const observer = new ResizeObserver(([entry]) => {
    const width = Math.round(entry.contentRect.width);
    if (width > 0 && width !== previousWidth) {
      previousWidth = width;
      root.render(h(FlowDiagram, { labels, width }));
    }
  });
  observer.observe(container);
});
