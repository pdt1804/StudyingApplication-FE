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
import { Dropdown } from "react-native-element-dropdown";
import { images, colors, icons, fontSizes } from "../../../constants";
import TabDiscussionItems from "./TabDiscussionItems";
import axios from "axios";
import { API_BASE_URL } from "../../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const typePost = [
  { label: "Tất cả", value: "0" },
  { label: "Tin tức", value: "1" },
  { label: "Hỏi đáp", value: "2" },
  { label: "Đánh giá", value: "3" },
  { label: "Thảo Luận", value: "4" },
];

function TabDiscussion(props) {
  //list of example = state
  const [topics, setTopics] = useState([]);

  const getFilteredTopics = useMemo(() => {
    if (!typeOfPost || typeOfPost === "Tất cả") {
      return topics;
    }
    return topics.filter((eachTopic) => eachTopic.type === typeOfPost);
  }, [typeOfPost]);

  //navigation
  const { navigate, goBack } = props.navigation;

  //DropdownComponent --> filter type of post
  const [valueDropdown, setValueDropdown] = useState(null);
  const [typeOfPost, setTypeOfPost] = useState(null);
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);

  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
     
        setUsername(await AsyncStorage.getItem('username').toString())

        const response = await axios.get(API_BASE_URL + "/api/v1/blog/getAllBlog?groupID=" + await AsyncStorage.getItem('groupID'));
  
        const responseSubject = await axios.get(API_BASE_URL + "/api/v1/blog/getAllSubject?groupID=" + await AsyncStorage.getItem('groupID'))
        
        setTopics(response.data);
    };
  
    fetchData(); // Gọi fetchData ngay sau khi component được mount
  
    // Sử dụng setInterval để gọi lại fetchData mỗi giây
       const intervalId = setInterval(fetchData, 3000);
    
      // // Hủy interval khi component bị unmounted
       return () => clearInterval(intervalId);
    }, [props.userName, username])

  return (
    <View style={styles.container}>
      <View style={styles.searchBarAndButtonView}>
        <View /* Filter bar */ style={styles.searchBarView}>
          <Dropdown
            style={[
              styles.dropdown,
              isFocusDropdown && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={typePost}
            //search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocusDropdown ? "Chuyên mục" : "..."}
            value={valueDropdown}
            onFocus={() => setIsFocusDropdown(true)}
            onBlur={() => setIsFocusDropdown(false)}
            onChange={(item) => {
              setValueDropdown(item.value);
              setTypeOfPost(item.label);
              setIsFocusDropdown(false);
            }}
            renderLeftIcon={() => (
              <Image
                source={images.searchIcon}
                style={styles.icon}
                color={isFocusDropdown ? "blue" : "black"}
                name="Safety"
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigate("CreatePost");
          }}
        >
          <Text style={styles.buttonText}>{"Tạo bài đăng"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {typeOfPost == "Tất cả" || typeOfPost == null
          ? topics.map((eachTopic) => (
              <TabDiscussionItems
                topic={eachTopic}
                key={eachTopic.blogID}
                onPress={() => {
                  navigate("ShowPost", { topic: eachTopic });
                }}
              />
            ))
          : topics
              .filter((eachTopic) => eachTopic.type == typeOfPost)
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
  searchBarAndButtonView: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarView: {
    width: "50%",
    height: "85%",
    marginHorizontal: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    width: "auto",
    height: "65%",

    marginRight: 10,
    marginTop: 12,

    borderRadius: 20,

    backgroundColor: colors.active,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    paddingHorizontal: 11,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    margin: 7,
  },
  dropdown: {
    flex: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: colors.backgroundWhite,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
