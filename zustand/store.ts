import { ChatBotNode } from "@/types/node.types";
import { nanoid } from "nanoid";
import {
  applyNodeChanges,
  Edge,
  Node,
  OnNodesChange,
  OnConnect,
  addEdge,
  OnNodesDelete,
  getConnectedEdges,
  getIncomers,
  getOutgoers,
} from "reactflow";
import { create } from "zustand";

export type ReactFlowStore = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  addNode: (node: ChatBotNode) => void;
  onConnect: OnConnect;
  updateNode: <T>(id: string, data: Partial<Node<T>>) => void;
  onNodesDelete: OnNodesDelete;
};

export const useReactFlowStore = create<ReactFlowStore>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  /**
   * Handler for node deletion.
   * When nodes are deleted, it updates the state by recalculating the edges.
   *
   * @param {Array} deleted - List of nodes that have been deleted.
   */
  onNodesDelete(deleted) {
    set({
      edges: deleted.reduce((acc, node) => {
        // Get incomers: nodes that have edges pointing to the deleted node
        const incomers = getIncomers(node, get().nodes, get().edges);
        // Get outgoers: nodes that the deleted node has edges pointing to
        const outgoers = getOutgoers(node, get().nodes, get().edges);
        // Get edges connected to the deleted node
        const connectedEdges = getConnectedEdges([node], get().edges);

        // Filter out the edges connected to the deleted node from the current edges
        const remainingEdges = acc.filter(
          (edge) => !connectedEdges.includes(edge)
        );

        // Create new edges between incomers and outgoers
        const createdEdges = incomers.flatMap(({ id: source }) =>
          outgoers.map(({ id: target }) => ({
            id: `${source}->${target}`, // Unique id for the new edge
            source, // Source node id
            target, // Target node id
          }))
        );

        // Return the updated edges list including remaining and newly created edges
        return [...remainingEdges, ...createdEdges];
      }, get().edges),
    });
  },

  // Gets called when two nodes are connected, manually setting the id with source node id
  //  and target node id so that it helps while deleting a middle node
  onConnect: (connection) => {
    set({
      edges: addEdge(
        { ...connection, id: `${connection.source} - ${connection.target}` },
        get().edges
      ),
    });
  },

  addNode(data) {
    const id = nanoid(6);
    const node = { ...data, id };
    set({ nodes: [node, ...get().nodes] });
  },

  updateNode(id, data) {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, ...data } : node
      ),
    });
  },
}));
