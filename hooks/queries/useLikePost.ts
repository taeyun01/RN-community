import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onSuccess: (postId) => {
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      // 게시글 상세 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
    },
  });
}

export default useLikePost;
