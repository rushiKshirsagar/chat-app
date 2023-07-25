import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import * as Speech from "expo-speech";

const ChatGptContainer = ({ route }) => {
  const [messages, setMessages] = useState([]);

  const [gptResponse, setData] = React.useState(
    `Hello ${route.params.name}, Ask me anything!`
  );

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Hello ${route.params.name}, Ask me anything!`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "GPT",
        },
      },
    ]);
  }, []);

  const [isLoading, setIsloading] = useState(false);

  const speak = () => {
    const thingToSay = gptResponse;
    Speech.speak(thingToSay);
  };

  const pauseSpeaking = () => {
    Speech.pause();
  };

  const resumeSpeaking = () => {
    Speech.resume();
  };

  const stopSpeaking = () => {
    Speech.stop();
  };

  const fetchGptResponse = async (onSendText) => {
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: onSendText,
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
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, {
            _id: `${data.choices[0].message.content}`,
            createdAt: "2023-07-25T12:58:56.521Z",
            text: data.choices[0].message.content,
            name: route.params.name,
            user: { _id: 2, name: "GPT" },
          })
        );
        setData(data.choices[0].message.content);
      });
  };

  const api_key = "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";
  const onSend = (messages) => {
    fetchGptResponse(messages[0].text);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setIsloading(false);
  };

  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          name: route.params.name,
        }}
        placeholder="Ask Chat GPT"
        isTyping={!isLoading}
        showUserAvatar={true}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Play" onPress={speak} />
        <Button title="Pause" onPress={pauseSpeaking} />
        <Button title="Resume" onPress={resumeSpeaking} />
        <Button title="Stop" onPress={stopSpeaking} />
        <Button title="Mic" />
      </View>
    </View>
  );
};

export default ChatGptContainer;
