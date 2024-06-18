import { Node } from "reactflow";

type GeneralNodeProps = Omit<Node, "data" | "id" | "type">;

type TextNode = {
  type: "textNode";
  data: string;
};

// Having this node type just for example to showcase different node type use-case
type VideoNode = {
  type: "videoNode";
  data: Array<number>;
};

// For adding proper typescript
export type ChatBotNode = (TextNode | VideoNode) & GeneralNodeProps;
