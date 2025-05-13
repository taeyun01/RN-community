import CustomButton from "@/components/CustomButton";
import FeedItem from "@/components/FeedItem";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  // 임시 데이터
  const post = {
    id: 1,
    userId: 1,
    title: "테스트 제목 입니다.",
    description:
      "테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 테스트 내용 아무거나 넣기 ",
    createdAt: "2025-05-13",
    author: {
      id: 1,
      nickname: "짱구",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
    },
    imageUris: [],
    likes: [],
    hasVote: false,
    voteCount: 0,
    commentCount: 0,
    viewCount: 0,
    votes: [],
    comments: [],
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton label="로그인 버튼" onPress={() => router.push("/auth")} />
      <FeedItem post={post} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
