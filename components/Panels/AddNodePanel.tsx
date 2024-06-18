import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";

import DraggableWrapper from "../DraggableWrapper";
import { TextNodePlaceholder } from "../Nodes/TextNode";

const DRAG_OVERLAY_MAP = {
  "text-node-draggable": <TextNodePlaceholder />,
};

const MessageNodeBtn = () => {
  return (
    <div className="text-blue-600 border bg-white border-blue-600 py-3 rounded-md w-52 flex flex-col items-center justify-center gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
        />
      </svg>
      <span>Message</span>
    </div>
  );
};

export default function AddNodePanel() {
  const [overlayId, setOverlayId] = useState<string>();

  useDndMonitor({
    onDragStart: ({ active: { id } }) => {
      setOverlayId(id.toString());
    },

    onDragEnd: () => {
      setOverlayId(undefined);
    },
  });

  return (
    <div className="py-4 px-6">
      <DraggableWrapper id="text-node-draggable">
        <MessageNodeBtn />
      </DraggableWrapper>
      <DragOverlay dropAnimation={{ duration: 0 }}>
        {overlayId && (
          <div className="opacity-60">
            {DRAG_OVERLAY_MAP[overlayId as keyof typeof DRAG_OVERLAY_MAP]}
          </div>
        )}
      </DragOverlay>
    </div>
  );
}
