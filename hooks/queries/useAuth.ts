import { getMe, postLogin, postSignup } from "@/api/auth";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { removeHeader, setHeader } from "@/utils/header";
import {
  deleteSecureStore,
  getSecureStore,
  saveSecureStore,
} from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

const useGetMe = () => {
  // 서버에서 가져온 데이터를 리턴해줌
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMe,
    queryKey: [queryKeys.AUTH, queryKeys.GET_ME],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getSecureStore("accessToken");
        setHeader("Authorization", `Bearer ${accessToken}`);
      }
    })();
  }, [isSuccess]);

  // useGetMe훅은 토큰을 이용해 내 정보를 가져오는 역할임
  // 그런데 토큰이 잘못됐거나 유효기간이 지난 토큰인 경우 에러가 발생하는데 이를 위한 에러처리
  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
};

const useLogin = () => {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] }); // 키에 해당하는 쿼리를 패칭함
      router.replace("/"); // 로그인 성공 시 홈으로
    },
    onError: () => {
      //TODO: 로그인 실패 시 오류 처리
      console.log("로그인 실패");
    },
  });
};

const useSignup = () => {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: () => {
      console.log("회원가입 실패");
    },
  });
};

const useAuth = () => {
  const { data } = useGetMe();
  const loginMutation = useLogin();
  const signupMutation = useSignup();

  const logout = () => {
    removeHeader("Authorization");
    deleteSecureStore("accessToken");
    queryClient.resetQueries({ queryKey: ["auth"] }); // 첫번째 쿼리키가 auth인 쿼리들을 초기상태로 리셋함
  };

  return {
    auth: {
      id: data?.id || "",
      nickname: data?.nickname || "",
      imageUri: data?.imageUri || "",
      introduce: data?.introduce || "",
    },
    loginMutation,
    signupMutation,
    logout,
  };
};

export default useAuth;
