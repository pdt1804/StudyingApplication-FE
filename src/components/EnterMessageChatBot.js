import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { images, colors } from "../constants";
import { API_BASE_URL } from "../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EnterMessageChatBot({OnPress}) {

  const [typedText, setTypedText] = useState("");

  const handleSendMessage = async () => {

    
    if (typedText.length == 0)
    {
      alert("Hãy nhập tin nhắn")
      return;
    }

    const sentMessage = {
        content: typedText,
    }

    const request = await axios.post(API_BASE_URL + "/api/v1/messageUser/sendMessageForUser?fromUserName=" + await AsyncStorage.getItem('username') + "&toUserName=Chatbot", sentMessage)
    
    setTypedText(typedText + ' (Hệ thống đang soạn câu trả lời...)')
    const chatCompletion = await axios.post('https://api.openai.com/v1/chat/completions', {
        messages: [{ role: 'user', content: typedText }],
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
    }, {
        headers: {
            'Authorization': 'API KEY',
            'Content-Type': 'application/json',
        },
    });


    const message = {
      content: chatCompletion.data.choices[0].message.content,
    }

    const response = await axios.post(API_BASE_URL + "/api/v1/messageUser/sendMessageForUser?fromUserName=Chatbot&toUserName=" + await AsyncStorage.getItem('username'), message)
    setTypedText(""); 

  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        style={styles.textInput}
        onChangeText={(typedText) => {
          setTypedText(typedText);
        }}
        value={typedText}
        placeholder="Nhắn tin"
        placeholderTextColor={colors.placeholder}
      />
      <TouchableOpacity onPress={handleSendMessage}>
        <Image source={images.sendMessageCursorIcon} style={styles.sendIcon} />
      </TouchableOpacity>
    </View>
  );
}
export default EnterMessageChatBot;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    minHeight: 50,
    //position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  textInput: {
    width: "85%",
    color: "black",
    paddingStart: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
    resizeMode: "stretch",
    padding: 10,
    marginHorizontal: 10,
    tintColor: colors.PrimaryBackground
  },
});
