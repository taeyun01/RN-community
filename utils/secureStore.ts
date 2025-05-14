import * as SecureStore from "expo-secure-store";

//* SecureStore 저장
async function saveSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

//* SecureStore 가져오기
async function getSecureStore(key: string) {
  const storedData = (await SecureStore.getItemAsync(key)) ?? null;

  return storedData;
}

//* SecureStore 삭제
async function deleteSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export { deleteSecureStore, getSecureStore, saveSecureStore };
