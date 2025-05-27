import { colors } from "@/constants";
import React from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  size?: "medium" | "large";
  variant?: "filled" | "standard" | "outlined";
  rounded?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CustomButton = ({
  label,
  size = "large",
  variant = "filled",
  rounded = true,
  disabled = false,
  style = null,
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
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Text
        style={[
          styles[`${variant}Text`],
          disabled && styles.disabledText,
          variant === "standard" && disabled && styles.disabledStandard,
        ]}
      >
        {label}
      </Text>
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
  medium: {
    height: 38,
    alignSelf: "center", // 버튼을 가로 중앙 정렬
    paddingHorizontal: 12,
  },
  filled: {
    backgroundColor: colors.ORANGE_600,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: colors.GRAY_300,
  },
  disabledText: {
    color: colors.GRAY_500,
    backgroundColor: colors.GRAY_300,
  },
  standard: {},
  outlined: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  disabledStandard: {
    color: colors.GRAY_500,
    backgroundColor: colors.WHITE,
  },
  standardText: {
    color: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: "bold",
  },
  filledText: {
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: "bold",
  },
  outlinedText: {
    color: colors.ORANGE_600,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CustomButton;
