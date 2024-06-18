import { useDraggable } from "@dnd-kit/core";
import React, { ReactNode } from "react";
import { CSS } from "@dnd-kit/utilities";

/**
 * DraggableWrapper component that provides drag-and-drop functionality
 * to its children using the @dnd-kit/core library.
 *
 * @param {string} props.id - Unique identifier for the draggable item
 * @param {ReactNode} props.children - Elements to be wrapped and made draggable
 *
 * @returns {JSX.Element} - A div wrapping the children with drag-and-drop functionality
 */
export default function DraggableWrapper({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  // Transform style to apply the drag transformation using CSS utilities
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  // If the item is being dragged, directly return the children without any wrapper
  if (isDragging) return children;

  // Render the children wrapped in a div with drag-and-drop handlers and styles
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
