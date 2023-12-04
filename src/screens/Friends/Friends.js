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
    {
      ID: "06",
      name: "Tom",
      imageUrl: "https://i.pravatar.cc/1005",
    },
    {
      ID: "07",
      name: "Jerry",
      imageUrl: "https://i.pravatar.cc/1006",
    },
    {
      ID: "08",
      name: "Edison",
      imageUrl: "https://i.pravatar.cc/1007",
    },
    {
      ID: "09",
      name: "Anh So Tanh",
      imageUrl: "https://i.pravatar.cc/1008",
    },
    {
      ID: "10",
      name: "My dog",
      imageUrl: "https://i.pravatar.cc/1009",
    },
    {
      ID: "11",
      name: "Tom",
      imageUrl: "https://i.pravatar.cc/1010",
    },
    {
      ID: "12",
      name: "Jerry",
      imageUrl: "https://i.pravatar.cc/1011",
    },
    {
      ID: "13",
      name: "Edison",
      imageUrl: "https://i.pravatar.cc/1012",
    },
    {
      ID: "14",
      name: "Anh So Tanh",
      imageUrl: "https://i.pravatar.cc/1013",
    },
    {
      ID: "15",
      name: "My dog",
      imageUrl: "https://i.pravatar.cc/1014",
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

      <FlatList
        data={groups.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        numColumns={3}
        renderItem={({ item, index }) => (
          <FriendItems
            friend={item}
            key={item.ID}
            onPress={() => {
              navigate("Messenger", { user: item });
            }}
          />
        )}
      />
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
