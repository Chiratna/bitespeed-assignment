import { ReactFlowStore, useReactFlowStore } from "@/zustand/store";
import React from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

const selector = (store: ReactFlowStore) => ({
  nodes: store.nodes,
  edges: store.edges,
});

export default function AppBar() {
  const { edges, nodes } = useReactFlowStore(useShallow(selector));

  const handleSave = () => {
    console.log({ edges });

    if (nodes.length > 1 && edges.length !== nodes.length - 1) {
      toast.error("Cannot save flow", {
        position: "top-center",
        className: "w-fit",
      });
    } else {
      toast.success("Flow Saved", {
        position: "top-center",
        className: "w-fit",
      });
    }
  };

  return (
    <div className=" bg-gray-300 w-full h-16 flex justify-end items-center px-6">
      <button
        onClick={handleSave}
        disabled={nodes.length === 0}
        className="bg-white text-sm disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-400 text-black  border-2 border-blue-500 rounded-md py-2 px-6"
      >
        Save Changes
      </button>
    </div>
  );
}
