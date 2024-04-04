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
import { API_BASE_URL } from "../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EnterMessageChatBot({OnPress}) {

  const [typedText, setTypedText] = useState("");

  const handleSendMessage = async () => {

    
    if (typedText.length == 0)
    {
      alert("Hãy nhập tin nhắn")
      return;
    }

    var form = new FormData()
    form.append('toUserName', "Chatbot")
    form.append('messContent', typedText)

    const request = await axios.post(API_BASE_URL + "/api/v1/messageUser/sendMessageForUser", form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })
    
    var content = typedText;

    setTypedText(typedText + ' (Hệ thống đang soạn câu trả lời...)')

    const chatCompletion = await axios.post('https://api.openai.com/v1/chat/completions', {
        messages: [{ role: 'user', content: content }],
        model: 'gpt-3.5-turbo',
        max_tokens: 100,
    }, {
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json',
        },
    });

    var formData = new FormData()
    formData.append("messContent", chatCompletion.data.choices[0].message.content)

    const response = await axios.post(API_BASE_URL + "/api/v1/messageUser/saveChatbotMessage", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

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
