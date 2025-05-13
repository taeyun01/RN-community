import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>홈 스크린</Text>
      <CustomButton label="홈 버튼" onPress={() => router.push("/auth")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
