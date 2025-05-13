import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

function EmailInput() {
  const { control, setFocus } = useFormContext();

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
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          autoFocus
          ref={ref}
          label="이메일"
          placeholder="이메일을 입력해주세요."
          inputMode="email" // 키보드 판이 이메일 입력하기 좋게 바뀜
          returnKeyType="next" // 키보드 리턴키(엔터키)를 next으로 바꿈
          submitBehavior="submit" // 엔터키를 눌러도 키보드가 내려가지 않음
          onSubmitEditing={() => setFocus("password")} // 엔터키를 눌러도 키보드가 내려가지 않음
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default EmailInput;
