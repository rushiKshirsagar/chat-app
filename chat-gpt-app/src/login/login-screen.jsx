import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import React, { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [inputEntered, setInputEntered] = useState("");
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  const handleChange = (e) => {
    setInputEntered(e);
  };
  const handleNavigation = () => {
    navigation.navigate("Chat", { name: inputEntered });
    setInputEntered("");
  };

  return (
    <View>
      <TextInput
        value={inputEntered}
        onChangeText={handleChange}
        style={styles.input}
        placeholder="Enter your name..."
      />
      <Button
        title="Let's Go"
        onPress={handleNavigation}
        disabled={inputEntered.length > 3 ? false : true}
      />
    </View>
  );
};

export default LoginScreen;
