import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const ChatGptContainer = () => {
  const [text, setText] = React.useState("");
  const [gptResponse, setData] = React.useState("Ask me anything!");
  const [chatMessages, setMessages] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: gptResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, [gptResponse]);
  const handleTextChange = (e) => {
    setText(e);
  };

  const fetchGptResponse = async () => {
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: text,
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
  const onSend = useCallback((chatMessages) => {
    fetchGptResponse();
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, chatMessages)
    );
    setIsloading(false);
  }, []);

  React.useEffect(() => {
    console.log(gptResponse);
  }, [gptResponse]);

  return (
    <View style={{ flex: 1, marginBottom: 30 }}>
      <GiftedChat
        messages={chatMessages}
        onSend={(chatMessages) => onSend(chatMessages)}
        user={{
          _id: 1,
        }}
        placeholder="Ask Chat GPT"
        onInputTextChanged={(e) => handleTextChange(e)}
        isTyping={!isLoading}
      />
    </View>
  );
};

export default ChatGptContainer;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
