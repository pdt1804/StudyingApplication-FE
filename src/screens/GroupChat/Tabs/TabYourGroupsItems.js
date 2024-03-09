import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import axios from "axios";
import { API_BASE_URL } from "../../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { StompClient } from "../../../../WebSocketConfig";
import SockJS from 'sockjs-client';
import { over } from "stompjs";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

function TabYourGroupsItems(props) {
  let { nameGroup, imageGroup, newestMessage, status, groupID } = props.group;
  //let { stompClient } = props.stompClient

  const { onPress } = props;
  const stompClient = props.stompClient

  let fontSizeName = fontSizes.h5;
  if (nameGroup.length > 22) {
    fontSizeName = fontSizes.h6;
  }

  // let socket = new SockJS(API_BASE_URL + "/ws")
  // let stompClient = over(socket)
  // stompClient.connect({}, onConnected, () => console.log("error"))


  const [isNewNotification, setIsNewNotification] = useState(false);

  useEffect(() => {

    const checkNewNotification = async () => {

      //stompClient.subscribe('/user/public/queue/group' + groupID, onReceived)

      // socket = Socket
      // stompClient = StompClient
      //stompClient.subscribe("asd", onReceivedMessage);

      const response = await axios.post(API_BASE_URL + "/api/v1/groupStudying/checkNewMessage", { groupID: groupID}, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      });
      
      //console.log(response.data)
      setIsNewNotification(response.data === true);
    };

    checkNewNotification();

    const intervalId = setInterval(checkNewNotification, 1000);

    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);

  }, [groupID]);

  const handlePress = () => {
    
    setIsNewNotification(false)
    onPress();

  }

  const onReceived = async (message) =>
  {
    setIsNewNotification(true)
    alert("New message")
  }


  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image /** Avatar */
        style={[styles.avatarImage, {borderColor: generateColor()}]}
        source={{
          uri: imageGroup,
        }}
      />
      <Text /** Name */
        style={isNewNotification ? styles.textNameGroupWithOutSeen : styles.textNameGroup}
      >
        {nameGroup}
      </Text>
    </TouchableOpacity>
  );
}
export default TabYourGroupsItems;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginVertical:'2%',
    marginHorizontal: '4%',
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth:1,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: colors.ShadowedItems,
  },
  avatarImage: {
    width: 65,
    height: 65,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 15,
    alignSelf: "center",
    borderWidth:3,
  },
  textNameGroupWithOutSeen: {
    width: '80%',
    color: colors.active,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textNameGroup: {
    width: '80%',
    color: "black",
    fontSize: 16,
  }
});
