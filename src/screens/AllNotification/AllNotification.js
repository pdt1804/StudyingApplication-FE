import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import NotificationItems from "./NotificationItems";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { API_BASE_URL } from "../../../DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AllNotification(props) {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const userName = await AsyncStorage.getItem('username');

        const response = await axios.get(API_BASE_URL + "/api/v1/notifycation/getAllNotifycationbyUserName", {
          headers: {
            'Authorization': 'Bearer ' + userName,
          },
        });

        setNotifications(response.data)
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 3000);

    // // Hủy interval khi component bị unmounted
     return () => clearInterval(intervalId);
  }, [props.userName]);
  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader title={"Thông báo"} />

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
        {notifications
          .filter((eachNotification) =>
            eachNotification.header
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachNotification) => (
            <NotificationItems
              group={eachNotification}
              key={eachNotification.notifycationID}
              onPress={() => {
                navigate("ShowNotificationOfUser", { notification: eachNotification });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default AllNotification;

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
    marginBottom: 10,
    alignSelf: "center",
  },
});
