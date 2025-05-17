import AuthRoute from "@/components/AuthRoute";
import CommentItem from "@/components/CommentItem";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import Separator from "@/components/Separator";
import { colors } from "@/constants";
import useCreateComment from "@/hooks/queries/useCreateComment";
import useGetPost from "@/hooks/queries/useGetPost";
import { useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const { mutate: createComment } = useCreateComment();
  const [content, setContent] = useState("");
  const scrollViewRef = useRef<ScrollView | null>(null);

  if (isPending || isError) {
    return null;
  }

  const handleSubmitComment = () => {
    const commentData = {
      postId: Number(id),
      content: content,
    };
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
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              value={content}
              onChangeText={(text) => setContent(text)}
              returnKeyType="send"
              onSubmitEditing={handleSubmitComment} // 엔터키를 눌러도 댓글 등록
              placeholder="댓글을 남겨보세요."
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
