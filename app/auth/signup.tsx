import FixedBottomCTA from "@/components/FixedBottomCTA";
import InputField from "@/components/InputField";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const SignupScreen = () => {
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChangeInput = (text: string, name: string) => {
    setSignupValues((prev) => {
      return { ...prev, [name]: text };
    });
  };

  const handleSubmit = () => {
    if (signupValues.email.length === 0) {
      setError((prev) => ({ ...prev, email: "이메일을 입력해주세요." }));
    }
  };

  return (
    <>
      <View style={styles.container}>
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={signupValues.email}
          onChangeText={(text) => handleChangeInput(text, "email")}
          error={error.email}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={signupValues.password}
          onChangeText={(text) => handleChangeInput(text, "password")}
        />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
          value={signupValues.passwordConfirm}
          onChangeText={(text) => handleChangeInput(text, "passwordConfirm")}
        />
      </View>
      {/* inset.bottom은 하단 영역을 계산해서 넣어줌. 안드로이드는 inset.bottom이 0 이기때문에 0이면 12px 넣어줌 */}
      <FixedBottomCTA label="회원가입 하기" onPress={handleSubmit} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});

export default SignupScreen;
