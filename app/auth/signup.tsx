import FixedBottomCTA from "@/components/FixedBottomCTA";
import InputField from "@/components/InputField";
import React from "react";
import { StyleSheet, View } from "react-native";

const SignupScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <InputField label="이메일" placeholder="이메일을 입력해주세요." />
        <InputField label="비밀번호" placeholder="비밀번호를 입력해주세요." />
        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요."
        />
      </View>
      {/* inset.bottom은 하단 영역을 계산해서 넣어줌. 안드로이드는 inset.bottom이 0 이기때문에 0이면 12px 넣어줌 */}
      <FixedBottomCTA label="회원가입 하기" onPress={() => {}} />
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
