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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../DomainAPI";


function AllNotification(props) {
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState("");

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const userName = await AsyncStorage.getItem('username');
        setUsername(userName);

        const response = await axios.get(API_BASE_URL + "/api/v1/notifycation/getAllNotifycationbyUserName?userName" + username);
        setNotifications(response.data)
        console.log(response.data);
                
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
        {
          notifications.map((eachNotification) => (
            <NotificationItems
              notification={eachNotification}
              key={eachNotification.notifycationID}
              onPress={() => {
                Alert.alert(eachNotification.header, eachNotification.content, [
                  {
                    text: 'Đóng thông báo',
                    onPress: () => console.log('Đóng thông báo pressed'),
                  },
                ]);
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
