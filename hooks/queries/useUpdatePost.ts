import { updatePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

function useUpdatePost() {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (postId) => {
      // 게시글 아이디를 기준으로 조회한 게시글 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
      // 수정이 완료되면 메인화면의 게시글 리스트로 갱신
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useUpdatePost;
