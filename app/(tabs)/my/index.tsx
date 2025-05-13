import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function MyScreen() {
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
