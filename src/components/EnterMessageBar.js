import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  messenger_sendMessageForUser,
  messenger_sendMessageForGroup,
  messageuser_sendMessageForUser,
  messageuser_uploadImage,
} from "../api";
import * as ImagePicker from "expo-image-picker";
//import ImagePicker from "react-native-image-picker";

export default EnterMessageBar = (props) => {
  //use for friend-MessageBar
  const { friendUsername, friendID } = props;
  //use for all
  //actionType: friend (0) - group (1) - comment (2) - reply (3) - chatbot (4)
  const { stompClient, actionType } = props;
  const [typedText, setTypedText] = useState("");

  //testing...
  const [pickedImages, setPickedImages] = useState(null);

  const handleSendMessage_Friend = async () => {
    if (typedText.length == 0) {
      alert("Hãy nhập tin nhắn");
      return;
    }
    const response = await messageuser_sendMessageForUser(
      typedText,
      friendUsername
    );
    if (response.status == 200) {
      const messagePayload = { groupID: friendID };
      stompClient.send(
        "/app/sendMessForUser",
        {},
        JSON.stringify(messagePayload)
      );
    }
    setTypedText("");
  };

  const handleSendMessage_Group = async () => {
    if (typedText.length == 0) {
      alert("Hãy nhập tin nhắn");
      return;
    }
    const response = await messenger_sendMessageForGroup(typedText);
    if (response.status == 200) {
      //console.log("sending");
      const messagePayload = {
        groupID: parseInt(await AsyncStorage.getItem("groupID")),
      };
      stompClient.send("/app/sendMess", {}, JSON.stringify(messagePayload));
      //console.log("sent");
    }
    setTypedText("");
  };

  //final handleVerification
  const handleSendMessage = async () => {
    if (actionType === 0 || actionType === "friend") {
      handleSendMessage_Friend();
    } else if (actionType === 1 || actionType === "group") {
      handleSendMessage_Group();
    }
  };

  //image
  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    if (!result.canceled) {
      const imagePath = result.assets[0].uri.toString();
      setPickedImages(imagePath); // Update state
      try {
        const response = await messageuser_uploadImage(friendUsername,imagePath);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage}>
        <Icon
          name={icons.priceTagIcon}
          size={25}
          color={colors.PrimaryBackground}
        />
      </TouchableOpacity>
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
        <Icon
          name={icons.sendMessageCursorIcon}
          size={25}
          color={colors.PrimaryBackground}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    minHeight: 50,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  textInput: {
    width: "75%",
    color: "black",
    paddingStart: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
    resizeMode: "stretch",
    padding: 10,
    marginHorizontal: 10,
    tintColor: colors.PrimaryBackground,
  },
});
