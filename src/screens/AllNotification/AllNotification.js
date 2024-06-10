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
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, Icon, SearchBarTransparent } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notifications_getAllByUserName } from "../../api";

function AllNotification(props) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = await AsyncStorage.getItem("username");
        const response = await notifications_getAllByUserName(userName);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 3000);

    // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);
  }, [props.userName]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader title={"Thông báo"} />

      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
      />

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
                navigate("ShowNotificationOfUser", {
                  notification: eachNotification,
                });
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
});
