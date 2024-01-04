import React, { useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import TabDiscussionItems from "./TabDiscussionItems";
import axios from "axios";
import { API_BASE_URL } from "../../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TabDiscussion(props) {
  //list of example = state
  const [topics, setTopics] = useState([]);

  //navigation
  const { navigate, goBack } = props.navigation;

  const [searchText, setSearchText] = useState("");

  //DropdownComponent --> filter type of post
  const [valueDropdown, setValueDropdown] = useState(null);
  const [typeOfPost, setTypeOfPost] = useState(null);
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setUsername(await AsyncStorage.getItem("username").toString());

      const response = await axios.get(
        API_BASE_URL +
          "/api/v1/blog/getAllBlog?groupID=" +
          (await AsyncStorage.getItem("groupID"))
      );

      const responseSubject = await axios.get(
        API_BASE_URL +
          "/api/v1/blog/getAllSubject?groupID=" +
          (await AsyncStorage.getItem("groupID"))
      );

      setTopics(response.data);

    };

    fetchData(); // Gọi fetchData ngay sau khi component được mount

    // Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 3000);

    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);
  }, [props.userName, username]);

  return (
    <View style={styles.container}>
      <View /* Search bar */ style={styles.searchBarView}>
        <TextInput
          style={styles.searchBarTypingArea}
          autoCorrect={false}
          inputMode="search"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          placeholder="Tìm kiếm..."
          placeholderTextColor={colors.inactive}
        />
        <Image source={images.searchIcon} style={styles.searchBarImage} />
      </View>

      <View style={styles.blackLine} />

      <ScrollView style={styles.listContainer}>
        {topics
          .filter((eachTopic) =>
            eachTopic.content.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachTopic) => (
            <TabDiscussionItems
              topic={eachTopic}
              key={eachTopic.blogID}
              onPress={() => {
                navigate("ShowPost", { topic: eachTopic });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default TabDiscussion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  listContainer: {
    flex: 1,
    margin: 7,
  },
  searchBarView: {
    height: "7%",
    paddingHorizontal: 7,
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: colors.transparentWhite,
  },
  searchBarTypingArea: {
    height: "95%",
    flex: 1,
    paddingStart: 45,
  },
  searchBarImage: {
    width: 20,
    height: 20,
    position: "absolute",
    top: "45%",
    left: "6%",
    tintColor: colors.inactive,
  },
  blackLine: {
    backgroundColor: colors.inactive,
    height: 1,
    width: "95%",
    alignSelf: "center",
  },
});
