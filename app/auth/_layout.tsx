import { colors } from "@/constants";
import Foundation from "@expo/vector-icons/Foundation";
import { Link, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK, // 헤더 타이틀 색상
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "로그인",
          headerLeft: () => (
            // 안드로이드 에서는 홈 아이콘이랑 로그인 텍스트랑 딱 붙어있어서 오른쪽 패딩을 줘서 띄워줌
            <Link href="/" replace style={{ paddingRight: 12 }}>
              <Foundation name="home" size={28} color={colors.BLACK} />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
