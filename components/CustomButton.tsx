import { colors } from "@/constants";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
  rounded?: boolean;
}

const CustomButton = ({
  label,
  size = "large",
  variant = "filled",
  rounded = true,
  ...props // PressableProps 타입의 모든 속성을 받을 수 있음
}: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed, // 버튼 눌렀을 때 효과
        rounded && styles.rounded,
      ]}
      {...props}
    >
      <Text style={[styles[variant]]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  rounded: {
    borderRadius: 8,
  },
  large: {
    width: "100%",
    height: 44,
  },
  medium: {},
  filled: {
    backgroundColor: colors.ORANGE_600,
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.8,
  },
});

export default CustomButton;
