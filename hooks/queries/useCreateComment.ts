import { createComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
    // 댓글 생성 성공 시 게시글 조회 쿼리 무효화
    //* 게시글 id를 이용해 댓글 등록 성공할 시 게시글 상태를 업데이트해야 등록한 댓글이 보임
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
    },
  });
}

export default useCreateComment;
