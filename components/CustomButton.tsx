import { colors } from "@/constants";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled";
}

const CustomButton = ({
  label,
  size = "large",
  variant = "filled",
  ...props // PressableProps 타입의 모든 속성을 받을 수 있음
}: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        styles[size],
        styles[variant],
        pressed && styles.pressed, // 버튼 눌렀을 때 효과
      ]}
      {...props}
    >
      <Text style={[styles[variant]]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
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
