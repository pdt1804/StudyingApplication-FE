import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateNotification = (props) => {
  const [blankContent, setBlankContent] = useState(true);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");

  const handleCreatePost = async () => {
    
    let notification = {
      header: titleText,
      content: contentText,
    }

    const response = await axios.post(API_BASE_URL + "/api/v1/notifycation/create?groupID=" + await AsyncStorage.getItem('groupID') + "&userName=" + await AsyncStorage.getItem('username'), notification)
    alert("Tạo thành công")
    goBack();
  };

  //navigation
  const { navigate, goBack } = props.navigation;

  //Quickly delete written content
  useEffect(() => {
    contentText == "" ? setBlankContent(true) : setBlankContent(false);
  });

  return (
    <View style={styles.container}>
      <UIHeader
        title={'Tạo thông báo'}
        leftIconName={blankContent ? images.backIcon : images.cancelIcon}
        rightIconName={images.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          blankContent ? goBack() : (setContentText(""), setTitleText(""));
        }}
        onPressRightIcon={() => {
          handleCreatePost();
        }}
        //mainStyle={{ backgroundColor: colors.backgroundWhite, paddingBottom: 20, }}
        //iconStyle={{ tintColor: colors.active }}
        //textStyle={{ color: colors.active }}
      />

      <ScrollView>
        <TextInput /* title */
          style={styles.titleTextInput}
          inputMode="text"
          maxLength={180}
          onChangeText={(text) => {
            setTitleText(text);
          }}
          value={titleText}
          placeholder={"Tiêu đề"}
          placeholderTextColor={colors.inactive}
        />
        <TextInput /* content */
          style={styles.contentTextInput}
          inputMode="text"
          multiline
          onChangeText={(text) => {
            setContentText(text);
          }}
          value={contentText}
          placeholder={"Soạn thông báo"}
          placeholderTextColor={colors.inactive}
        />
      </ScrollView>
    </View>
  );
};
export default CreateNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  contentTextInput: {
    paddingStart: 15,
    padding: 10,
    height: 1000,
  },
  titleTextInput: {
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
    marginTop: 20,
    height: 50,
    marginBottom: 20,
  },
});
