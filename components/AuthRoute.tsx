import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import React from "react";

type AuthRouteProps = {
  children: React.ReactNode;
};

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { auth } = useAuth();

  // 화면이 포커스 됐을 때 실행됨 (유저 정보가 없는 경우 로그인 페이지로 이동)
  useFocusEffect(() => {
    !auth.id && router.replace("/auth");
  });

  return <>{children}</>;
};

export default AuthRoute;
