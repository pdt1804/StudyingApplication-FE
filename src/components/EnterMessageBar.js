import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
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
import axios from "axios";
import { API_BASE_URL } from "../api/DomainAPI";
import {
  blog_insertImageInComment,
  blog_insertImageInReply,
} from "../api/ReNewStyle/blogController";

export default EnterMessageBar = (props) => {
  //use for friend-MessageBar
  const { friendUsername, friendID } = props;
  const { commentID } = props;
  const { blogID } = props;
  //use for all
  //actionType: friend (0) - group (1) - comment (2) - reply (3) - chatbot (4)
  const { stompClient, actionType } = props;

  const [typedText, setTypedText] = useState("");
  const [userNames, setUserNames] = useState([]);

  const MAXHeight = 45;
  const [listSelectedImage, setListSelectedImage] = useState([]);
  const [listMembersNotTagged, setListMembersNotTagged] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responses = await axios.get(
        API_BASE_URL +
          "/api/v1/groupStudying/getAllUserInGroup?groupID=" +
          (await AsyncStorage.getItem("groupID")),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );
      setListMembersNotTagged(responses.data);
      setUserNames(responses.data);
      //console.log(listMembersNotTagged)
    };

    fetchData();
  }, [props.userName]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(listSelectedImage);
    };

    fetchData();
  }, [listSelectedImage]);

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
    if (typedText.length == 0 && listSelectedImage.length === 0) {
      alert("Hãy nhập bình luận hoặc chọn ảnh");
      return;
    }

    const tags = [];
    for (let i = 0; i < listTaggedUsernames.length; i++) {
      tags.push(listTaggedUsernames[i].userName);
    }

    const response = await blog_commentBlog(blogID, typedText, tags);

    if (listSelectedImage.length > 0) {
      for (let i = 0; i < listSelectedImage.length; i++) {
        let img = listSelectedImage[i];
        try {
          blog_insertImageInComment(
            img.uri,
            img.fileName,
            img.mimeType,
            response.data
          );
          //uploadImage(img.uri, img.fileName, img.mimeType, responseData);
        } catch (error) {
          console.log("Lỗi:", error);
        }
      }
    }

    if (response.status != 200) {
      alert("Lỗi mạng, không thể phản hồi bình luận");
    }

    // ADD ảnh
    setTypedText("");
    setListTaggedUsernames([]);
    setListMembersNotTagged(userNames);
    setListSelectedImage([]);
  };

  const handleSendMessage_Reply = async () => {
    if (typedText.length == 0 && listSelectedImage.length === 0) {
      alert("Hãy nhập phản hồi hoặc chọn ảnh");
      return;
    }

    const tags = [];
    for (let i = 0; i < listTaggedUsernames.length; i++) {
      tags.push(listTaggedUsernames[i].userName);
    }

    const response = await blog_replyComment(commentID, typedText, tags);

    console.log(listSelectedImage.length);
    if (listSelectedImage.length > 0) {
      for (let i = 0; i < listSelectedImage.length; i++) {
        let img = listSelectedImage[i];
        try {
          blog_insertImageInReply(
            img.uri,
            img.fileName,
            img.mimeType,
            response.data
          );
          //uploadImage(img.uri, img.fileName, img.mimeType, responseData);
        } catch (error) {
          console.log("Lỗi:", error);
        }
      }
    }
    if (response.status != 200) {
      alert("Lỗi mạng, không thể phản hồi bình luận");
    }
    setTypedText("");
    setListTaggedUsernames([]);
    setListMembersNotTagged(userNames);
    setListSelectedImage([]);
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
      listSelectedImage.length == 0
        ? setListSelectedImage([result.assets[0]])
        : setListSelectedImage([...listSelectedImage, result.assets[0]]);
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
      //setListSelectedImage([]);
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
      //setListSelectedImage([]);
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
              <Text style={styles.notTagName_temp}>
                {eachName.information.fulName}
              </Text>
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
        </View>
      ) : (
        <View />
      )}

      {listSelectedImage.length === 0 ? (
        <View />
      ) : (
        <ScrollView horizontal={true} style={styles.imgBar}>
          {listSelectedImage.map((eachImg, index) => (
            <Image
              key={index}
              source={{ uri: eachImg.uri }}
              style={[
                styles.image,
                {
                  width:
                    eachImg.height > MAXHeight
                      ? eachImg.width / (eachImg.height / MAXHeight)
                      : eachImg.width,
                  height:
                    eachImg.height > MAXHeight ? MAXHeight : eachImg.height,
                },
              ]}
            />
          ))}
          <View style={styles.blankEndImgBar} />
        </ScrollView>
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
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 100,
  },
  blankEndImgBar: {
    width: 20,
    height: 20,
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
    marginHorizontal: 2,
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
