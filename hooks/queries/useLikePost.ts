import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });

      // 내 유저 정보 가져오기
      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);
      const userId = Number(user?.id); // 내 아이디 추출
      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST,
        postId,
      ]);
      // console.log("previousPost", previousPost); // 이전 게시글 정보 (likes: [{userId: 1}] -> 라이크 안에 유저id가 배열로 있는데, 내 아이디가 있다면 빼주고 없다면 더해서 캐시를 업데이트 시켜야함)
      const newPost = { ...previousPost };

      // 좋아요를 눌렀는지 확인. 즉, likes에 내 아이디가 있는지 확인. 없다면 -1
      const likedIndex =
        previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;

      // likedIndex >= 0
      //   ? newPost.likes?.splice(likedIndex, 1)
      //   : newPost.likes?.push({ userId });

      // 좋아요를 눌렀다면 좋아요 취소, 안눌렀다면 좋아요 추가
      if (likedIndex >= 0) {
        newPost.likes?.splice(likedIndex, 1);
      } else {
        newPost.likes?.push({ userId });
      }

      // 캐시 업데이트 (새로운 상태 업데이트)
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, postId],
        newPost
      );
      return { previousPost, newPost };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, context?.previousPost?.id],
        context?.previousPost
      );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, variables],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useLikePost;
