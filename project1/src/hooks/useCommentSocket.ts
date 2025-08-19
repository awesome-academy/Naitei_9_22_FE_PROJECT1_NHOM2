import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { Blog } from "@/types/Blog";
import type { Comment as BlogComment } from "@/types/Comment";

interface UseCommentSocketProps {
  selectedBlog: Blog;
  setLocalComments: React.Dispatch<React.SetStateAction<BlogComment[]>>;
  handleCommentSubmit: (data: { comment: string }) => Promise<any>;
}

export default function useCommentSocket({
  selectedBlog,
  setLocalComments,
  handleCommentSubmit,
}: UseCommentSocketProps) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";
    socketRef.current = io(socketUrl);
    const socket = socketRef.current;

    if (!selectedBlog?.id) return;
    socket.emit("joinRoom", selectedBlog.id);
    socket.on("getComment", (data) => {
      if (data?.roomId === selectedBlog.id) {
        setLocalComments((prev: BlogComment[]) => {
          const exists = prev.some(
            (c: BlogComment) => c.id === data.comment.id
          );
          if (exists) return prev;
          return [data.comment, ...prev];
        });
      }
    });
    return () => {
      socket.off("getComment");
      socket.disconnect();
    };
  }, [selectedBlog?.id, setLocalComments]);

  // Handler for submitting comment via socket
  const handleSubmitWithSocket = async (data: { comment: string }) => {
    const socket = socketRef.current;
    const result = await handleCommentSubmit(data);
    if (result?.success && result?.comment && socket) {
      socket.emit("sendComment", {
        roomId: selectedBlog.id,
        comment: result.comment,
      });
    }
  };

  return { handleSubmitWithSocket };
}
