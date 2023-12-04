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
import { images, colors, icons, fontSizes } from "../../../constants";
import TabNotificationItems from "./TabNotificationItems";

function TabNotification(props) {
  const [notifications, setNotifications] = useState([
    {
      ID: "01",
      title: "Thông báo 1",
    },
    {
      ID: "02",
      title: "Thông báo 2",
    },
    {
      ID: "03",
      title: "Thông báo 3",
    },
    {
      ID: "04",
      title: "Thông báo 4",
    },
    {
      ID: "05",
      title: "Thông báo 5",
    },
    {
      ID: "06",
      title: "Thông báo 1",
    },
    {
      ID: "07",
      title: "Thông báo 2",
    },
    {
      ID: "08",
      title: "Thông báo 3",
    },
    {
      ID: "09",
      title: "Thông báo 4",
    },
    {
      ID: "10",
      title: "Thông báo 5",
    },
    {
      ID: "11",
      title: "Thông báo 1",
    },
    {
      ID: "12",
      title: "Thông báo 2",
    },
    {
      ID: "13",
      title: "Thông báo 3",
    },
    {
      ID: "14",
      title: "Thông báo 4",
    },
    {
      ID: "15",
      title: "Thông báo 5",
    },
    {
      ID: "16",
      title: "Thông báo 1",
    },
    {
      ID: "17",
      title: "Thông báo 2",
    },
    {
      ID: "18",
      title: "Thông báo 3",
    },
    {
      ID: "19",
      title: "Thông báo 4",
    },
    {
      ID: "20",
      title: "Thông báo 5",
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
            {"Tạo thông báo"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {notifications
          .filter((eachNotification) =>
            eachNotification.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachNotification) => (
            <TabNotificationItems
            notification={eachNotification}
              key={eachNotification.ID}
              /* onPress={() => {
            navigate("MessengerGroup", { user: eachNotification });
          }} */
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default TabNotification;

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
