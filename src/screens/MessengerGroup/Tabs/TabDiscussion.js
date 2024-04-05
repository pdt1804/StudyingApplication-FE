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
import { SearchBarTransparent } from "../../../components";
import TabDiscussionItems from "./TabDiscussionItems";
import axios from "axios";
import { API_BASE_URL } from "../../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TabDiscussion(props) {
  const [topics, setTopics] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");

  //navigation
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      setUsername(AsyncStorage.getItem("username").toString());

      const response = await axios.get(
        API_BASE_URL +
          "/api/v1/blog/getAllBlog?groupID=" +
          (await AsyncStorage.getItem("groupID")),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      const responseSubject = await axios.get(
        API_BASE_URL +
          "/api/v1/blog/getAllSubject?groupID=" +
          (await AsyncStorage.getItem("groupID")),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
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

    <SearchBarTransparent
      searchBarOnChangeText={(text) => {
        setSearchText(text);
      }}
    />

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
});
