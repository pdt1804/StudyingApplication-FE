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
import SockJS from 'sockjs-client';
import { over } from "stompjs";

function EnterMessageGroupBar({userName, groupID, stompClient}) {
  const [typedText, setTypedText] = useState("");

  const [groups, setGroups] = useState([]);
  const [username, setUsername] = useState(null);

  //const [stompClient, setStompClient] = useState(over(socket));
  

  useEffect(() => {

    const initial = async () => {

      groupID = await AsyncStorage.getItem('groupID');

      //stompClient.connect({} , onConnected, onError)

      setUsername(await AsyncStorage.getItem('username'))

      const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/getAllGroupofUser", {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      });

      setGroups(response.data);  

    };

    initial();

    // const intervalId = setInterval(checkNewNotification, 1000);

    // // // Hủy interval khi component bị unmounted
    // return () => clearInterval(intervalId);

  }, []);


  const onConnected = () =>
  {
    stompClient.subscribe("/user/public/queue/" + groupID.toString(), onReceived)

    // groups.map((group) => {
    //   stompClient.subscribe("/public/queue/" + group.groupID, onReceived)
    // })

  }

  const onError = async () =>
  {
    alert('Error')
  }


  const handleSendMessage = async () => {
    
    if (typedText.length == 0)
    {
      alert("Hãy nhập tin nhắn")
      return;
    }
    const message = {
      content: typedText,
    }

    var form = new FormData()
    form.append('messContent', typedText)
    form.append('groupID', await AsyncStorage.getItem('groupID'))

    const response = await axios.post(API_BASE_URL + "/api/v1/messagegroup/sendMessage", form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    if (response.status == 200)
    {
      console.log('sending')
      const messagePayload = { groupID: parseInt(await AsyncStorage.getItem('groupID')) };

      //alert(stompClient.connected)
      stompClient.send('/app/sendMess', {}, JSON.stringify(messagePayload));
      console.log('sent')
    }

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
export default EnterMessageGroupBar;

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
