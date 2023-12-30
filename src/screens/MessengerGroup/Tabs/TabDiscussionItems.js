import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { images, colors, icons, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../DomainAPI";

function TabDiscussionItems(props) {
  let { blogID, content, dateCreated, comments, likes } = props.topic;
  let { userName } = props.topic.userCreated;
  let { fulName } = props.topic.userCreated.information;

  //alert(fulName);

  const { onPress } = props;

  const [username, setUserName] = useState("");
  const date = new Date(dateCreated);

  const [blog, setBlog] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setUserName(await AsyncStorage.getItem("username"));
      //const response = await axios.get(API_BASE_URL + "/api/v1/blog/getBlogById?blogID=" + blogID);

      //setNotifications(response.data);
      //console.log(response.data)
    };

    fetchData(); // Gọi fetchData ngay sau khi component được mount

    // Sử dụng setInterval để gọi lại fetchData mỗi giây
    //
  }, [props.userName, username]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.leftSideTopView}>
          <Image source={images.activeChatMessageIcon} style={styles.icon} />
          <Text style={styles.text}>{fulName}</Text>
        </View>
        <View style={styles.rightSideView}>
        <Text style={styles.rightSideText}>Số lượt tương tác: {likes.length}</Text>
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
  icon: {
    width: 30,
    height: 30,
    margin: 5,
    resizeMode: "stretch",
    tintColor: colors.PrimaryBackground,
  },
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
    flexDirection:'column',
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
