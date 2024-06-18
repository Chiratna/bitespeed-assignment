import Image from "next/image";
import { Inter } from "next/font/google";
import ChatBotFlow from "@/components/ChatBotFlow";
import SidePanel from "@/components/SidePanel";

import { ReactFlowStore, useReactFlowStore } from "@/zustand/store";
import { useShallow } from "zustand/react/shallow";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import AppBar from "@/components/Appbar";
import { Toaster } from "sonner";
import { useId } from "react";

const inter = Inter({ subsets: ["latin"] });

/**
 * Selector function to pick the addNode action from the ReactFlowStore.
 *
 * @param {ReactFlowStore} store - The Zustand store for React Flow.
 * @returns {Object} - An object containing the addNode action.
 */
const selector = (store: ReactFlowStore) => ({
  onAddNode: store.addNode,
});

export default function Home() {
  const { onAddNode } = useReactFlowStore(useShallow(selector));
  const id = useId();

  /**
   * Handler function for the drag end event. It adds a new node to the flow
   * at the position where the drag ended.
   *
   * @param {DragEndEvent} event - The drag end event from the DndContext.
   */
  function handleDragEnd(event: DragEndEvent) {
    if (event.over)
      onAddNode({
        position: {
          x: event.over.rect.width - Math.abs(event.delta.x),
          y: Math.abs(event.delta.y),
        },
        type: "textNode",
        data: "text",
      });
  }
  return (
    <main
      className={`flex flex-col min-h-screen w-screen bg-white ${inter.className}`}
    >
      <AppBar />
      <DndContext id={id} autoScroll={false} onDragEnd={handleDragEnd}>
        <div className="flex w-screen flex-1">
          <ChatBotFlow />
          <SidePanel />
        </div>
      </DndContext>
      <Toaster richColors />
    </main>
  );
}
