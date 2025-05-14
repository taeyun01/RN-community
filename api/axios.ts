import axios from "axios";
import { Platform } from "react-native";

export const baseUrls = {
  android: "http://10.0.2.2:3030",
  ios: "http://localhost:3030",
};

const axiosInstance = axios.create({
  // 현재 기기가 안드로이드인지 아이폰인지에 따라 서버 주소 설정
  baseURL: Platform.OS === "android" ? baseUrls.android : baseUrls.ios,
});

export default axiosInstance;
