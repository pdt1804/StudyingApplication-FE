import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { icons, colors, fontSizes, images } from "../constants";
import Icon from "./MyIcon";
import { WhiteSlideBottomUp } from "./MyModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  messenger_sendMessageForGroup,
  messageuser_sendMessageForUser,
  messageuser_uploadMultipleImages,
  blog_commentBlog,
  blog_replyComment,
} from "../api";
import * as ImagePicker from "expo-image-picker";
import { messagegroup_uploadMultipleImages } from "../api/ReNewStyle/messageGroupController";

//fake data
const fakeData = ["user001", "user002", "user003", "user004"];

export default EnterMessageBar = (props) => {
  //use for friend-MessageBar
  const { friendUsername, friendID } = props;
  const { commentID } = props;
  const { blogID } = props;
  //use for all
  //actionType: friend (0) - group (1) - comment (2) - reply (3) - chatbot (4)
  const { stompClient, actionType } = props;

  const [typedText, setTypedText] = useState("");
  const [pickedImages, setPickedImages] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const [userNames, setUserNames] = useState([]);

  const MAXHeight = 45;
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const getImageSize = (uri) => {
    Image.getSize(uri, (width, height) => {
      if (height > MAXHeight) {
        setImageWidth(width / (height / MAXHeight));
        setImageHeight(MAXHeight);
      } else {
        setImageWidth(width);
        setImageHeight(height);
      }
    });
  };

  //*************** */
  // message handler
  //*************** */
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

  const handleSendMessage_Comment = async () => {
    if (typedText.length == 0 && pickedImages.length == 0) {
      alert("Hãy nhập bình luận hoặc chọn ảnh");
      return;
    }

    const response = await blog_commentBlog(
      blogID,
      typedText,
      userNames,
      pickedImages,
      name,
      type
    );
    if (response.status != 200) {
      alert("Lỗi mạng, không thể phản hồi bình luận");
    }
    setTypedText("");
    setPickedImages("");
    setType("");
    setName("");
  };

  const handleSendMessage_Reply = async () => {
    if (typedText.length == 0 && pickedImages.length == 0) {
      alert("Hãy nhập phản hồi hoặc chọn ảnh");
      return;
    }
    const response = await blog_replyComment(
      commentID,
      typedText,
      userNames,
      pickedImages,
      name,
      type
    );
    if (response.status != 200) {
      alert("Lỗi mạng, không thể phản hồi bình luận");
    }
    setTypedText("");
    setPickedImages("");
    setType("");
    setName("");
  };

  const handleSendMessage_Chatbot = async () => {
    if (typedText.length == 0) {
      alert("Hãy nhập tin nhắn");
      return;
    }
    /* const response = await messageuser_sendMessageForUser(
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
    } */
    setTypedText("");
  };

  //final handleVerification
  const handleSendMessage = async () => {
    if (actionType === 0 || actionType === "friend") {
      handleSendMessage_Friend();
    } else if (actionType === 1 || actionType === "group") {
      handleSendMessage_Group();
    } else if (actionType === 2 || actionType === "comment") {
      handleSendMessage_Comment();
    } else if (actionType === 3 || actionType === "reply") {
      handleSendMessage_Reply();
    } else if (actionType === 4 || actionType === "chatbot") {
      handleSendMessage_Chatbot();
    }
  };

  //*************** */
  //image picker
  //*************** */
  const handleSelectImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setPickedImages(result.assets[0].uri.toString());
      getImageSize(result.assets[0].uri.toString());
      setType(result.assets[0].mimeType.toString());
      setName(result.assets[0].fileName.toString());
      return result.assets[0];
    }
  };

  const handleUploadImagesForFriend = async () => {
    try {
      const file = await handleSelectImages();
      const response = await messageuser_uploadMultipleImages(
        friendUsername,
        file.uri,
        file.fileName,
        file.mimeType
      );

      //alert("2")
      const messagePayload = { groupID: friendID };
      stompClient.send(
        "/app/sendMessForUser",
        {},
        JSON.stringify(messagePayload)
      );

      //alert("3")
      setPickedImages([]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUploadImagesForGroup = async () => {
    try {
      const file = await handleSelectImages();
      const response = await messagegroup_uploadMultipleImages(
        await AsyncStorage.getItem("groupID"),
        file.uri,
        file.fileName,
        file.mimeType
      );

      //alert("2")
      const messagePayload = {
        groupID: parseInt(await AsyncStorage.getItem("groupID")),
      };
      stompClient.send("/app/sendMess", {}, JSON.stringify(messagePayload));

      //alert("3")
      setPickedImages([]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUploadImages = async () => {
    if (actionType === 0 || actionType === "friend") {
      handleUploadImagesForFriend();
    } else if (actionType === 1 || actionType === "group") {
      handleUploadImagesForGroup();
    } else if (actionType === 2 || actionType === "comment") {
      handleSelectImages();
    } else if (actionType === 3 || actionType === "reply") {
      handleSelectImages();
    } else if (actionType === 4 || actionType === "chatbot") {
      handleSendMessage_Chatbot();
    }
  };

  //*************** */
  //  tag members
  //*************** */
  const [modalVisible, setModalVisible] = useState(false);
  const [listTaggedUsernames, setListTaggedUsernames] = useState([]);
  const [listMembersNotTagged, setListMembersNotTagged] = useState(fakeData);

  const isTagAble =
    actionType === 2 ||
    actionType === "comment" ||
    actionType === 3 ||
    actionType === "reply";

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
              //đoạn này là hiển thị tên/icon/avatar các kiểu nè
              // t để tạm cái text ở đây, m ném vô username là được rồi
              // Khi gọi api lên mà có thêm đầy đủ avatar, thông tin cá nhân các kiểu thì t chỉnh sửa lại sau.
              <Text style={styles.notTagName_temp}>{eachName}</Text>
            }
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleTagMembers = async () => {
    isTagAble ? setModalVisible(true) : alert("Chức năng không khả dụng");
  };

  return (
    <View style={styles.container}>
      {isTagAble ? (
        <View>
          <WhiteSlideBottomUp
            title={"Gắn thẻ thành viên"}
            renderContent={renderContentAddTag}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />

          <View style={styles.tagsInput_container}>
            <View style={styles.tags_container}>
              {listTaggedUsernames.map((eachName, index) => (
                <View key={index} style={styles.eachTag}>
                  <View style={styles.tagBox}>
                    <Text style={styles.tagBoxText}>{eachName}</Text>
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
        </View>
      ) : (
        <View />
      )}

      {pickedImages === "" ? (
        <View />
      ) : (
        <View style={styles.imgBar}>
          <Image
            source={{ uri: pickedImages }}
            style={[styles.image, { width: imageWidth, height: imageHeight }]}
          />
        </View>
      )}
      <View style={styles.mainBar}>
        <View style={styles.tools_container}>
          <TouchableOpacity onPress={handleUploadImages}>
            <Icon
              name={icons.priceTagIcon}
              size={25}
              color={colors.PrimaryBackground}
            />
          </TouchableOpacity>
          {isTagAble ? (
            <TouchableOpacity onPress={handleTagMembers}>
              <Icon
                name={icons.atSignIcon}
                size={25}
                color={colors.PrimaryBackground}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.transparentWhite,
  },
  imgBar: {
    flexDirection: "row",
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  mainBar: {
    height: "auto",
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  textInput: {
    flex: 1,
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
  image: {
    resizeMode: "contain",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.GrayBackground,
  },
  //
  tools_container: {
    flexDirection: "row",
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
});
