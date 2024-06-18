import { ReactFlowStore, useReactFlowStore } from "@/zustand/store";
import React, { ChangeEvent } from "react";
import { Node } from "reactflow";
import { useShallow } from "zustand/react/shallow";

const selector = (store: ReactFlowStore) => ({
  onAddNode: store.addNode,
  nodes: store.nodes,
  updateNode: store.updateNode,
});

export default function EditNodePanel({
  selectedNode,
}: {
  selectedNode: Node;
}) {
  const { updateNode } = useReactFlowStore(useShallow(selector));

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    updateNode(selectedNode.id, { data: value });
  };

  const handleBack = () => {
    updateNode(selectedNode.id, { selected: false });
  };
  return (
    <div>
      <div className="py-4 border-b mb-3 flex w-full items-center px-6">
        <button onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <span className="text-black text-center mx-auto">Message</span>
      </div>

      <div className="w-full flex flex-col px-6 py-6 border-b">
        <span className="text-gray-400 mb-3 ml-2">Text</span>
        <textarea
          rows={2}
          placeholder="Enter text"
          key={selectedNode.id}
          onChange={handleChange}
          defaultValue={selectedNode.data}
          className="border rounded-md w-[80%] p-6 text-black outline-black"
        />
      </div>
    </div>
  );
}
