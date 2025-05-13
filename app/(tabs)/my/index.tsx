import { router, useFocusEffect } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function MyScreen() {
  const user = false;

  // 화면이 포커스 됐을 때 실행됨
  useFocusEffect(() => {
    if (!user) {
      return router.replace("/auth");
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Pressable>
        <Text>내정보 스크린</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
