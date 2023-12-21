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
  const [g, setG] = useState([ // fake data
    {
      ID: "01",
      fulName: "Tom",
      image: "https://i.pravatar.cc/1000",
    },
    {
      ID: "02",
      fulName: "Jerry",
      image: "https://i.pravatar.cc/1001",
    },
    {
      ID: "03",
      fulName: "Edison",
      image: "https://i.pravatar.cc/1002",
    },
    {
      ID: "04",
      fulName: "Anh So Tanh",
      image: "https://i.pravatar.cc/1003",
    },
    {
      ID: "05",
      fulName: "My dog",
      image: "https://i.pravatar.cc/1004",
    },]);
  const [friends, setFriends] = useState([]);
  const [username, setUsername] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;
  
  useEffect(() => {
    const fetchData = async () => {
      try {

        const username = await AsyncStorage.getItem('username');
        setUsername(username);

        const response = await axios.get(API_BASE_URL + "/api/v1/friendship/getAllFriendList?myUserName=" + username);

        setFriends(response.data);
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  function SelectedFriend(myUsername, friendUsername)
  {
    navigate("Messenger", {
      myUsername: myUsername,
      friendUsername: friendUsername,
    })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={g}
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
