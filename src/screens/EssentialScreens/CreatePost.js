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
import {
  UIHeader,
  Icon,
  CommonButton,
  RowSectionNavigate,
  WhiteSlideBottomUp,
} from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  groupStudying_getAllUserInGroup,
  blog_createNewBlog,
  blog_insertImageInBlog,
} from "../../api";

export default CreatePost = (props) => {
  const { navigate, goBack } = props.navigation;
  const { subjectID } = props.route.params;

  const [blankContent, setBlankContent] = useState(true);
  const [contentText, setContentText] = useState("");
  const [listSelectedImage, setListSelectedImage] = useState([]);
  const [assets, setAssets] = useState([]);
  const [listMembersNotTagged, setListMembersNotTagged] = useState([]);

  const fetchData = async () => {
    const responsesData = await groupStudying_getAllUserInGroup(
      await AsyncStorage.getItem("groupID")
    );
    setListMembersNotTagged(responsesData);
  };

  useEffect(() => {
    fetchData();
  }, [props.userName]);

  //Quickly delete written content
  useEffect(() => {
    contentText == "" ? setBlankContent(true) : setBlankContent(false);
    console.log(contentText)
  }, [contentText]);

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
        // Thông - API
        for (let i = 0; i < result.assets.length; i++) {
          setAssets([...assets, result.assets[0]]);
        }

        // Trí - giao diện
        listSelectedImage.length == 0
          ? setListSelectedImage([result.assets[0]])
          : setListSelectedImage([...listSelectedImage, result.assets[0]]); //worked!!
        // Trí - giao diện
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

    const tags = [];
    for (let i = 0; i < listTaggedUsernames.length; i++) {
      tags.push(listTaggedUsernames[i].userName);
    }

    const responseData = await blog_createNewBlog(
      await AsyncStorage.getItem("groupID"),
      tags,
      subjectID,
      contentText
    );
    if (listSelectedImage.length > 0) {
      for (let i = 0; i < listSelectedImage.length; i++) {
        let img = listSelectedImage[i];
        try {
          blog_insertImageInBlog(
            img.uri,
            img.fileName,
            img.mimeType,
            img.width,
            img.height,
            responseData
          );
        } catch (error) {
          console.log("Lỗi:", error);
        }
      }
    }
    alert("Tạo thành công");
    goBack();
  };

  //*************** */
  //tag tên ở đây
  //*************** */
  const [modalVisible, setModalVisible] = useState(false);
  const [listTaggedUsernames, setListTaggedUsernames] = useState([]);

  const handleAddTag = async (newName, index) => {
    setListTaggedUsernames([...listTaggedUsernames, newName]);
    const newList = [...listMembersNotTagged];
    newList.splice(index, 1);
    setListMembersNotTagged(newList);
  };

  const handleRemoveTagFromList = async (nameUntag, index) => {
    setListMembersNotTagged([...listMembersNotTagged, nameUntag]);
    const newList = [...listTaggedUsernames];
    newList.splice(index, 1);
    setListTaggedUsernames(newList);
  };

  const renderContentAddTag = () => {
    return (
      <View>
        {listMembersNotTagged.map((eachName, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAddTag(eachName, index)}
          >
            {
              <View style={styles.notTaggedContainer}>
                <Image
                  style={styles.notTaggedAvatar}
                  source={{ uri: eachName.information.image }}
                />
                <Text style={styles.notTaggedName}>
                  {eachName.information.fulName}
                </Text>
              </View>
            }
          </TouchableOpacity>
        ))}
      </View>
    );
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

      <WhiteSlideBottomUp
        title={"Gắn thẻ thành viên"}
        renderContent={renderContentAddTag}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.tagsInput_container}>
        <RowSectionNavigate
          icon={icons.atSignIcon}
          text={"Gắn thẻ người khác"}
          onPress={() => setModalVisible(true)}
        />
        <View style={styles.tags_container}>
          {listTaggedUsernames.map((eachName, index) => (
            <View key={index} style={styles.eachTag}>
              <View style={styles.tagBox}>
                <Text style={styles.tagBoxText}>
                  {eachName.information.fulName}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                }}
                onPress={() => handleRemoveTagFromList(eachName, index)}
              >
                <Icon
                  name={icons.cancelCircleIcon}
                  size={20}
                  color={colors.RedLightBackground}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

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
            <Image source={{ uri: eachImage.uri }} style={styles.image} />
            {listSelectedImage.length == 0 ? (
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
          onPress={() => handleSelectImage()}
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
    marginVertical: 30,
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
  //
  tagsInput_container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.transparentWhite,
  },
  tags_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  eachTag: {
    marginBottom: 5,
    marginHorizontal: 1,
    paddingBottom: 7,
    paddingRight: 17,
  },
  tagBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.GrayObjects,
  },
  tagBoxText: {
    color: colors.GrayOnContainerAndFixed,
    textAlign: "center",
    fontSize: fontSizes.h7,
  },
  //
  notTagName_temp: {
    width: 350,
    height: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.transparentWhite,
  },
  //
  notTaggedContainer: {
    flexDirection: "row",
    width: 375,
    height: 55,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.GrayContainer,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  notTaggedAvatar: {
    width: 35,
    height: 35,
    resizeMode: "cover",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.PrimaryBackground,
  },
  notTaggedName: {
    paddingHorizontal: 10,
    fontSize: fontSizes.h5,
    fontWeight: "bold",
    fontStyle: "italic",
    color: colors.GrayOnContainerAndFixed,
  },
});
