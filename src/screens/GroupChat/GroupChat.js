import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import GroupChatItems from "./GroupChatItems";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";

function GroupChat(props) {
  //list of group example = state
  const [groups, setGroups] = useState([
    {
      ID: "01",
      name: "Tự học bất cứ điều gì",
      imageUrl: "https://i.pravatar.cc/100",
      newestMessage: "Mình trả 20,000 Euro để học kỹ năng này",
      status: "Online",
    },
    {
      ID: "02",
      name: "Kỹ năng Lu3",
      imageUrl: "https://i.pravatar.cc/200",
      newestMessage:
        "Has never heard lofi music that is so round and huge and white.",
      status: "Offline",
    },
    {
      ID: "03",
      name: "Tóm tắt video",
      imageUrl: "https://i.pravatar.cc/300",
      newestMessage: "Came for the image stayed for the vibes",
      status: "Offline",
    },
    {
      ID: "04",
      name: "Tokyo Lofi Healing",
      imageUrl: "https://i.pravatar.cc/400",
      newestMessage: "Enjoy Moment",
      status: "Online",
    },
    {
      ID: "05",
      name: "Xung đột Israel đánh nta trước .nta đánh lại thì lại kêu",
      imageUrl: "https://i.pravatar.cc/500",
      newestMessage:
        "Hamas ở Dải Gaza nguy cơ lan rộng toàn khu vực, ai có thể tháo ngòi nổ? THVN",
      status: "Offline",
    },
    {
      ID: "06",
      name: "Tư Duy Ngược",
      imageUrl: "https://i.pravatar.cc/301",
      newestMessage: "Không sao nhãng",
      status: "Offline",
    },
    {
      ID: "07",
      name: "Cách Tôi Làm Việc",
      imageUrl: "https://i.pravatar.cc/302",
      newestMessage: "8-12 Tiếng Một Ngày",
      status: "Offline",
    },
    {
      ID: "08",
      name: "Statistical Thinking",
      imageUrl: "https://i.pravatar.cc/303",
      newestMessage: " Kỹ Năng Cần Thiết Cho Thời Đại Big Data",
      status: "Offline",
    },
    {
      ID: "09",
      name: "Speak English",
      imageUrl: "https://i.pravatar.cc/304",
      newestMessage: "all day in Vietnam",
      status: "Offline",
    },
    {
      ID: "10",
      name: "Vô văn hóa",
      imageUrl: "https://i.pravatar.cc/305",
      newestMessage: "Trang xạo",
      status: "Offline",
    },
    {
      ID: "11",
      name: "Wa???Wa???",
      imageUrl: "https://i.pravatar.cc/306",
      newestMessage: "Kho cho nguoi dan thuong qua",
      status: "Offline",
    },
  ]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader title={"Nhóm học tập"} />

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

      <View style={styles.blackLine} />

      <ScrollView>
        {groups
          .filter((eachGroup) =>
            eachGroup.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachGroup) => (
            <GroupChatItems
              group={eachGroup}
              key={eachGroup.ID}
              onPress={() => {
                navigate("MessengerGroup", { user: eachGroup });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default GroupChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  searchBarView: {
    height: "10%",
    marginHorizontal: 15,
    flexDirection: "row",
    paddingTop: 10,
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
  blackLine: { backgroundColor: "black", height: 1 },
});
