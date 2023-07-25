import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const ChatGptContainer = ({ route }) => {
  const [gptResponse, setData] = React.useState(
    `Hello ${route.params.name}, Ask me anything!`
  );
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: gptResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "GPT",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, [gptResponse]);

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
        console.log("Loading...");
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

  React.useEffect(() => {
    console.log("gpt response --- ", gptResponse);
  }, [gptResponse]);

  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        placeholder="Ask Chat GPT"
        isTyping={!isLoading}
      />
    </View>
  );
};

export default ChatGptContainer;
