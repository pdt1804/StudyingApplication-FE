import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TabSuggestionsItems from "./TabSuggestionsItems";
import { SearchBarTransparent } from "../../../components";
import { images, icons, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { friend_findAllFriendByInputName } from "../../../api";

function TabSuggestions(props) {
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");
  const [invitation, setInvitation] = useState([]);

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUsername(await AsyncStorage.getItem("username"));
        if (searchText.length >= 1) {
          const response = await friend_findAllFriendByInputName(searchText);
          setInvitation(response.data);
        } else {
          setInvitation([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    // Thực hiện fetch dữ liệu sau khi ngừng nhập trong 2 giây
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1);

    // Hủy timeout nếu có sự kiện thay đổi trong khoảng 2 giây
    return () => clearTimeout(timeoutId);
  }, [searchText, username]);

  return (
    <View style={styles.container}>
      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
      />

      <FlatList
        data={invitation.filter((eachInvitation) =>
          eachInvitation.information.fulName
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.information.infoID.toString()}
        renderItem={({ item }) => (
          <TabSuggestionsItems
            invitation={item}
            onPress={() => {
              navigate("ShowProfileStranger", {
                user: item
              });
            }}
          />
        )}
      />
    </View>
  );
}

export default TabSuggestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
});
