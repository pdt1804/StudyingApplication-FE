import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { Icon } from "../../../components";
import { randomGenerateColor } from "../../../utilities";
import { groupStudying_joinInGroup } from "../../../api";

export default function TabFindByTopicsItems(props) {
  let { nameGroup, imageGroup, groupID, passWord, topics } = props.group;
  const { onPress } = props;

  const [isJoined, setIsJoined] = useState(false);
  const [topicNames, setTopicNames] = useState(
    topics.map((item) => item.topicName)
  );

  /*   const showTextInputAlert = () => {
    Alert.prompt(
      "Xác thực mật khẩu",
      "Nhập mật khẩu nhóm:",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async (text) => {
            if (text === passWord) {
              const response = await axios.post(
                API_BASE_URL +
                  "/api/v1/groupStudying/joinInGroup?groupID=" +
                  groupID,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization:
                      "Bearer " + (await AsyncStorage.getItem("username")),
                  },
                }
              );
              if (response.status === 200) {
                setNameTask("Đã tham gia");
              }
            } else {
              alert("Nhập sai mật khẩu nhóm");
            }
          },
        },
      ],
      "plain-text",
      "",
      "default"
    );
  }; */

  const handleJoinGroup = async () => {
    if (isJoined) {
      alert("Bạn đã tham gia nhóm này rồi");
    } else {
      if (passWord == "") {
        const response = await groupStudying_joinInGroup(groupID);
        if (response.status == 200) {
          setIsJoined(true);
        }
      } else {
        alert("nhập mật khẩu");
        //showTextInputAlert();
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon
        name={{
          uri: imageGroup,
        }}
        size={55}
        color={null}
        style={[styles.avatarImage, { borderColor: randomGenerateColor() }]}
      />
      <View style={{ width: isJoined ? "40%" : "46%" }}>
        <Text numberOfLines={1} style={styles.textNameGroup}>
          {nameGroup}
        </Text>
        {isJoined ? (
          <View />
        ) : (
          <View style={styles.topics_container}>
            {topicNames.map((topicName, index) => (
              <View style={styles.eachTopicBox} key={index}>
                <Text style={styles.eachTopicBoxText}>{topicName}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={handleJoinGroup}
        style={[
          styles.buttons,
          isJoined ? { backgroundColor: colors.GrayContainer } : null,
        ]}
      >
        <Text
          style={[
            styles.buttonsText,
            isJoined ? { color: colors.SecondaryOnContainerAndFixed } : null,
          ]}
        >
          {isJoined ? "Đã tham gia" : "Tham gia"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "95%",
    minHeight: 65,
    paddingRight: 5,
    marginVertical: 2,
    alignSelf: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: colors.inactive,
    alignItems: "center",
  },
  avatarImage: {
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 3,
  },
  textNameGroup: {
    justifyContent: "flex-start",
    color: colors.PrimaryOnContainerAndFixed,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
  //
  buttons: {
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: colors.SecondaryBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsText: {
    padding: 5,
    fontSize: fontSizes.h5,
    fontWeight: "bold",
    color: colors.SecondaryObjects,
  },
  //topics
  topics_container: {
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  eachTopicBox: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 5,
    marginHorizontal: 3,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.GrayObjects,
  },
  eachTopicBoxText: {
    color: colors.GrayOnContainerAndFixed,
    textAlign: "center",
    fontSize: fontSizes.h8 * 0.8,
  },
});
