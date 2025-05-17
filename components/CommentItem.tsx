import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useDeleteComment from "@/hooks/queries/useDeleteComment";
import { Comment } from "@/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import InputField from "./InputField";
import Profile from "./Profile";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
}

function CommentItem({ comment, isReply = false }: CommentItemProps) {
  const { auth } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const { mutate: deleteComment } = useDeleteComment();

  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deleteComment(comment.id);
            break;
          case cancelButtonIndex:
            break;
          default:
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* 답글인 경우 화살표 표시(대댓글인 경우) */}
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={"black"}
          />
        )}
        <Profile
          // comment에는 isDeleted라는 값이 있음 (삭제됐는지 안됐는지에 대한 값)
          imageUri={comment.isDeleted ? "" : comment.user.imageUri} // 삭제됐으면 이미지 없음
          nickname={comment.isDeleted ? "(삭제)" : comment.user.nickname} // 삭제됐으면 닉네임 대신 (삭제) 표시
          createdAt={comment.createdAt}
          onPress={() => {}}
          option={
            // 옵션은 내 댓글이면서 삭제되지 않은 경우에만 표시
            auth.id === comment.user.id &&
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color="black"
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      {/* 삭제된 댓글인 경우 삭제된 댓글입니다. 표시 */}
      <InputField
        editable={false} // 수정 불가능하게 설정
        value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content} // 삭제된 댓글이면 삭제된 댓글입니다. 표시
        variant="standard"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default CommentItem;
