import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import React, { useState } from "react";
import ChatGptContainer from "./src/chat-container/ChatGptContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const HomeScreen = ({ navigation }) => {
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  const [inputEntered, setInputEntered] = useState("");
  const handleChange = (e) => {
    console.log(e.target);
    setInputEntered(e.target.value);
  };
  console.log("what is", inputEntered);
  return (
    <View>
      <TextInput
        value={inputEntered}
        onChange={(e) => handleChange(e)}
        style={styles.input}
      />
      <Button
        title="Start Chatting"
        onPress={() => navigation.navigate("chat", { name: inputEntered })}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="chat" component={ChatGptContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
