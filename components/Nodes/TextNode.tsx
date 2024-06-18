import { cn } from "@/utils/common";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

export default function TextNode(props: Partial<NodeProps<string>>) {
  const { selected, id, data } = props;

  return (
    <div
      className={cn(
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]  rounded-md overflow-hidden w-[300px]",
        { "outline outline-black": selected }
      )}
    >
      <div className="w-full py-1 bg-teal-300 px-4">
        <span className="font-bold text-xs text-black">Send Message</span>
      </div>
      <div className="py-2 px-4">
        <span className={cn("text-black", { "text-gray-400": !data })}>
          {data || "Text Node"}
        </span>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
export function TextNodePlaceholder() {
  return (
    <div className=" rounded-md border overflow-hidden w-[300px] border-dashed border-gray-600">
      <div className="w-full py-1 px-4 bg-gray-300">
        <span className="font-bold text-xs text-black">Send Message</span>
      </div>
      <div className="py-2 px-4">
        <span className="text-gray-400">Text Node</span>
      </div>
    </div>
  );
}
