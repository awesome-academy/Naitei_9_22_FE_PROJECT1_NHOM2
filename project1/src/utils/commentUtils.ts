import type { Comment } from "@/types/Comment";
import type { User } from "@/types/User";

export type CommentWithUser = Comment & {
  userName?: string;
  userAvatar?: string;
  replies?: CommentWithUser[];
};

export const mapCommentsWithUsers = (
  comments: Comment[],
  users: User[]
): CommentWithUser[] => {
  // Create user lookup map for O(1) access
  const userMap: Record<number, User> = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });

  // Map comments with user info
  const commentsWithUsers: CommentWithUser[] = comments.map((comment) => ({
    ...comment,
    userName: userMap[comment.userId]?.fullName,
    userAvatar: userMap[comment.userId]?.image,
  }));

  return commentsWithUsers;
};

export const groupCommentsByParent = (
  comments: CommentWithUser[]
): CommentWithUser[] => {
  const parentComments: CommentWithUser[] = [];
  const commentMap = new Map<number, CommentWithUser>();

  // Create a map for quick lookup and initialize all comments with empty replies
  comments.forEach((comment) => {
    const commentWithReplies = { ...comment, replies: [] };
    const commentId = Number(comment.id); // Convert to number
    commentMap.set(commentId, commentWithReplies);
  });

  // Collect parent comments and attach replies
  comments.forEach((comment) => {
    const commentId = Number(comment.id); // Convert to number
    const commentWithReplies = commentMap.get(commentId)!;

    if (!comment.replyTo) {
      parentComments.push(commentWithReplies);
    } else {
      const parentId = Number(comment.replyTo); // Convert to number
      const parent = commentMap.get(parentId);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(commentWithReplies);
      }
    }
  });

  return parentComments;
};

export const countCommentsByBlog = (
  comments: Comment[]
): Record<number, number> => {
  const counts: Record<number, number> = {};

  comments.forEach((comment) => {
    const blogId = Number(comment.blogId); // Convert to number for consistency
    counts[blogId] = (counts[blogId] || 0) + 1;
  });

  return counts;
};

export const getTotalCommentsCount = (groups: CommentWithUser[]): number => {
  return groups.reduce((total, group) => {
    // Count parent comment + all its replies
    return total + 1 + (group.replies?.length || 0);
  }, 0);
};
