import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import InputField from "./InputField";

function PasswordConfirmInput() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" }); // 비밀번호 값을 가져옴

  return (
    <Controller
      name="passwordConfirm"
      control={control}
      rules={{
        validate: (data: string) => {
          // console.log(data, password);
          if (!data) return "비밀번호를 입력해주세요.";
          if (data !== password) return "비밀번호가 일치하지 않습니다.";
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default PasswordConfirmInput;
