import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.parent}>
        <View style={styles.container}>
          <Text style={styles.text}>TEXT</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.text}>TEXT</Text>
          <Text style={styles.text}>TEXT</Text>
          <Text style={styles.text}>TEXT</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    flexDirection: "row", // display: flex를 하지 않아도 적용됨
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "gray",
    padding: 24,
  },
  container2: {
    backgroundColor: "blue",
    padding: 24,
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});
