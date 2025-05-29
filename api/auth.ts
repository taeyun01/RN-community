import { Profile } from "@/types";
import { getSecureStore } from "@/utils/secureStore";
import axiosInstance from "./axios";

type RequestUser = {
  email: string;
  password: string;
};

const postSignup = async (body: RequestUser): Promise<void> => {
  const { data } = await axiosInstance.post("/auth/signup", body);

  return data;
};

const postLogin = async (
  body: RequestUser
): Promise<{ accessToken: string }> => {
  const { data } = await axiosInstance.post("/auth/signin", body);

  return data;
};

// 내 정보 조회
const getMe = async (): Promise<Profile> => {
  // SecureStore에 저장된 액세스 토큰 가져오기
  const accessToken = await getSecureStore("accessToken");

  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

// 해당 유저 프로필 정보 가져오기
const getUserProfile = async (id: number): Promise<Profile> => {
  const { data } = await axiosInstance.get(`/auth/${id}`);

  return data;
};

export { getMe, getUserProfile, postLogin, postSignup };
