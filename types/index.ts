interface User {
  id: number;
  nickname: string;
  imageUri?: string;
}

interface Profile extends User {
  email: string;
  introduce?: string;
  hatId: string;
  handId: string;
  skinId: string;
  topId: string;
  faceId: string;
  bottomId: string;
  background: string;
}

interface ImageUri {
  id?: number;
  uri: string;
}
interface VoteOption {
  id?: number;
  displayPriority: number;
  content: string;
}

interface CreatePostDto {
  title: string;
  description: string;
  imageUris: ImageUri[];
  voteTitle?: string; // 투표 제목
  voteOptions?: VoteOption[]; // 투표 옵션
}

interface CreateCommentDto {
  content: string;
  postId: number;
  parentCommentId?: number;
}

interface CreateVoteDto {
  postId: number;
  voteOptionId: number;
}

type PostVoteOption = VoteOption & { userVotes: { userId: number }[] };

interface PostVote {
  id: number;
  title: string;
  options: PostVoteOption[];
}
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  isDeleted: boolean;
}

interface PostComment extends Comment {
  replies: Comment[];
}

interface Post {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
  author: User;
  imageUris: ImageUri[];
  likes: { userId: number }[];
  hasVote: boolean;
  voteCount: number;
  commentCount: number;
  viewCount: number;
  votes?: PostVote[];
  comments?: PostComment[];
}

export type {
  Comment,
  CreateCommentDto,
  CreatePostDto,
  CreateVoteDto,
  ImageUri,
  Post,
  PostVote,
  PostVoteOption,
  Profile,
  VoteOption,
};
