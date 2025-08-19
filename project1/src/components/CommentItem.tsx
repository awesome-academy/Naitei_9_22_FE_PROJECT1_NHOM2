import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DEFAULT_AVATAR, MESSAGES } from "@/constants/blog";
import type { CommentWithUser } from "@/utils/commentUtils";
import type { User } from "@/types/User";
import { Trash2 } from "lucide-react";

interface CommentItemProps {
  data: CommentWithUser;
  isReply?: boolean;
  onReply?: (commentId: number) => void;
  onDelete?: (commentId: number) => void;
  currentUser?: User | null;
}

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const { data, isReply = false, onReply, onDelete, currentUser } = props;
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  const isOwner = currentUser && String(data.userId) === String(currentUser.id);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleDelete = () => setShowConfirm(true);
  const handleConfirmDelete = () => {
    onDelete?.(data.id);
    setShowConfirm(false);
  };
  const handleCancelDelete = () => setShowConfirm(false);
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
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button variant="link" size="sm" onClick={() => onReply?.(data.id)}>
            {MESSAGES.REPLY_BUTTON}
          </Button>
          {isOwner && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        title="Xác nhận xóa bình luận"
        message="Bạn có chắc muốn xóa bình luận này?"
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {/* render replies recursively */}
      {data.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          data={reply}
          isReply
          onReply={onReply}
          onDelete={onDelete}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default CommentItem;
