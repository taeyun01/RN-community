import useGetInfinitePosts from "@/hooks/queries/useGetInfinitePosts";
import { useScrollToTop } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { FlatList } from "react-native";
import FeedItem from "./FeedItem";

function FeedList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useGetInfinitePosts();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const ref = useRef<FlatList | null>(null);
  useScrollToTop(ref);

  if (!data) return null;

  const posts = data?.pages.flat();

  const lastPost = posts?.[posts.length - 1];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch(); // 새로고침 시 데이터 다시 가져옴
    setIsRefreshing(false); // 새로고침 완료 후 상태 초기화
  };

  const handleEndReached = () => {
    // 다음 페이지가 있으면서 다음 페이지를 가져오는 중이 아닐 때만 다음 페이지를 가져옴
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // ScrollView대신 FlatList를 사용하는 이유는 화면에 보이는 부분만 렌더링 되서 최적화가 됨
  return (
    <FlatList
      ref={ref}
      data={posts}
      renderItem={({ item }) => <FeedItem post={item} lastPost={lastPost} />}
      keyExtractor={(item) => String(item.id)} // 고유 키 값 (리액트 map으로 컴포넌트 렌더링할 때 키 값 지정하는거라고 보면됨)
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5} // 끝까지 닿기전에 미리 다음 페이지를 가져옴
      refreshing={isRefreshing} // 새로고침 상태값
      onRefresh={handleRefresh} // 새로고침 시 데이터 다시 가져옴
      //   ListFooterComponent={() => (
      //     <View>
      //       {isFetchingNextPage ? (
      //         <ActivityIndicator size="large" color={colors.BLACK} />
      //       ) : null}
      //     </View>
      //   )}
    />
  );
}

export default FeedList;
