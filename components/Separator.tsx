import { colors } from "@/constants";
import { StyleSheet, View } from "react-native";

type SeparatorProps = {
  paddingVertical?: number;
  backgroundColor?: (typeof colors)[keyof typeof colors];
};

const Separator = ({
  paddingVertical = 8,
  backgroundColor = colors.GRAY_200,
}: SeparatorProps) => {
  return (
    <View style={[styles.separator, { paddingVertical, backgroundColor }]} />
  );
};

const styles = StyleSheet.create({
  separator: {},
});

export default Separator;
