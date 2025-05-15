import { createPost } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    // 포스트 생성 성공 시 메인 페이지로 이동
    onSuccess: () => {
      router.replace("/");
    },
  });
}

export default useCreatePost;
