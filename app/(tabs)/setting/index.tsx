import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function SettingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable>
        <Text>설정 스크린</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
