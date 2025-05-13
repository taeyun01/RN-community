import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

function EmailInput() {
  const { control } = useFormContext();

  return (
    <Controller
      name="email"
      control={control}
      rules={{
        // 이메일 폼에 입력한 값이 파라미터로 전달됨
        validate: (data: string) => {
          if (!data) return "이메일을 입력해주세요.";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data))
            return "이메일 형식이 올바르지 않습니다.";
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default EmailInput;
