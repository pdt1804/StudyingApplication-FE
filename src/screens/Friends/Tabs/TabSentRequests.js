import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TabSentRequestsItems from "./TabSentRequestsItems";
import { SearchBarTransparent } from "../../../components";
import { images, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { friend_getAllSentInvitationList } from "../../../api";

function TabSuggestions(props) {
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("");
  const [invitation, setInvitation] = useState([]);

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        setUsername(username);

        const response = await friend_getAllSentInvitationList();
        setInvitation(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 1000);

    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);
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
          <TabSentRequestsItems
            invitation={item}
            onPress={() => {
              navigate("ShowProfileStranger", {
                userName: item.userName,
                image: item.information.image,
                fulName: item.information.fulName,
                phoneNumber: item.information.phoneNumber,
                gender: item.information.gender,
                yearOfBirth: item.information.yearOfBirth,
                email: item.email,
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
