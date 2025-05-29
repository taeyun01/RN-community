const colors = {
  BLACK: "#000",
  WHITE: "#FFF",
  RED_100: "#FFDFDF",
  RED_500: "#FF5F5F",
  ORANGE_100: "#FFF7F1",
  ORANGE_200: "#FFDEC6",
  ORANGE_300: "#FFB884",
  ORANGE_600: "#FF6B57",
  GRAY_50: "#FCFCFC",
  GRAY_100: "#F6F6F6",
  GRAY_200: "#E2E8E0",
  GRAY_300: "#D1D5DB",
  GRAY_400: "#A1B5A8",
  GRAY_500: "#6B7280",
  GRAY_600: "#4B5563",
  GRAY_700: "#374151",
} as const;

const queryKeys = {
  AUTH: "auth",
  GET_ME: "getMe",
  POST: "post",
  GET_POSTS: "getPosts",
  GET_POST: "getPost",
  GET_LIKED_POSTS: "getLikedPosts",
  GET_MY_POSTS: "getMyPosts",
  GET_USER_PROFILE: "getUserProfile",
  AVATAR: "avatar",
} as const;

export { colors, queryKeys };
