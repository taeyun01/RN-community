import { colors } from "@/constants";
import useUploadImages from "@/hooks/queries/useUploadImages";
import { getFormDataImages } from "@/utils/image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function PostWriteFooter() {
  const inset = useSafeAreaInsets(); // safeArea영역을 침범하지 않게 하기위해 사용
  const { control, setValue } = useFormContext();
  const [imageUris] = useWatch({ control, name: ["imageUris"] });
  const { mutate: uploadImages } = useUploadImages();

  const addImageUris = (uris: string[]) => {
    // 현재 업로드한 이미지 갯수와 지금 업로드할 이미지 갯수의 합이 5개 보다 크면 경고창 띄우기
    if (imageUris.length + uris.length > 5) {
      Alert.alert("이미지 갯수 초과", "추가 가능한 이미지는 최대 5개 입니다.");
      return;
    }

    setValue(
      "imageUris",
      [...imageUris, ...uris.map((uri) => ({ uri }))] // 이미지 여러개 선택할 시 기존 이미지 사라지지 않게 처리
    );
  };

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
      onSuccess: (data: string[]) => addImageUris(data), // 업로드 성공 시 호출
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom }]}>
      <Pressable style={styles.footerIcon} onPress={handleOpenImagePicker}>
        <Ionicons name={"camera"} size={20} color={colors.BLACK} />
      </Pressable>
      <Pressable
        style={styles.footerIcon}
        onPress={() => setValue("isVoteOpen", true)} // 투표 생성 버튼 누르면 투표 모달 오픈
      >
        <MaterialCommunityIcons name="vote" size={20} color={colors.BLACK} />
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
