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
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, Icon, CommonButton } from "../../components";
import { API_BASE_URL } from "../../api/DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default CreatePost = (props) => {
  const { navigate, goBack } = props.navigation;
  const { subjectID } = props.route.params;

  const [blankContent, setBlankContent] = useState(true);
  const [contentText, setContentText] = useState("");
  const [listSelectedImage, setListSelectedImage] = useState([
    images.blankImageLoading,
  ]);

  const MAXWidth = 245;
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const getImageSize = (uri) => {
    Image.getSize(uri, (width, height) => {
      const temp = width > MAXWidth ? width / MAXWidth : 1;
      setImageWidth(width);
      setImageHeight(height / temp);
    });
  };

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

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        listSelectedImage[0] === images.blankImageLoading
          ? setListSelectedImage([result.assets[0].uri])
          : setListSelectedImage([...listSelectedImage, result.assets[0].uri]); //worked!!
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleRemoveImageFromList = async (index) => {
    const newList = [...listSelectedImage];
    newList.splice(index, 1);
    setListSelectedImage(newList);
  };

  const handleCreatePost = async () => {
    if (contentText.length == 0) {
      alert("Hãy nhập nội dung");
      return;
    }

    // let blog = {
    //   content: contentText,
    // };

    var formData = new FormData();
    formData.append("groupID", await AsyncStorage.getItem("groupID"));
    formData.append("userNames", []);
    formData.append("subjectID", subjectID);
    formData.append("content", contentText);

    const response = await axios.post(
      API_BASE_URL + "/api/v1/blog/createNewBlog",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
        },
      }
    );

    if (true) {
      for (let i = 0; i < listSelectedImage.length; i++) {
        let url = listSelectedImage[i].uri;
        console.log(listSelectedImage);
        console.log(listSelectedImage[i].uri);
        console.log(listSelectedImage[i].type);
        console.log(listSelectedImage[i].fileName);

        formData = new FormData();
        formData.append("blogID", response.data);
        formData.append("file", {
          url,
          name: listSelectedImage[i].fileName,
          type: listSelectedImage[i].type,
        });

        uploadImage(listSelectedImage[i].uri, response.data);

        // const uploadImage = await axios.post(
        //   API_BASE_URL +
        //     "/api/v1/blog/uploadImage",
        //     formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        //     }}
        // );
      }
    }

    // const formData = new FormData();
    // formData.append('blogID', response.data);
    // formData.append('file', filePath);

    // const responseUpdateImage = await axios.post(API_BASE_URL + '/api/v1/blog/insertImageInBlog', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
    //   }});

    goBack();
  };

  const uploadImage = async (uri, blogID) => {
    const formData = new FormData();

    if (uri.toString())
      formData.append("file", {
        uri,
        name: "image.jpg",
        type: "image/jpg",
      });
    formData.append("blogID", blogID);

    try {
      // const response = await fetch('YOUR_BACKEND_URL', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      const response = await axios.post(
        API_BASE_URL + "/api/v1/blog/insertImageInBlog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      if (response.status == 200) {
        const imageURL = await response.json();
        console.log("URL của ảnh:", imageURL);
        alert("Tạo thành công");
        // Tiếp tục xử lý URL của ảnh ở đây
      } else {
        console.log("Lỗi khi tải lên ảnh");
      }
    } catch (error) {
      console.log("Lỗi:", error);
    }
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Tạo thảo luận"}
        leftIconName={blankContent ? icons.backIcon : icons.cancelCircleIcon}
        rightIconName={icons.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          blankContent ? goBack() : setContentText("");
        }}
        onPressRightIcon={() => {
          handleCreatePost();
        }}
      />

      <ScrollView onTouchStart={handleTouch}>
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
        {listSelectedImage.map((eachImage, index) => (
          <View key={index} style={styles.imgView}>
            <Image source={{ uri: eachImage }} style={[styles.image,/* { width: imageWidth, height: imageHeight, maxWidth: MAXWidth, } */]} />
            {listSelectedImage[0] === images.blankImageLoading ? (
              <View />
            ) : (
              <TouchableOpacity
                style={styles.redRemoveImg}
                onPress={() => handleRemoveImageFromList(index)}
              >
                <Icon
                  name={icons.cancelCircleIcon}
                  size={55}
                  color={colors.RedLightBackground}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
        <CommonButton
          onPress={handleSelectImage}
          title={"+ Thêm ảnh +"}
          styleContainer={styles.addImgBtn}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  contentTextInput: {
    padding: 10,
    marginTop: 30,
  },
  imgView: {
    marginBottom: 5,
    marginHorizontal: 1,
    paddingBottom: 7,
    paddingRight: 17,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    margin: 10,
    borderRadius: 5,
    borderColor: colors.GrayBackground,
    borderWidth: 5,
    alignSelf: "center",
  },
  redRemoveImg: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  addImgBtn: {
    marginTop: 0,
    marginBottom: 30,
    backgroundColor: colors.GrayBackground,
  },
});
