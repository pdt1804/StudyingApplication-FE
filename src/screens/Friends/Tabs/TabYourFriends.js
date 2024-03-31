import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import TabYourFriendsItems from "./TabYourFriendsItems";
import { images, icons, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { friend_getAllFriendList } from "../../../api";

function TabYourFriends(props) {
  //list of group example = state
  const [friends, setFriends] = useState([]);

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await friend_getAllFriendList();
        setFriends(response.data);
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
  }, [props.userName]);

  const SelectedFriend = async (myUsername, friendUsername) => {
    await AsyncStorage.setItem("friend", "chat");
    navigate("Messenger", {
      myUsername: myUsername,
      friendUsername: friendUsername,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TabYourFriendsItems
            friend={item}
            key={item.ID}
            onPress={(myUserName, friendUsername) => {
              SelectedFriend(myUserName, friendUsername);
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
