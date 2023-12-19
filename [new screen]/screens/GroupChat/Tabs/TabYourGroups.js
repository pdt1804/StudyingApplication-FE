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
import TabYourGroupsItems from "./TabYourGroupsItems";
import { images, colors, fontSizes } from "../../../constants";

function TabYourGroups(props) {
  //list of group example = state
  const [groups, setGroups] = useState([
    {
      ID: "01",
      name: "Tự học bất cứ điều gì",
      imageUrl: "https://i.pravatar.cc/100",
    },
    {
      ID: "02",
      name: "Kỹ năng Lu3",
      imageUrl: "https://i.pravatar.cc/200",
    },
    {
      ID: "03",
      name: "Tóm tắt video",
      imageUrl: "https://i.pravatar.cc/300",
    },
    {
      ID: "04",
      name: "Tokyo Lofi Healing",
      imageUrl: "https://i.pravatar.cc/400",
    },
    {
      ID: "05",
      name: "Danh sách đầy đủ 100 tên phổ biến nhất ở nam kèm tỷ lệ trong nhóm nam giới",
      imageUrl: "https://i.pravatar.cc/500",
    },
    {
      ID: "06",
      name: "Tư Duy Ngược",
      imageUrl: "https://i.pravatar.cc/301",
    },
    {
      ID: "07",
      name: "Cách Tôi Làm Việc",
      imageUrl: "https://i.pravatar.cc/302",
    },
    {
      ID: "08",
      name: "Statistical Thinking",
      imageUrl: "https://i.pravatar.cc/303",
    },
    {
      ID: "09",
      name: "Speak English",
      imageUrl: "https://i.pravatar.cc/304",
    },
    {
      ID: "10",
      name: "Vô văn hóa",
      imageUrl: "https://i.pravatar.cc/305",
    },
    {
      ID: "11",
      name: "Wa???Wa???",
      imageUrl: "https://i.pravatar.cc/306",
    },
  ]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
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
        {groups
          .filter((eachGroup) =>
            eachGroup.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachGroup) => (
            <TabYourGroupsItems
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
export default TabYourGroups;

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
