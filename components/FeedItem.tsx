import ImagePreviewList from "@/components/ImagePreviewList";
import Profile from "@/components/Profile";
import Separator from "@/components/Separator";
import Vote from "@/components/Vote";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useDeletePost from "@/hooks/queries/useDeletePost";
import useLikePost from "@/hooks/queries/useLikePost";
import { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface FeedItemProps {
  post: Post;
  lastPost?: Post;
  isDetail?: boolean;
}

function FeedItem({ post, lastPost, isDetail = false }: FeedItemProps) {
  const { auth } = useAuth();
  const likeUsers = post.likes?.map((like) => Number(like.userId)); // 좋아요 누른 사람들의 아이디 배열
  const isLiked = likeUsers?.includes(Number(auth?.id)); // 내 아이디가 포함되어 있다면 좋아요 상태값
  const { showActionSheetWithOptions } = useActionSheet();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: likePost } = useLikePost();

  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    // cancelButtonIndex, destructiveButtonIndex 0과 2대신 매개변수로 넣어주면 스타일도 변함
    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        // console.log("selectedIndex: ", selectedIndex); // 선택된 인덱스 번호
        switch (selectedIndex) {
          case destructiveButtonIndex: // 삭제
            deletePost(post.id, {
              onSuccess: () =>
                isDetail && router.canGoBack()
                  ? router.back()
                  : router.replace("/"), // 상세페이지에서 삭제 버튼 누르면 뒤로가기.
            });
            break;
          case 1: // 수정
            router.push(`/post/update/${post.id}`);
            break;
          case cancelButtonIndex: // 취소
            // console.log("취소");
            break;
          default:
            break;
        }
      }
    );
  };

  const handlePressFeed = () => {
    // 피드 아이템이 상세페이지에서 보이는 상태인지 아닌지 확인 (보이는 상태가 아니면 )
    if (!isDetail) {
      router.push(`/post/${post.id}`);
    }
  };

  const handlePressLike = () => {
    // 로그인 상태가 아니면 로그인 페이지로 이동
    if (!auth.id) {
      return router.push("/auth");
    }

    // 상세페이지가 아니면 상세페이지로 이동
    if (!isDetail) {
      return router.push(`/post/${post.id}`);
    }

    likePost(post.id);
  };

  const ContainerComponent = isDetail ? View : Pressable;

  return (
    <ContainerComponent style={styles.container} onPress={handlePressFeed}>
      <View style={styles.contentContainer}>
        <Profile
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          onPress={() => router.push(`/profile/${post.author.id}`)}
          option={
            auth.id === post.author.id && (
              <Ionicons
                name="ellipsis-vertical"
                size={22}
                color={colors.BLACK}
                style={{ marginLeft: "auto" }}
                onPress={handlePressOption}
              />
            )
          }
        />
        <Text style={styles.title}>{post.title}</Text>
        {/* numberOfLines={3} 3줄까지 처리 그 이상은 ... 처리 */}
        <Text numberOfLines={3} style={styles.description}>
          {post.description}
        </Text>
        <ImagePreviewList imageUris={post.imageUris} />
        {/* 상세 페이지가 아니면서 투표가 있는 경우 */}
        {!isDetail && post.hasVote && (
          <View style={styles.voteContainer}>
            <View style={styles.voteTextContainer}>
              <MaterialCommunityIcons
                name="vote"
                size={24}
                color={colors.ORANGE_600}
              />
              <Text style={styles.voteText}>투표</Text>
            </View>
            <Text style={styles.voteCountText}>
              {post.voteCount}명 참여중...
            </Text>
          </View>
        )}
        {/* 상세 페이지에서 투표가 있는 경우 */}
        {isDetail && post.hasVote && (
          <Vote
            postId={post.id}
            postVotes={post.votes ?? []}
            voteCount={post.voteCount}
          />
        )}
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu} onPress={handlePressLike}>
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes?.length || "좋아요"}
          </Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={handlePressFeed}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount || "댓글"}</Text>
        </Pressable>
        <Pressable style={styles.menu} onPress={handlePressFeed}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
      {/* 마지막 게시글은 구분선 빼기 */}
      {post.id !== lastPost?.id && <Separator />}
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: "600",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: colors.BLACK,
    marginBottom: 14,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopColor: colors.GRAY_300,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    width: "33%",
    gap: 4,
  },
  menuText: {
    fontSize: 14,
    color: colors.GRAY_700,
  },
  activeMenuText: {
    fontWeight: "500",
    color: colors.ORANGE_600,
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    gap: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.ORANGE_600,
    backgroundColor: colors.ORANGE_100,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  voteTextContainer: {
    gap: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  voteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.ORANGE_600,
  },
  voteCountText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.BLACK,
  },
});

export default FeedItem;
