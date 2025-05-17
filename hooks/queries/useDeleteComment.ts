import { deleteComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { useMutation } from "@tanstack/react-query";

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    // 댓글 삭제 성공 시 게시글 조회 쿼리 무효화
    //* 게시글 id를 이용해 댓글 삭제 성공할 시 게시글 상태를 업데이트해야 삭제한 댓글이 보임
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });
    },
  });
}

export default useDeleteComment;
