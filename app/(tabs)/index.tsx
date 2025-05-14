import CustomButton from "@/components/CustomButton";
import FeedList from "@/components/FeedList";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

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
});
