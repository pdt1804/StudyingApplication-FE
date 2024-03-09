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

function EnterMessageBar({myUsername, friendUsername, stompClient, friendID}) {
  const [typedText, setTypedText] = useState("");
  const handleSendMessage = async () => {
    
    if (typedText.length == 0)
    {
      alert("Hãy nhập tin nhắn")
      return;
    }
    
    const message = {
      content: typedText,
    }

    const response = await axios.post(API_BASE_URL + "/api/v1/messageUser/sendMessageForUser", { toUserName: friendUsername, messContent: typedText }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    if (response.status == 200)
    {
      setTypedText(""); 
      const messagePayload = { groupID: friendID };
      console.log(friendID)
      console.log('sending')
      stompClient.send("/app/sendMessForUser", {}, JSON.stringify(messagePayload));
      console.log('sent')
    }
    else
    {
      alert('Có lỗi mạng, vui lòng gửi lại sau')
    }

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
export default EnterMessageBar;

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
