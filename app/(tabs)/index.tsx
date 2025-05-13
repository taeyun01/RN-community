import CustomButton from "@/components/CustomButton";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>홈 스크린</Text>
      <CustomButton
        label="홈 버튼"
        onPress={() => console.log("홈 버튼 클릭")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
