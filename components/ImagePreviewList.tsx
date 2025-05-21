import { baseUrls } from "@/api/axios";
import { ImageUri } from "@/types";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

interface ImagePreviewListProps {
  imageUris: ImageUri[];
}

function ImagePreviewList({ imageUris = [] }: ImagePreviewListProps) {
  return (
    <ScrollView
      horizontal // 가로로 스크롤 가능하게 설정
      showsHorizontalScrollIndicator={false} // 스크롤 바 숨김
      contentContainerStyle={styles.container} // 스타일
    >
      {imageUris.map(({ uri }, index) => {
        const imageUri = `${
          Platform.OS === "ios" ? baseUrls.ios : baseUrls.android
        }/${uri}`;

        return (
          <Pressable
            key={uri + index}
            style={styles.imageContainer}
            onPress={() =>
              router.push({ pathname: "/image", params: { uri: imageUri } })
            }
          >
            <Image style={styles.image} source={{ uri: imageUri }} />
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexGrow: 1,
  },
  imageContainer: {
    width: 90,
    height: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default ImagePreviewList;
