import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import * as Speech from "expo-speech";

const ChatGptContainer = ({ route }) => {
  const [gptResponse, setData] = React.useState(
    `Hello ${route.params.name}, Ask me anything!`
  );
  const [messages, setMessages] = useState([gptResponse]);
  const [isLoading, setIsloading] = useState(false);
  const speak = () => {
    const thingToSay = gptResponse;
    Speech.speak(thingToSay);
  };
  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, gptResponse]);
  }, [gptResponse]);

  const fetchGptResponse = async () => {
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: inputEntered,
        },
      ],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + api_key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        setIsloading(true);
        console.log("Loading...");
        return data.json();
      })
      .then((data) => {
        console.log("Loading...");
        setData(data.choices[0].message.content);
      });
  };

  const api_key = "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";
  // const onSend = (messages) => {
  //   console.log("single message", messages);
  //   fetchGptResponse(messages[0].text);
  //   setMessages((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  //   setIsloading(false);
  // };

  React.useEffect(() => {
    console.log("gpt response --- ", gptResponse);
  }, [gptResponse]);

  const handleSend = () => {
    setMessages((prevMessages) => [...prevMessages, inputEntered]);
    fetchGptResponse();
    setInputEntered("");
  };
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
  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      {/* <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        placeholder="Ask Chat GPT"
        isTyping={!isLoading}
      /> */}
      {messages.map((message, index) => {
        console.log(message);
        return <Text>{message}</Text>;
      })}
      <TextInput
        value={inputEntered}
        onChangeText={handleChange}
        style={styles.input}
        placeholder="Enter your queries..."
      />
      <Button title="Send" onPress={handleSend} />
      <Button title="Audio Response" onPress={speak} />
    </View>
  );
};

export default ChatGptContainer;
