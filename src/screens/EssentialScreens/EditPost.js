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

export default EditPost = (props) => {
  const { navigate, goBack } = props.navigation;

  const { blogID, content, image, nameSubject, subjectID } = props.route.params;

  const [blankContent, setBlankContent] = useState(true);
  const [contentText, setContentText] = useState(content);
  const [listSelectedImage, setListSelectedImage] = useState(image.length === 0 ? [] : [image.toString().split("-")[0]]);

  const [addImageRequests, setAddImageRequests] = useState([]); // STORE RESULT.ASSETS
  const [removeImageRequests, setRemoveImageRequests] = useState([]); // STORE FILEPATH OF IMAGE OR VIDEO

  useEffect(() => {
    const fetchData = async () => {
      contentText == "" ? setBlankContent(true) : setBlankContent(false);
    };

    fetchData();
  }, [props.userName]);

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

  const handleUpdatePost = async () => {
    if (contentText.length == 0) {
      alert("Vui lòng nhập nội dung thảo luận");
      return;
    }

    console.log(addImageRequests);

    const formData = new FormData();
    formData.append("blogID", blogID);
    formData.append("content", contentText);
    //formData.append('addNewFiles', addImageRequests)
    formData.append("removeOldFiles", removeImageRequests);

    let response;

    if (addImageRequests.length > 0) {
      // Update này là update toàn bộ thông tin
      for (var i = 0; i < addImageRequests.length; i++) {
        const uri = addImageRequests[i].uri;
        const name = addImageRequests[i].fileName;
        const type = addImageRequests[i].type;

        formData.append("addNewFiles", {
          uri: uri,
          name: name,
          type: type,
        });
      }

      response = await axios.put(
        API_BASE_URL + "/api/v1/blog/updateBlog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );
    } // Update này không thêm ảnh mới
    else {
      response = await axios.put(
        API_BASE_URL + "/api/v1/blog/updateBlogRemovingImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );
    }

    // if (filePath != "images.blankImageLoading")
    // {
    //   uploadImage(filePath, blogID)
    // }

    if (response.status == 200) {
      alert("Chỉnh sửa thành công");
    }

    const type = {
      nameSubject: nameSubject,
      subjectID: subjectID,
    };

    navigate("TabDiscussionFiltered", { type: type });
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
        title={"Sửa thảo luận"}
        leftIconName={icons.backIcon}
        rightIconName={icons.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          handleUpdatePost();
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
            <Image source={{ uri: eachImage }} style={styles.image} />
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
