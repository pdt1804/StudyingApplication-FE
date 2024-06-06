import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import {
  messageuser_getSentUser,
  messagegroup_getSentUserInGroup,
  information_ExtractBearerToken as messageuser_checkSender,
} from "../api";

import { LoadingFullScreen } from "./MyLoadingScreen";

export default function MessengerItems(props) {
  const { content, dateSent, id, status } = props.item;
  const files = props.item.files;

  //Dùng kind để phân biệt giữa chat-user và chat-group
  //chat-user: "user" hoặc bỏ trống
  //chat-group: "group"
  const kind = props.kind;
  const user =
    kind === "group" ? props.item.user : { information: { fulName: "" } };
  const navigate = kind === "group" ? props.navigate : null;

  const date = new Date(dateSent);
  const timeSent = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
    date.getMonth() + 1
  }`;

  const blueText =
    kind === "group" ? `${user.information.fulName} | ` + timeSent : timeSent;

  const [isLoading, setIsLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [sender, setSender] = useState("");
  const [sentUsername, setSentUsername] = useState("");

  const MAXWidth = 225;
  const getWidth = (baseWidth) => {
    return baseWidth > MAXWidth ? MAXWidth : baseWidth;
  };
  const getHeight = (baseWidth, baseHeight) => {
    return baseWidth > MAXWidth
      ? baseHeight / (baseWidth / MAXWidth)
      : baseHeight;
  };

  const getContainerStyle = () => {
    return sender == sentUsername
      ? styles.senderContainer
      : styles.notSenderContainer;
  };

  const getContentStyle = () => {
    return sender == sentUsername
      ? styles.senderContent
      : styles.notSenderContent;
  };

  const ShowProfile =
    kind === "group"
      ? async () => {
          navigate("ShowProfile", { userReplied: user });
        }
      : () => alert("Chức năng không khả dụng");

  const fetchData = async () => {
    try {
      const responseData =
        kind === "group"
          ? await messagegroup_getSentUserInGroup(id)
          : await messageuser_getSentUser(id);
      setAvatar(responseData.information.image);
      setSentUsername(responseData.userName);
      //
      const checkSenderResponseData = await messageuser_checkSender();
      setSender(checkSenderResponseData);
      //
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.userName]);

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return content == "" && files.length == 0 ? (
    //Có dòng này để các tin nhắn kiểu ko có text cũng ko có hình sẽ ko hiển thị
    //t check & chỉnh lại rồi, ko bị lỗi như bữa nữa đâu nha
    <View />
  ) : (
    <TouchableOpacity
      style={[styles.container, getContainerStyle()]}
      onPress={ShowProfile}
    >
      <Image style={styles.avatarContainer} source={{ uri: avatar }} />
      <View style={styles.messageContainer}>
        <Text style={[styles.timeSent, getContainerStyle()]}>{blueText}</Text>
        <View style={[styles.content, getContentStyle()]}>
          {content != "" ? (
            <Text style={styles.message}>{content}</Text>
          ) : (
            <View />
          )}
          {files.length > 0 ? (
            files.map((value, index) => (
              <Image
                key={index}
                style={[
                  styles.image,
                  {
                    width: getWidth(value.width),
                    height: getHeight(value.width, value.height),
                    maxWidth: MAXWidth,
                  },
                ]}
                source={{ uri: value.url }}
              />
            ))
          ) : (
            <View />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    minHeight: 90,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    width: 55,
    height: 55,
    resizeMode: "cover",
    borderRadius: 30,
    borderColor: colors.GrayBackground,
    marginTop: 9,
  },
  messageContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  //
  timeSent: {
    marginBottom: 3,
    color: colors.active,
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "flex-end",
    textAlign: "right",
  },
  content: {
    flexDirection: "column",
  },
  message: {
    textAlign: "left",
    color: "black",
    fontSize: fontSizes.h6 * 0.85,
    paddingVertical: 5,
    paddingHorizontal: 9,
    backgroundColor: colors.GrayContainer,
    borderRadius: 10,
  },
  image: {
    resizeMode: "contain",
    marginVertical:3,
    borderRadius: 5,
    //borderWidth: 3,
    //borderColor: colors.PrimaryBackground,
  },
  //
  senderContainer: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    paddingStart: "20%",
  },
  notSenderContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingEnd: "20%",
  },
  senderContent: {
    alignItems: "flex-end",
  },
  notSenderContent: {
    alignItems: "flex-start",
  },
});
