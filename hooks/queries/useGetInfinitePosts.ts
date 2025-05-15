import { getPosts } from "@/api/post";
import { queryKeys } from "@/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetInfinitePosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1, // 초기 페이지
    // 마지막 페이지와 가져온 모든 페이지가 담김
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 마지막 게시글
      const lastPost = lastPage[lastPage.length - 1];
      // 마지막 게시글이 있으면 다음 페이지 번호를 반환
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}

export default useGetInfinitePosts;
