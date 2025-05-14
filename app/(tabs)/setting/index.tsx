import AuthRoute from "@/components/AuthRoute";
import CustomButton from "@/components/CustomButton";
import useAuth from "@/hooks/queries/useAuth";
import { SafeAreaView, StyleSheet } from "react-native";

export default function SettingScreen() {
  const { logout } = useAuth();

  return (
    <AuthRoute>
      <SafeAreaView style={styles.container}>
        <CustomButton label="로그아웃" onPress={logout} />
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {},
});
