import React, { useState, useEffect } from "react";
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

function TabDiscussion(props) {
  //list of example = state
  const [topics, setTopics] = useState([
    {
      ID: "01",
      name: "Cách để bay lên",
    },
    {
      ID: "02",
      name: "Chong chóng tre nè nobita",
    },
    {
      ID: "03",
      name: "Hello world",
    },
    {
      ID: "04",
      name: "Nơi lữu trữ các câu hỏi đáp cũ",
    },
    {
      ID: "05",
      name: "Xét tuyển vào ngày",
    },
    {
      ID: "06",
      name: "Công nghệ thông tin",
    },
    {
      ID: "07",
      name: "Trường nào để học?",
    },
    {
      ID: "08",
      name: "Sơ yếu lí lịch vậy ạ",
    },
    {
      ID: "09",
      name: "Ở đâu trên tramg web vậy?",
    },
  ]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchBarAndButtonView}>
        <View /* Search bar */ style={styles.searchBarView}>
          <TextInput
            autoCorrect={false}
            inputMode="search"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={styles.searchBarTypingArea}
          />
          <Image source={images.searchIcon} style={styles.searchBarImage} />
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={{
              paddingHorizontal: 11,
              fontSize: fontSizes.h7,
              fontWeight: "bold",
            }}
          >
            {"Tạo bài đăng"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {topics
          .filter((eachTopic) =>
            eachTopic.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachTopic) => (
            <TabDiscussionItems
              topic={eachTopic}
              key={eachTopic.ID}
              /* onPress={() => {
                  navigate("MessengerGroup", { user: eachTopic });
                }} */
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
  searchBarAndButtonView: {
    height: "11%",
    flexDirection: "row",
  },
  searchBarView: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  searchBarTypingArea: {
    backgroundColor: colors.inactive,
    height: "75%",
    flex: 1,
    borderRadius: 90,
    paddingStart: 45,
  },
  searchBarImage: {
    width: "8%",
    height: "40%",
    position: "absolute",
    top: "30%",
    left: 8,
  },
  buttonContainer: {
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,

    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,

    backgroundColor: "lightblue",

    justifyContent: "center",
    alignItems: "flex-end",
  },
  listContainer: {
    flex: 1,
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
  },
});
