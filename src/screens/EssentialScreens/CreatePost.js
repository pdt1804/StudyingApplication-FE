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
import { API_BASE_URL } from "../../../DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatePost = (props) => {
  const [blankContent, setBlankContent] = useState(true);
  const [contentText, setContentText] = useState("");

  const handleCreatePost = async () => {
    
    let blog = {
      content: contentText
    }

    const response = await axios.post(API_BASE_URL + '/api/v1/blog/createNewBlog?groupID=' + await AsyncStorage.getItem('groupID') + "&userName=" + await AsyncStorage.getItem('username'), blog)

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
        title={"Tạo thảo luận"}
        leftIconName={blankContent ? images.backIcon : images.cancelIcon}
        rightIconName={images.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          blankContent ? goBack() : setContentText("");
        }}
        onPressRightIcon={() => {
          handleCreatePost();
        }}
        //mainStyle={{ backgroundColor: colors.backgroundWhite }}
        //iconStyle={{ tintColor: colors.active }}
      />

      <ScrollView /* content */>
        <TextInput
          style={styles.contentTextInput}
          inputMode="text"
          multiline //if want to limit the lines can add: numberOfLines={100}
          onChangeText={(text) => {
            setContentText(text);
          }}
          value={contentText}
          placeholder={"Soạn bài đăng. Điền vào đây..."}
          placeholderTextColor={colors.inactive}
        />
      </ScrollView>
    </View>
  );
};
export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  contentTextInput: {
    padding: 10,
    marginTop: 30,
    height: 1000
  },
});
