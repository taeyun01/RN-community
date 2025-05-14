import AuthRoute from "@/components/AuthRoute";
import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/queries/useAuth";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function SettingScreen() {
  const { logout, auth } = useAuth();

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <Text>{auth.nickname}님 안녕하세요</Text>
        <CustomButton label="로그아웃" onPress={logout} />
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
