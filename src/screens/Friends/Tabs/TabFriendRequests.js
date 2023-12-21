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
import TabFriendRequestsItems from "./TabFriendRequestsItems";
import { images, colors, fontSizes } from "../../../constants";
import { API_BASE_URL } from "../../../../DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TabFriendRequests(props) {
  //list of group example = state
  const [g, setG] = useState([ //fake data
    {
      ID: "01",
      fulName: "Linh Mờ Inh",
      image: "https://i.pravatar.cc/100551",
    },
    {
      ID: "02",
      fulName: "Khang",
      image: "https://i.pravatar.cc/23070",
    },
    {
      ID: "03",
      fulName: "Bảo",
      image: "https://i.pravatar.cc/3000",
    },
    {
      ID: "04",
      fulName: "Phúc",
      image: "https://i.pravatar.cc/4090",
    },
    {
      ID: "05",
      fulName: "Minh",
      image: "https://i.pravatar.cc/580",
    },
    {
      ID: "06",
      fulName: "Khoa",
      image: "https://i.pravatar.cc/3071",
    },
    {
      ID: "07",
      fulName: "Anh",
      image: "https://i.pravatar.cc/3602",
    },
    {
      ID: "08",
      fulName: "Đạt",
      image: "https://i.pravatar.cc/3503",
    },
    {
      ID: "09",
      fulName: "Duy",
      image: "https://i.pravatar.cc/3044",
    },
    {
      ID: "10",
      fulName: "Guy",
      image: "https://i.pravatar.cc/3035",
    },
    {
      ID: "11",
      fulName: "Quy",
      image: "https://i.pravatar.cc/3026",
    },
  ]);
  const [invitation, setInvitation] = useState([]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");
  const [username, setUsername] = useState("")

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const username = await AsyncStorage.getItem('username');
        setUsername(username);

        const response = await axios.get(API_BASE_URL + "/api/v1/friendship/getAllInvitationFriendList?myUserName=" + username);

        setInvitation(response.data)
        console.log(response.data)
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, [props.userName]);

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
        {g
          /* .filter((eachInvitation) =>
            eachInvitation.userName.toLowerCase().includes(searchText.toLowerCase())
          ) */
          .map((eachInvitation) => (
            <TabFriendRequestsItems
              invitation={eachInvitation}
              key={eachInvitation.ID}
              onPress={() => {
                navigate("ShowProfileStranger", { user: eachGroup });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default TabFriendRequests;

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
