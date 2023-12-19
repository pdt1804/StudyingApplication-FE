import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import NotificationItems from "./NotificationItems";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";

function AllNotification(props) {
  const [notifications, setNotifications] = useState([
    {
      ID: "01",
      title: "Thông báo update 1/12",
      type: "hệ thống",
      status: 'chưa đọc',
      content: "You're sitting beneath an ancient tree whose trunk is so wide you cannot reach around it. The sun is hot on your skin, and you can hear the sounds of the birds in the foliage over your head. This is the place you like to come to be on your own and connect with the land around you. It makes you feel closer to your ancestors, which is essential for a Karadji shaman such as yourself.",
    },
    {
      ID: "02",
      title: "Thông báo update 8/3",
      type: "hệ thống",
      status: 'chưa đọc',
      content: "Suddenly, you hear the cries of your people, and you jump to your feet to see them gathering along the shore, thrusting their spears in the air. You race to the top of the sand dune and see what looks like a strange, white cloud drifting across the water toward the shore. You walk across the sand, and your people part to let you through. They're looking to you to know what to do.",
    },
    {
      ID: "03",
      title: "Thông báo Tuyển thành viên",
      type: "người dùng",
      status: 'chưa đọc',
      content: "As the white cloud nears, you see that it's something else entirely: a vessel of some sort bringing a group of strange looking men to your shores. You close your eyes, focus your mind, and try to perceive the future. When the vision strikes you, you fall to your knees. These men will bring sickness and destruction to your land. They will label you and your kind Aboriginal Australians and will subjugate your people for generations. You now know what you must do.",
    },
    {
      ID: "04",
      title: "Thông báo bảo trì",
      type: "hệ thống",
      status: 'đã đọc',
      content: "",
    },
    {
      ID: "05",
      title: "Thông báo Nghỉ học",
      type: "người dùng",
      status: 'đã đọc',
      content: "",
    },
  ]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader title={"Thông báo"} />

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

      <ScrollView>
        {notifications
          .filter((eachNotification) =>
            eachNotification.title
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachNotification) => (
            <NotificationItems
              group={eachNotification}
              key={eachNotification.ID}
              onPress={() => {
                Alert.alert(eachNotification.title, eachNotification.content, [
                  {
                    text: 'Đóng thông báo',
                    onPress: () => console.log('Đóng thông báo pressed'),
                  },
                ]);
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default AllNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
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
    marginBottom: 10,
    alignSelf: "center",
  },
});
