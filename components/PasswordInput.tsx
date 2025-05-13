import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import InputField from "./InputField";

interface PasswordInputProps {
  submitBehavior?: TextInputProps["submitBehavior"];
}

function PasswordInput({ submitBehavior = "submit" }: PasswordInputProps) {
  const { control, setFocus } = useFormContext();

  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (!data) return "비밀번호를 입력해주세요.";
          if (data.length < 8) return "비밀번호는 8자 이상이어야 합니다.";
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          textContentType="oneTimeCode" // Automatic Strong Password.. 경고창 제거
          secureTextEntry // 보안 문자 표시
          value={value}
          onChangeText={onChange}
          error={error?.message}
          onSubmitEditing={() => setFocus("passwordConts,m")}
        />
      )}
    />
  );
}

export default PasswordInput;
