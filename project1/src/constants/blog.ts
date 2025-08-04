// UI Constants
export const MOBILE_BREAKPOINT = 600;
export const ITEMS_PER_PAGE = 3;
export const MAX_PAGINATION_RANGE = 4;

// Image Constants
export const DEFAULT_AVATAR = "/dataset/default-avatar.png";
export const UNAVAILABLE_IMAGE = "/dataset/unavailable.jpg";

// Animation Constants
export const TRANSITION_DURATION = 300;

// Text Constants
export const MESSAGES = {
  LOADING: "Đang tải...",
  LOADING_COMMENTS: "Đang tải bình luận…",
  NO_DATA: "Không tìm thấy dữ liệu",
  ERROR_FETCH: "Có lỗi xảy ra khi tải dữ liệu",
  COMMENTS_COUNT: "bình luận",
  BACK_BUTTON: "Quay lại",
  REPLY_BUTTON: "Trả lời",
  SUBMIT_BUTTON: "Gửi",
  CLEAR_FILTER: "Hủy",
} as const;

// Form placeholders
export const FORM_PLACEHOLDERS = {
  NAME: "Họ và tên",
  EMAIL: "Email",
  PHONE: "Phone",
  COMMENT: "Bình luận",
} as const;

// Subject constants for Unavailable component
export const SUBJECTS = {
  POSTS: "bài viết",
  COMMENTS: "bình luận",
  CATEGORIES: "danh mục",
  TAGS: "thẻ",
  USERS: "người dùng",
  PRODUCTS: "sản phẩm",
} as const;
