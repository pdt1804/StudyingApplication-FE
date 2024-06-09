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
import { GoogleGenerativeAI } from "@google/generative-ai";
import { messageuser_getGroupDataRetrieving } from "../api/ReNewStyle/messageUserController";
import OpenAI from "openai";

function EnterMessageChatBot({fetchData, userName}) {

  const genAI = new GoogleGenerativeAI("AIzaSyCzEjk1hNBglnMZU6tXItqyqGuxucVp2Mk");

  const openAI = new OpenAI({
    apiKey: 'sk-proj-r83MPEt46Hz5wUSbbWmiT3BlbkFJGc9UgntnrwSIkdj8LNIx',
  });

  const [typedText, setTypedText] = useState("");

  const handleSendMessage = async () => {
    if (userName == "Chatbot-Gemini")
    {
      SendMessageByGeminiAI()
    }
    else if (userName == "Chatbot-Application")
    {
      SendMessageByApplicationData()
    }
    else if (userName == "Chatbot-OpenAI")
    {
      SendMessageByOpenAI()
    }

  };

  const SendMessageByApplicationData = async () => {
    if (typedText.length == 0)
    {
      alert("Hãy nhập tin nhắn")
      return;
    }

    var form = new FormData()
    form.append('toUserName', userName)
    form.append('messContent', typedText)

    const request = await axios.post(API_BASE_URL + "/api/v1/messageUser/sendMessageForUser", form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })
    
    var content = 'Đây là câu hỏi của user: ' + typedText + ', nếu có liên quan đến vấn đề gợi ý nhóm thì hãy dùng data trên để trả lời, nếu không thi không cần dựa trên data cung cấp.';

    setTypedText(typedText + ' (Hệ thống đang soạn câu trả lời...)')

    const data = await messageuser_getGroupDataRetrieving()

    //console.log(data)

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = data + ". " + content;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    var formData = new FormData()
    formData.append("messContent", text)
    formData.append("chatbotUserName", userName)

    const saveChatbotMessage = await axios.post(API_BASE_URL + "/api/v1/messageUser/saveChatbotMessage", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    setTypedText(""); 

    fetchData;
  }
  

  const SendMessageByGeminiAI = async () => {
    if (typedText.length == 0)
    {
      alert("Hãy nhập tin nhắn")
      return;
    }

    var form = new FormData()
    form.append('toUserName', userName)
    form.append('messContent', typedText)

    const request = await axios.post(API_BASE_URL + "/api/v1/messageUser/sendMessageForUser", form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })
    
    var content = typedText;

    setTypedText(typedText + ' (Hệ thống đang soạn câu trả lời...)')

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = content;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);

    var formData = new FormData()
    formData.append("messContent", text)
    formData.append("chatbotUserName", userName)

    const saveChatbotMessage = await axios.post(API_BASE_URL + "/api/v1/messageUser/saveChatbotMessage", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    setTypedText(""); 

    fetchData;
  }
  
  const SendMessageByOpenAI = async () => {

    alert("Xin lỗi, tài khoản đã hết tiền, vui lòng chọn service khác.")
    return;

    if (typedText.length == 0)
    {
      alert("Hãy nhập tin nhắn")
      return;
    }

    var form = new FormData()
    form.append('toUserName', userName)
    form.append('messContent', typedText)

    const request = await axios.post(API_BASE_URL + "/api/v1/messageUser/sendMessageForUser", form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })
    
    var content = typedText;

    setTypedText(typedText + ' (Hệ thống đang soạn câu trả lời...)')

    const chatbot = await openAI.chat.create({
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    console.log(chatbot)

    const result = await axios.post(
      API_URL,
      {
        model: 'GPT-3.5',
        messages: [
          {
            role: 'user',
            content: content
          }
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(result.data.choices[0].message.content)

    var formData = new FormData()
    formData.append("messContent", result.data.choices[0].message.content)
    formData.append("chatbotUserName", userName)

    const saveChatbotMessage = await axios.post(API_BASE_URL + "/api/v1/messageUser/saveChatbotMessage", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    setTypedText(""); 

    fetchData;
  }

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
