import AuthRoute from "@/components/AuthRoute";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function MyScreen() {
  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <Pressable>
          <Text>내정보 스크린</Text>
        </Pressable>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
