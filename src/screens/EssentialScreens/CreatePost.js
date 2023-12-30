import React, { useState, useEffect, useRef } from "react";
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

  let { subjectID } = props.route.params;

  const handleCreatePost = async () => {
    let blog = {
      content: contentText,
    };

    const response = await axios.post(
      API_BASE_URL +
        "/api/v1/blog/createNewBlog?groupID=" +
        (await AsyncStorage.getItem("groupID")) +
        "&userName=" +
        (await AsyncStorage.getItem("username")) +
        "&subjectID=" +
        subjectID,
      blog
    );

    goBack();
  };
  
  //Add/change image
  const handleImage = async () => {
    alert("đổi hình thành công");
  };

  //navigation
  const { navigate, goBack } = props.navigation;

  //Quickly delete written content
  useEffect(() => {
    contentText == "" ? setBlankContent(true) : setBlankContent(false);
  });

  //Auto focus on TextInput when the screen is touched
  const textInputRef = useRef(null);
  const handleTouch = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };


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
      />

      <ScrollView /* content */ onTouchStart={handleTouch}>
        <TextInput
          ref={textInputRef}
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
        <TouchableOpacity style={styles.imgClickable} onPress={handleImage}>
          <Image source={images.blankImageLoading} style={styles.image} />
        </TouchableOpacity>
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
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 5,
    alignSelf: "center",
  },
  imgClickable: {
    backgroundColor: colors.transparentWhite,
  },
});
