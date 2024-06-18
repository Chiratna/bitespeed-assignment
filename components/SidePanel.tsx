import { useCallback, useState } from "react";

import { Node, OnSelectionChangeFunc, useOnSelectionChange } from "reactflow";
import EditNodePanel from "./Panels/EditNodePanel";
import AddNodePanel from "./Panels/AddNodePanel";

export default function SidePanel() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onChange: OnSelectionChangeFunc = useCallback(({ nodes }) => {
    if (nodes.length === 0) setSelectedNode(null);
    else {
      setSelectedNode(nodes[0]);
    }
  }, []);

  useOnSelectionChange({
    onChange,
  });

  return (
    <div className="w-[30vw] h-[calc(100vh-64px)] bg-white shadow-md border-l">
      {selectedNode === null && <AddNodePanel />}
      {selectedNode && <EditNodePanel selectedNode={selectedNode} />}
    </div>
  );
}
