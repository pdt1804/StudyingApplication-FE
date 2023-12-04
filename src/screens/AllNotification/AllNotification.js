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
      <UIHeader
        title={"Thông báo"}
        leftIconName={null}
        rightIconName={null}
        onPressLeftIcon={() => {}}
        onPressRightIcon={() => {}}
      />

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
        {notifications
          .filter((eachNotification) =>
            eachNotification.title.toLowerCase().includes(searchText.toLowerCase())
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
