import { colors } from "@/constants";
import useUploadImages from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/utils/image";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function PostWriteFooter() {
  const inset = useSafeAreaInsets(); // safeArea영역을 침범하지 않게 하기위해 사용
  const { mutate: uploadImages } = useUploadImages();

  const handleOpenImagePicker = async () => {
    // 갤러리 열기
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // 이미지만 선택 가능 (기본 값)
      allowsMultipleSelection: true, // 여러 이미지 선택 가능
    });

    // 취소 누를 시
    if (result.canceled) {
      return;
    }
    // console.log("result", result.assets); // 선택한 이미지 정보 (assets에 들어있음)

    // result.assets 형식을 폼데이터로 변환
    const formData = getFormDataImages("images", result.assets);
    uploadImages(formData, {
      onSuccess: (data: string[]) => console.log("data", data), // 업로드 성공 시 호출
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name={"camera"} size={20} color={colors.BLACK} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: 12,
    bottom: 12, // 하단에 고정
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.GRAY_300,
    flexDirection: "row",
    gap: 10,
  },
  footerIcon: {
    backgroundColor: colors.GRAY_100,
    padding: 10,
    borderRadius: 5,
  },
});

export default PostWriteFooter;
