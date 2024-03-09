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
import { API_BASE_URL } from "../../../../DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TabYourFriends(props) {
  //list of group example = state
  const [friends, setFriends] = useState([]);
  const [username, setUsername] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;
  
  useEffect(() => {
    const fetchData = async () => {
      try {

        const username = await AsyncStorage.getItem('username');
        setUsername(username);

        const response = await axios.get(API_BASE_URL + "/api/v1/friendship/getAllFriendList", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });

        //console.log(response.data)

        setFriends(response.data);
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 1000);

    // // Hủy interval khi component bị unmounted
     return () => clearInterval(intervalId);

  }, [props.userName]);

  const SelectedFriend = async (myUsername, friendUsername) =>
  {
    await AsyncStorage.setItem('friend', "chat");
    navigate("Messenger", {
      myUsername: myUsername,
      friendUsername: friendUsername,
    })
  }

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
