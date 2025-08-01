import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DEFAULT_AVATAR, MESSAGES } from "@/constants/blog";
import type { CommentWithUser } from "@/utils/commentUtils";

interface CommentItemProps {
  data: CommentWithUser;
  isReply?: boolean;
  onReply?: (commentId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
  data,
  isReply = false,
  onReply,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={`flex flex-col gap-4 ${isReply ? "pl-16" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        {/* avatar + content */}
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 flex-shrink-0">
            <AvatarImage
              src={data.userAvatar || DEFAULT_AVATAR}
              alt={data.userName || "avatar"}
            />
            <AvatarFallback>{getInitials(data.userName || "?")}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1 max-w-[500px]">
            <h5 className="text-sm font-semibold">{data.userName}</h5>
            <p className="text-sm text-gray-500">{data.content}</p>
            <p className="text-xs text-gray-400">{data.date}</p>
          </div>
        </div>

        <Button variant="link" size="sm" onClick={() => onReply?.(data.id)}>
          {MESSAGES.REPLY_BUTTON}
        </Button>
      </div>

      {/* render replies recursively */}
      {data.replies?.map((reply) => (
        <CommentItem key={reply.id} data={reply} isReply onReply={onReply} />
      ))}
    </div>
  );
};

export default CommentItem;
