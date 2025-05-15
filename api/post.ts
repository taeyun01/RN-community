import { CreatePostDto, Post } from "@/types";
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

export { createPost, getPosts };
