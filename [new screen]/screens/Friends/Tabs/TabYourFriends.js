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
import TabYourFriendsItems from "./TabYourFriendsItems";
import { images, colors, fontSizes } from "../../../constants";

function TabYourFriends(props) {
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
  ]);

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TabYourFriendsItems
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
export default TabYourFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
});
