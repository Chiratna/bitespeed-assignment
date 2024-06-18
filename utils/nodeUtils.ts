import TextNode from "@/components/Nodes/TextNode";
import { ChatBotNode } from "@/types/node.types";
import { ComponentType } from "react";
import { NodeProps, NodeTypes } from "reactflow";

export const nodeTypes: Record<
  ChatBotNode["type"],
  ComponentType<NodeProps>
> = {
  textNode: TextNode,
  videoNode: TextNode, // Can be any other node, using Text Node for dummy purpose
};
