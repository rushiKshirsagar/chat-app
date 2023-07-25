import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import * as Speech from "expo-speech";
import Icon from "react-native-vector-icons/AntDesign";

const ChatGptContainer = ({ route }) => {
  const [messages, setMessages] = useState([]);

  const [gptResponse, setData] = useState(
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

  const api_key = "";
  const onSend = (messages) => {
    fetchGptResponse(messages[0].text);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    setIsloading(false);
  };

  return (
    <View style={{ flex: 1, marginBottom: 30, backgroundColor: "white" }}>
      <View
        style={{
          borderColor: "#218aff",
          borderWidth: 1,
          margin: 5,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#218aff",
            marginBottom: 15,
            fontSize: 20,
          }}
        >
          Voice Control Center
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Icon name="play" size={30} color="#218aff" onPress={speak} />
          <Icon
            name="pause"
            size={30}
            color="#218aff"
            onPress={pauseSpeaking}
          />
          <Icon
            name="playcircleo"
            size={30}
            color="#218aff"
            onPress={resumeSpeaking}
          />

          <Icon
            name="minuscircle"
            size={30}
            color="#218aff"
            onPress={stopSpeaking}
          />
          <Icon
            name="customerservice"
            size={30}
            color="#218aff"
            onPress={stopSpeaking}
          />
        </View>
      </View>
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
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: "white",
                },
                left: {
                  color: "black",
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: "#d8d8d8",
                },
                right: {
                  backgroundColor: "#218aff",
                },
              }}
            />
          );
        }}
        renderAvatar={null}
      />
    </View>
  );
};

export default ChatGptContainer;
