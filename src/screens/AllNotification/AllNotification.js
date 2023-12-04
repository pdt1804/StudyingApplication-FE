import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
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
      title: "Thông báo hệ thống 1",
      type: "hệ thống",
    },
    {
      ID: "02",
      title: "Thông báo hệ thống 2",
      type: "hệ thống",
    },
    {
      ID: "03",
      title: "Thông báo người dùng 3",
      type: "người dùng",
    },
    {
      ID: "04",
      title: "Thông báo hệ thống 4",
      type: "hệ thống",
    },
    {
      ID: "05",
      title: "Thông báo người dùng 5",
      type: "người dùng",
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
                alert(`You pressed group "${eachNotification.title}"`);
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
    alignSelf: "center",
  },
});
