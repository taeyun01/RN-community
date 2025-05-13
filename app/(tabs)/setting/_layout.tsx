import { colors } from "@/constants";
import { Stack } from "expo-router";
import React from "react";

export default function SettingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "설정",
          headerShown: false, // 헤더 유무
        }}
      />
    </Stack>
  );
}
