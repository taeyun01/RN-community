import Profile from "@/components/Profile";
import Separator from "@/components/Separator";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { Post } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface FeedItemProps {
  post: Post;
  lastPost: Post;
}

function FeedItem({ post, lastPost }: FeedItemProps) {
  const { auth } = useAuth();
  const likeUsers = post.likes?.map((like) => Number(like.userId)); // 좋아요 누른 사람들의 아이디 배열
  const isLiked = likeUsers?.includes(Number(auth?.id)); // 내 아이디가 포함되어 있다면 좋아요 상태값
  const { showActionSheetWithOptions } = useActionSheet();

  const handlePressOption = () => {
    const options = ["삭제", "수정", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    // cancelButtonIndex, destructiveButtonIndex 0과 2대신 매개변수로 넣어주면 스타일도 변함
    showActionSheetWithOptions(
      { options, cancelButtonIndex, destructiveButtonIndex },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex: // 삭제
            console.log("삭제");
            break;
          case 1: // 수정
            console.log("수정");
            break;
          case cancelButtonIndex: // 취소
            console.log("취소");
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Profile
          nickname={post.author.nickname}
          createdAt={post.createdAt}
          onPress={() => {}}
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
      </View>
      <View style={styles.menuContainer}>
        <Pressable style={styles.menu}>
          <Octicons
            name={isLiked ? "heart-fill" : "heart"}
            size={16}
            color={isLiked ? colors.ORANGE_600 : colors.BLACK}
          />
          <Text style={isLiked ? styles.activeMenuText : styles.menuText}>
            {post.likes?.length || "좋아요"}
          </Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={16}
            color={colors.BLACK}
          />
          <Text style={styles.menuText}>{post.commentCount || "댓글"}</Text>
        </Pressable>
        <Pressable style={styles.menu}>
          <Ionicons name="eye-outline" size={16} color={colors.BLACK} />
          <Text style={styles.menuText}>{post.viewCount}</Text>
        </Pressable>
      </View>
      {/* 마지막 게시글은 구분선 빼기 */}
      {post.id !== lastPost.id && <Separator />}
    </View>
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
});

export default FeedItem;
