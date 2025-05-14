import axiosInstance from "@/api/axios";

//* 헤더 설정
const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

//* 헤더 삭제
const removeHeader = (key: string) => {
  // 헤더가 없으면 삭제 안함
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }

  delete axiosInstance.defaults.headers.common[key];
};

export { removeHeader, setHeader };
