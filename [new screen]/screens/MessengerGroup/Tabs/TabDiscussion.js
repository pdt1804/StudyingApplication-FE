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

const typePost = [
  { label: "Tất cả", value: "0" },
  { label: "Tin tức", value: "1" },
  { label: "Hỏi đáp", value: "2" },
  { label: "Đánh giá", value: "3" },
  { label: "Thảo Luận", value: "4" },
];

function TabDiscussion(props) {
  //list of example = state
  const [topics, setTopics] = useState([
    {
      ID: "01",
      type: "Tin tức",
      content: `J2EE là một nền tảng phát triển ứng dụng web và doanh nghiệp được phát triển bởi Oracle. Nền tảng này đã được sử dụng rộng rãi trong nhiều năm qua và vẫn là một lựa chọn phổ biến cho các nhà phát triển ứng dụng doanh nghiệp.

        Trong tương lai gần, J2EE dự kiến sẽ tiếp tục phát triển theo các xu hướng sau:
        
        Tăng cường tích hợp với các công nghệ mới: J2EE đang tích hợp ngày càng sâu với các công nghệ mới như đám mây, trí tuệ nhân tạo (AI), và máy học (ML). Điều này sẽ giúp các nhà phát triển xây dựng các ứng dụng doanh nghiệp hiện đại và có khả năng mở rộng hơn.
        Tập trung vào trải nghiệm người dùng: J2EE đang tập trung vào việc cải thiện trải nghiệm người dùng (UX) của các ứng dụng doanh nghiệp. Điều này bao gồm việc sử dụng các công nghệ mới như HTML5, CSS3, và JavaScript.
        Tăng cường bảo mật: Bảo mật là một vấn đề quan trọng đối với các ứng dụng doanh nghiệp. J2EE đang tích hợp các tính năng bảo mật mới để giúp các nhà phát triển xây dựng các ứng dụng an toàn hơn.`,
    },
    {
      ID: "02",
      type: "Thảo Luận",
      content: "Chong chóng tre nè nobita",
    },
    {
      ID: "03",
      type: "Hỏi đáp",
      content: "Hello world",
    },
    {
      ID: "04",
      type: "Đánh giá",
      content: "Nơi lữu trữ các câu hỏi đáp cũ",
    },
    {
      ID: "05",
      type: "Thảo Luận",
      content: "Xét tuyển vào ngày",
    },
    {
      ID: "06",
      type: "Thảo Luận",
      content: "Công nghệ thông tin",
    },
    {
      ID: "07",
      type: "Hỏi đáp",
      content: "Trường nào để học?",
    },
    {
      type: "Tin tức",
      ID: "08",
      content: "Sơ yếu lí lịch vậy ạ",
    },
    {
      ID: "09",
      type: "Thảo Luận",
      content: "Ở đâu trên tramg web vậy?",
    },
    {
      ID: "10",
      type: "Đánh giá",
      content: "Còn gì nữa đâu mà khóc với sầu",
    },
  ]);

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
                key={eachTopic.ID}
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
                  key={eachTopic.ID}
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
