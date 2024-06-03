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
//import { GoogleGenerativeAI } from "@google/generative-ai";

function EnterMessageChatBot({fetchData}) {

  const genAI = new GoogleGenerativeAI("AIzaSyCzEjk1hNBglnMZU6tXItqyqGuxucVp2Mk");

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

    // API OPENAI CŨ
    // const chatCompletion = await axios.post('https://api.openai.com/v1/chat/completions', {
    //     messages: [{ role: 'user', content: content }],
    //     model: 'dall-e-3',
    //     max_tokens: 100,
    // }, {
    //     headers: {
    //         'Authorization': 'sk-uitpublic-Go0Z8Irb6gQH2L3dWFZwT3BlbkFJzPie3OZfnUFiz1mVc3i1',
    //         'Content-Type': 'application/json',
    //     },
    // });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = content;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    console.log("2")

    var formData = new FormData()
    formData.append("messContent", text)

    const saveChatbotMessage = await axios.post(API_BASE_URL + "/api/v1/messageUser/saveChatbotMessage", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    console.log("3")

    setTypedText(""); 

    fetchData;
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
