import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import { Icon } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TabDiscussionItems(props) {
  const { content, comments, likes } = props.topic;
  const { fulName } = props.topic.userCreated.information;
  const { onPress } = props;

  const [username, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setUserName(await AsyncStorage.getItem("username"));
    };
    fetchData();
  }, [props.userName, username]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.leftSideTopView}>
          <Icon
            name={icons.activeChatMessageIcon}
            size={30}
            color={colors.PrimaryBackground}
          />
          <Text style={styles.text}>{fulName}</Text>
        </View>
        <View style={styles.rightSideView}>
          <Text style={styles.rightSideText}>
            Số lượt tương tác: {likes.length}
          </Text>
          <Text style={styles.rightSideText}>bình luận: {comments.length}</Text>
        </View>
      </View>
      <Text style={styles.content} numberOfLines={5}>
        Nội dung: {content}
      </Text>
    </TouchableOpacity>
  );
}
export default TabDiscussionItems;

const styles = StyleSheet.create({
  container: {
    height: 160,
    margin: 10,
    paddingTop: 15,
    paddingStart: 10,
    flexDirection: "column",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: colors.ShadowedItems,
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSideTopView: { flexDirection: "row" },
  text: {
    marginTop: 5,
    marginLeft: 5,
    color: "black",
    fontSize: fontSizes.h5,
  },
  content: {
    marginLeft: 7,
    marginRight: 10,
    color: "black",
    fontSize: fontSizes.h7,
  },
  rightSideView: {
    flexDirection: "column",
  },
  rightSideText: {
    width: 120,
    padding: 10,
    paddingLeft: 0,
    color: "black",
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "right",
    color: colors.active,
    marginTop: -15,
  },
});
