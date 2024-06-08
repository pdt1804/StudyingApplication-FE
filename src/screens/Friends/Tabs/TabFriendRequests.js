import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { SearchBarTransparent, RowSectionTitle } from "../../../components";
import { images, icons, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  friend_getAllInvitationFriendList,
  friend_getAllSentInvitationList,
} from "../../../api";

import TabSuggestAndRequestItems from "./TabSuggestAndRequestItems";

export default function TabSuggestions(props) {
  const { navigate, goBack } = props.navigation;

  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");
  const [othersInvitation, setOthersInvitation] = useState([]);
  const [mySentInvitation, setMySentInvitation] = useState([]);

  const fetchData = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      setUsername(username);
      setOthersInvitation((await friend_getAllInvitationFriendList()).data);
      setMySentInvitation((await friend_getAllSentInvitationList()).data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [searchText, username]);

  return (
    <View style={styles.container}>
      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
      />

      <ScrollView>
        <RowSectionTitle
          text={"☆☆☆ Lời mời kết bạn ☆☆☆"}
          style={styles.rowSectionTitle}
        />
        {othersInvitation
          .filter((eachInvitation) =>
            eachInvitation.information.fulName
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachInvitation, index) => (
            <TabSuggestAndRequestItems
              key={index}
              invitation={eachInvitation}
              kind={"requested"}
              onPress={() => {
                navigate("ShowProfileStranger", {
                  user: eachInvitation,
                });
              }}
            />
          ))}

        <RowSectionTitle
          text={"☆☆☆ Lời mời đã gửi ☆☆☆"}
          style={styles.rowSectionTitle}
        />

        {mySentInvitation
          .filter((eachInvitation) =>
            eachInvitation.information.fulName
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachInvitation, index) => (
            <TabSuggestAndRequestItems
              key={index}
              invitation={eachInvitation}
              kind={"sent"}
              onPress={() => {
                navigate("ShowProfileStranger", {
                  user: eachInvitation,
                });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  rowSectionTitle: { alignSelf: "center", marginStart: 0 },
});
