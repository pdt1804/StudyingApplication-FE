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
import { images, icons, colors, fontSize } from "../constants";
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

    console.log("1")
    
    var content = typedText;

    setTypedText(typedText + ' (Hệ thống đang soạn câu trả lời...)')

    var formData = new FormData()
    formData.append('messages', [{role: 'user', content: content}])
    formData.append('model', 'gpt-3.5-turbo')
    formData.append('max_tokens', 1000)

    const chatCompletion = await axios.post('https://api.openai.com/v1/chat/completions', formData, {
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'multipart/form-data',
          },
    });

    alert(chatCompletion.status)

    console.log("2")

    var formData = new FormData()
    formData.append("messContent", chatCompletion.data.choices[0].message.content)

    const response = await axios.post(API_BASE_URL + "/api/v1/messageUser/saveChatbotMessage", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    console.log("3")

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
        <Image source={icons.sendMessageCursorIcon} style={styles.sendIcon} />
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
