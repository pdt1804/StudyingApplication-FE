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
import FriendItems from "./FriendItems";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";

function Friends(props) {
  //list of group example = state
  const [groups, setGroups] = useState([
    {
      ID: "01",
      name: "Tom",
      imageUrl: "https://i.pravatar.cc/1000",
    },
    {
      ID: "02",
      name: "Jerry",
      imageUrl: "https://i.pravatar.cc/1001",
    },
    {
      ID: "03",
      name: "Edison",
      imageUrl: "https://i.pravatar.cc/1002",
    },
    {
      ID: "04",
      name: "Anh So Tanh",
      imageUrl: "https://i.pravatar.cc/1003",
    },
    {
      ID: "05",
      name: "My dog",
      imageUrl: "https://i.pravatar.cc/1004",
    },
  ]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader title={"Bạn bè"} />

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
            <FriendItems
              group={eachGroup}
              key={eachGroup.ID}
              onPress={() => {
                navigate("Messenger", { user: eachGroup });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default Friends;

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
