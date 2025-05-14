import CustomButton from "@/components/CustomButton";
import FeedList from "@/components/FeedList";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { auth } = useAuth();
  const { id: user } = auth;

  return (
    <SafeAreaView style={styles.container}>
      {!user && (
        <CustomButton
          label="로그인 / 회원가입 하러가기"
          onPress={() => router.push("/auth")}
          rounded={false}
        />
      )}
      {user && (
        <Pressable
          onPress={() => router.push("/post/write")}
          style={styles.writeButton}
        >
          <Ionicons name="pencil" size={32} color={colors.WHITE} />
        </Pressable>
      )}
      <FeedList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    backgroundColor: colors.ORANGE_600,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  headerText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  writeButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: colors.ORANGE_600,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2, // 안드로이드는 그림자 속성이 적용되지 않아 elevation속성으로 처리
    zIndex: 10,
  },
});
