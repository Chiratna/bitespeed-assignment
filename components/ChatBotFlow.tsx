import React from "react";
import "reactflow/dist/style.css";
import ReactFlow, { MarkerType } from "reactflow";
import { ReactFlowStore, useReactFlowStore } from "@/zustand/store";
import { useShallow } from "zustand/react/shallow";
import { nodeTypes } from "@/utils/nodeUtils";
import { useDroppable } from "@dnd-kit/core";

/**
 * Selector function to pick specific state and actions from the ReactFlowStore.
 *
 * @param {ReactFlowStore} store - The Zustand store for React Flow.
 * @returns {Object} - An object containing nodes, edges, and actions for manipulating them.
 */
const selector = (store: ReactFlowStore) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onConnect: store.onConnect,
  onNodesDelete: store.onNodesDelete,
});

/**
 * ChatBotFlow component to render and manage the React Flow diagram for a chatbot.
 *
 * @returns {JSX.Element} - The rendered React Flow component wrapped in a droppable area.
 */
export default function ChatBotFlow() {
  const { edges, nodes, onNodesChange, onConnect, onNodesDelete } =
    useReactFlowStore(useShallow(selector));

  // Setting up a droppable area using the useDroppable hook
  const { setNodeRef } = useDroppable({
    id: "chatbot-droppable-area",
  });

  return (
    <div ref={setNodeRef} className="flex-1 bg-white ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        defaultEdgeOptions={{
          markerEnd: {
            type: MarkerType.Arrow,
            width: 30,
            height: 30,
          },
        }}
      />
    </div>
  );
}
