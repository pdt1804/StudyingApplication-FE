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

const CreateNotification = (props) => {
  const [blankContent, setBlankContent] = useState(true);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");

  const handleCreatePost = async () => {
    alert("Tạo bài đăng thành công");
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
        title={null}
        leftIconName={blankContent ? images.backIcon : images.cancelIcon}
        rightIconName={images.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          blankContent ? goBack() : (setContentText(""), setTitleText(""));
        }}
        onPressRightIcon={() => {
          handleCreatePost();
        }}
        mainStyle={{ backgroundColor: colors.backgroundWhite }}
        iconStyle={{ tintColor: colors.active }}
      />

      <ScrollView>
        <TextInput /* title */
          style={styles.titleTextInput}
          inputMode="text"
          maxLength={180}
          onChangeText={(text) => {
            setContentText(text);
          }}
          value={contentText}
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
  },
  titleTextInput: {
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
  },
});
