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

function EnterMessageReplyBar({myUsername, friendUsername, commentID}) {
  
  const [typedText, setTypedText] = useState("");
  const [userNames, setUserNames] = useState([]);

  const ReplyComment = async () => {

    if (typedText.length == 0)
    {
      alert("Hãy nhập phản hồi")
      return;
    }

    // let reply = {
    //   content: typedText,
    // }
    var form = new FormData();
    form.append('commentID', commentID)
    form.append('content', typedText)
    form.append('userNames', userNames)

    const response = await axios.post(API_BASE_URL + "/api/v1/blog/replyComment", form, {
      headers: {
        'Content-Type': 'multipart/form-data', 
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    if (response.status != 200)
    {
      alert('Lỗi mạng, không thể phản hồi bình luận')
    }
    else
    {
      setTypedText("");
    }
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
      <TouchableOpacity onPress={ReplyComment}>
        <Image source={images.sendMessageCursorIcon} style={styles.sendIcon} />
      </TouchableOpacity>
    </View>
  );
}
export default EnterMessageReplyBar;

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
