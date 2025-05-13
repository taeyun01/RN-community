import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

function PasswordInput() {
  const { control } = useFormContext();

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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry // 보안 문자 표시
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default PasswordInput;
