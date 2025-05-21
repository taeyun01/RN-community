import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "@/types";
import axiosInstance from "./axios";

async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", body);

  return data;
}

// 포스트 목록 조회 (리턴값은 게시글들의 배열이므로 Post타입의 배열)
async function getPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);

  return data;
}

// 하나의 게시글 조회
async function getPost(id: number): Promise<Post> {
  const { data } = await axiosInstance.get(`/posts/${id}`);

  return data;
}

// 포스트 삭제
async function deletePost(id: number): Promise<number> {
  const { data } = await axiosInstance.delete(`/posts/${id}`);

  return data;
}

type RequestUpdatePost = {
  id: number;
  body: CreatePostDto;
};

// 포스트 수정 (반환 값은 Promise<number> 수정된 id만 반환됨)
async function updatePost({ id, body }: RequestUpdatePost): Promise<number> {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);

  return data;
}

async function createVote({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> {
  const { data } = await axiosInstance.post(
    `/posts/${postId}/vote/${voteOptionId}`
  );

  return data;
}

async function likePost(id: number): Promise<number> {
  const { data } = await axiosInstance.post(`/likes/${id}`);

  return data;
}

export {
  createPost,
  createVote,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
};
