import { colors } from "@/constants";
import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  variant?: "filled" | "outlined" | "standard";
  error?: string;
  rightChild?: ReactNode;
}

const InputField = (
  {
    label,
    variant = "filled",
    error = "",
    rightChild = null,
    ...props
  }: InputFieldProps,
  ref?: ForwardedRef<TextInput>
) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.container,
          styles[variant],
          Boolean(error) && styles.inputError,
          props.multiline && styles.multiline, // 멀티라인 인풋일 경우 스타일 조정
        ]}
      >
        <TextInput
          ref={ref}
          style={[styles.input, styles[`${variant}Text`]]}
          {...props}
          placeholderTextColor={colors.GRAY_400}
          // ⬇️ 모든 인풋에 적용됨
          autoCapitalize="none" // 첫 글자가 대문자로 나오는데 이걸 없애줌
          spellCheck={false} // 맞춤법 검사 없애줌 (키보드 위에 뜨는 부분)
          autoCorrect={false} // 자동 수정 없애줌 (키보드 위에 뜨는 부분)
        />
        {rightChild}
      </View>

      {Boolean(error) && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: colors.GRAY_700,
    marginBottom: 5,
  },
  filled: {
    backgroundColor: colors.GRAY_100,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
  },
  standard: {
    borderWidth: 1,
    borderColor: colors.GRAY_200,
  },
  standardText: {
    color: colors.BLACK,
  },
  outlinedText: {
    color: colors.ORANGE_600,
    fontWeight: "bold",
  },
  filledText: {
    color: colors.BLACK,
  },
  input: {
    fontSize: 16,
    padding: 0,
    flex: 1,
  },
  error: {
    fontSize: 12,
    marginTop: 5,
    color: colors.RED_500,
  },
  inputError: {
    backgroundColor: colors.RED_100,
  },
  multiline: {
    alignItems: "flex-start",
    paddingVertical: 10,
    height: 200,
  },
});

export default forwardRef(InputField);
