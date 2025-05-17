import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import Separator from "@/components/Separator";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import { Fragment, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const { mutate: createComment } = useCreateComment();
  const [content, setContent] = useState("");
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  if (isPending || isError) {
    return null;
  }

  // 답글 남기기 버튼을 눌렀을 때 그 댓글의 id를 받아서 답글 텍스트와 함께 답글 id를 보냄
  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    setContent(""); // 댓글을 입력하다가 답글로 변경 했을때 내용 초기화
    inputRef.current?.focus();
  };

  // 답글 남기기 취소 버튼
  const handleCancelReply = () => {
    setParentCommentId(null);
    Keyboard.dismiss(); // 키보드 닫기
    setContent("");
  };

  // 댓글 등록
  const handleSubmitComment = () => {
    const commentData = {
      postId: Number(id),
      content: content,
    };

    // 등록시 답글을 선택한 경우는 parentCommentId도 함께 보내줌
    if (parentCommentId) {
      createComment({ ...commentData, parentCommentId });
      setContent("");
      handleCancelReply(); // 키보드도 닫고 답글 아이디도 초기화
      return;
    }

    createComment(commentData);
    setContent("");
    // 댓글 등록 후 0.5초 후 스크롤 맨 아래로 이동
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 200);
  };

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView
            ref={scrollViewRef}
            style={{ marginBottom: 75 }}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <Separator />
            <FeedItem post={post} isDetail lastPost={post} />
            <Separator />
            <Text style={styles.commentCount}>댓글 {post.commentCount}개</Text>

            {post.comments?.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  comment={comment}
                  parentCommentId={parentCommentId}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                />
                {comment.replies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    isReply
                    parentCommentId={parentCommentId}
                    onReply={() => handleReply(reply.id)}
                  />
                ))}
              </Fragment>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              value={content}
              onChangeText={(text) => setContent(text)}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment} // 엔터키를 눌러도 댓글 등록
              placeholder={
                parentCommentId ? "답글 남기는 중..." : "댓글을 남겨보세요."
              }
              rightChild={
                <Pressable
                  disabled={!content}
                  style={[
                    styles.inputButtonContainer,
                    !content && { opacity: 0.5 },
                  ]}
                  onPress={handleSubmitComment} // 등록 버튼 누르면 댓글 등록
                >
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  awareScrollViewContainer: {
    flex: 1,
    backgroundColor: colors.GRAY_200,
  },
  scrollViewContainer: {
    backgroundColor: colors.GRAY_200,
  },
  commentCount: {
    backgroundColor: colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
  commentInputContainer: {
    width: "100%",
    borderTopColor: colors.GRAY_200,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.WHITE,
    padding: 16,
    bottom: 0,
    position: "absolute",
  },
  inputButtonContainer: {
    backgroundColor: colors.ORANGE_600,
    padding: 8,
    borderRadius: 5,
  },
  inputButtonText: {
    color: colors.WHITE,
    fontWeight: "bold",
  },
});
