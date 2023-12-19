import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import TabNotificationItems from "./TabNotificationItems";

function TabNotification(props) {
  const [notifications, setNotifications] = useState([
    {
      ID: "01",
      title: "Thông báo 1111111111111111111111111111111",
      content: "You're sitting beneath an ancient tree whose trunk is so wide you cannot reach around it. The sun is hot on your skin, and you can hear the sounds of the birds in the foliage over your head. This is the place you like to come to be on your own and connect with the land around you. It makes you feel closer to your ancestors, which is essential for a Karadji shaman such as yourself.",
    },
    {
      ID: "02",
      title: "Thông báo 2",
      content: "Suddenly, you hear the cries of your people, and you jump to your feet to see them gathering along the shore, thrusting their spears in the air. You race to the top of the sand dune and see what looks like a strange, white cloud drifting across the water toward the shore. You walk across the sand, and your people part to let you through. They're looking to you to know what to do.",
    },
    {
      ID: "03",
      title: "Thông báo 3",
      content: "As the white cloud nears, you see that it's something else entirely: a vessel of some sort bringing a group of strange looking men to your shores. You close your eyes, focus your mind, and try to perceive the future. When the vision strikes you, you fall to your knees. These men will bring sickness and destruction to your land. They will label you and your kind Aboriginal Australians and will subjugate your people for generations. You now know what you must do.",
    },
    {
      ID: "04",
      title: "Thông báo 4",
      content: "",
    },
    {
      ID: "05",
      title: "Thông báo 5",
      content: "",
    },
    {
      ID: "06",
      title: "Thông báo 6",
      content: "",
    },
    {
      ID: "07",
      title: "Thông báo 12",
      content: "",
    },
    {
      ID: "08",
      title: "Thông báo 23",
      content: "",
    },
    {
      ID: "09",
      title: "Thông báo 24",
      content: "",
    },
    {
      ID: "10",
      title: "Thông báo 45",
      content: "",
    },
    {
      ID: "11",
      title: "Thông báo 761",
      content: "",
    },
    {
      ID: "12",
      title: "Thông báo 92",
      content: "",
    },
    {
      ID: "13",
      title: "Thông báo 233",
      content: "",
    },
    {
      ID: "14",
      title: "Thông báo 7654",
      content: "",
    },
    {
      ID: "15",
      title: "Thông báo 15",
      content: "",
    },
    {
      ID: "16",
      title: "Thông báo 41",
      content: "",
    },
    {
      ID: "17",
      title: "Thông báo 32",
      content: "",
    },
    {
      ID: "18",
      title: "Thông báo 36",
      content: "",
    },
    {
      ID: "19",
      title: "Thông báo 1234",
      content: "",
    },
    {
      ID: "20",
      title: "Thông báo 435",
      content: "",
    },
  ]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
    <View style={styles.searchBarAndButtonView}>
        <View /* Search bar */ style={styles.searchBarView}>
          <Image source={images.searchIcon} style={styles.searchBarImage} />
          <TextInput
            autoCorrect={false}
            inputMode="search"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={styles.searchBarTypingArea}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigate("CreateNotification");
          }}
        >
          <Text style={styles.buttonText}>{"Tạo thông báo"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {notifications
          .filter((eachNotification) =>
            eachNotification.title
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachNotification) => (
            <TabNotificationItems
              notification={eachNotification}
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
export default TabNotification;

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
    height: "65%",
    marginHorizontal: 10,
    marginTop: 10,    
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 90,    
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  searchBarTypingArea: {
    height: "75%",
    flex: 1,
    marginRight: 10,
  },
  searchBarImage: {
    width: 22,
    height: 22,
    resizeMode: "stretch",
    marginHorizontal: 8,
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
  },
});
