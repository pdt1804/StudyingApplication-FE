import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import { SearchBarTransparent } from "../../../components";
import TabDiscussionItems from "./TabDiscussionItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { group_getAllBlog } from "../../../api";

export default function TabDiscussion(props) {
  const [topics, setTopics] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");

  //navigation
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      setUsername(AsyncStorage.getItem("username").toString());

      const responseBlog = await group_getAllBlog();
      setTopics(responseBlog.data);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000);
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
