import CustomButton from "@/components/CustomButton";
import { colors } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FixedBottomCTAProps {
  label: string;
  onPress: () => void;
}

const FixedBottomCTA = ({ label, onPress }: FixedBottomCTAProps) => {
  const inset = useSafeAreaInsets();

  return (
    // inset.bottom은 하단 영역을 계산해서 넣어줌. 안드로이드는 inset.bottom이 0 이기때문에 0이면 12px 넣어줌
    <View style={[styles.fixed, { paddingBottom: inset.bottom || 12 }]}>
      <CustomButton label={label} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  fixed: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: StyleSheet.hairlineWidth, // 테두리 선 두께 얇게
    borderTopColor: colors.GRAY_400,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
export default FixedBottomCTA;
