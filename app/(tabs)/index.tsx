import { useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const onPress = () => setCount((prevCount) => prevCount + 1);

  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = "";
  if (timesPressed > 1) {
    textLog = timesPressed + "x onPress";
  } else if (timesPressed > 0) {
    textLog = "onPress";
  }

  const Separator = () => <View style={styles.separator} />;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen</Text>
      </View>
      <TextInput
        value={text}
        style={styles.input}
        onChangeText={(value) => {
          setText(value); // e.target.value 안해도됨 자동으로 설정 돼있음
        }}
      />
      <Button
        title="버튼이름"
        color="red"
        onPress={() => {
          console.log(text);
        }}
      />
      <Separator />
      <View style={styles.btContainer}>
        <Text style={styles.textTitle}>TouchableOpacity 버튼</Text>
        <Text>Count: {count}</Text>
        <TouchableOpacity style={styles.touchButton} onPress={onPress}>
          <Text>Press Here!</Text>
        </TouchableOpacity>
      </View>
      <Separator />
      <View style={styles.btContainer}>
        <Text style={styles.textTitle}>Pressable 버튼</Text>
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              setTimesPressed((current) => current + 1);
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
              },
              styles.wrapperCustom,
            ]}
          >
            {({ pressed }) => (
              <Text style={styles.text}>
                {pressed ? "Pressed!" : "Press Me"}
              </Text>
            )}
          </Pressable>
          <View style={styles.logBox}>
            <Text testID="pressable_press_console">{textLog}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    padding: 24,
  },
  text: {
    fontSize: 20,
    color: "black",
  },
  textTitle: {
    fontSize: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
  },
  touchButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 10,
  },
  btContainer: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#f0f0f0",
    backgroundColor: "#f9f9f9",
  },
  separator: {
    marginVertical: 12,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
