import axiosInstance from "./axios";

// 모자 조회
async function getHats(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/hats");

  return data;
}

// 얼굴 조회
async function getFaces(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/faces");

  return data;
}

// 상의 조회
async function getTops(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/tops");

  return data;
}

// 하의 조회
async function getBottoms(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/bottoms");

  return data;
}

// 손 조회
async function getHands(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/hands");

  return data;
}

// 피부 조회
async function getSkins(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/skins");

  return data;
}

export { getBottoms, getFaces, getHands, getHats, getSkins, getTops };
