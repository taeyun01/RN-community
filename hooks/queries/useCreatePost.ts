import { createPost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    // 포스트 생성 성공 시 메인 페이지로 이동
    onSuccess: () => {
      router.replace("/");
      // 포스트 목록 조회 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useCreatePost;
