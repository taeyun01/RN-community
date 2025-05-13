import { SafeAreaView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Box />
        <Box />
        <Box />
      </View>
      <View style={styles.row2}>
        <Box />
        <Box />
        <Box />
      </View>
      <View style={styles.row3}>
        <Box />
        <Box />
        <Box />
      </View>
    </SafeAreaView>
  );
}

const Box = () => {
  return <View style={styles.box}></View>;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "red",
    height: "100%",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    gap: 2,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    gap: 2,
  },
  row3: {
    flexDirection: "row",
    gap: 2,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "black",
  },
});
