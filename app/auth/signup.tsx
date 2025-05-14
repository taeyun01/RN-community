import EmailInput from "@/components/EmailInput";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import PasswordConfirmInput from "@/components/PasswordConfirmInput";
import PasswordInput from "@/components/PasswordInput";
import useAuth from "@/hooks/queries/useAuth";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignupScreen = () => {
  const { signupMutation } = useAuth();
  const signupForm = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const {
    mutate: signupMutate,
    status: signupStatus,
    // isError: signupIsError,
  } = signupMutation;

  // const { status: loginStatus } = loginMutation;

  const isLoading = signupStatus === "pending";
  // || loginStatus === "pending";

  const onSubmit = (formValues: FormValues) => {
    // 회원 가입
    const { email, password } = formValues;
    signupMutate({
      email,
      password,
    });

    // if (signupIsError) {
    //   return Toast.show({
    //     type: "error",
    //     text1: "회원가입 실패",
    //     text2: "이미 가입된 이메일입니다.",
    //     position: "top",
    //   });
    // }

    // if (signupStatus.includes("success")) {
    //   console.log("회원가입 성공1");
    //   // 회원 가입 후 바로 로그인
    //   loginMutate({
    //     email,
    //     password,
    //   });
    // }
  };

  return (
    <FormProvider {...signupForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput submitBehavior="submit" />
        <PasswordConfirmInput />
      </View>
      {/* inset.bottom은 하단 영역을 계산해서 넣어줌. 안드로이드는 inset.bottom이 0 이기때문에 0이면 12px 넣어줌 */}
      <FixedBottomCTA
        label={isLoading ? "처리중..." : "회원가입 하기"}
        onPress={signupForm.handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </FormProvider>
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
