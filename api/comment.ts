import { CreateCommentDto } from "@/types";
import axiosInstance from "./axios";

// 댓글 생성
async function createComment(body: CreateCommentDto) {
  const { data } = await axiosInstance.post("/comments", body);

  return data;
}

// 댓글 삭제
async function deleteComment(id: number) {
  const { data } = await axiosInstance.delete(`/comments/${id}`);

  return data;
}

//* 댓글 조회는 따로 API가 필요없고 게시글 조회 시 댓글 데이터도 함께 받아옴

export { createComment, deleteComment };
