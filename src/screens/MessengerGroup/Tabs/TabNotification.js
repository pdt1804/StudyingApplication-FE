import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import { SearchBarAndButton } from "../../../components";
import TabNotificationItems from "./TabNotificationItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  group_findGroupById,
  group_extractBearerToken,
  group_getAllNotificationByGroupId,
} from "../../../api";

export default function TabNotification(props) {
  //navigation
  const { navigate, goBack } = props.navigation;

  const [userName, setUserName] = useState("");
  const [leaderOfGroup, setLeaderOfGroup] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const groupID = await AsyncStorage.getItem("groupID");
      const responseGroup = await group_findGroupById(groupID);
      const responseNotification = await group_getAllNotificationByGroupId();
      const extractToken = await group_extractBearerToken();

      setUserName(extractToken.data);
      setNotifications(responseNotification.data);
      setLeaderOfGroup(responseGroup.data.leaderOfGroup.userName);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [props.userName, userName]);

  return (
    <View style={styles.container}>
      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Tạo thông báo"}
        buttonOnPress={() => {
          if (leaderOfGroup == userName) {
            navigate("CreateNotification");
          } else {
            alert("Bạn không phải nhóm trưởng");
          }
        }}
        buttonLength={"100%"}
      />

      <ScrollView style={styles.listContainer}>
        {notifications
          .filter((eachNotification) =>
            eachNotification.header
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachNotification) => (
            <TabNotificationItems
              notification={eachNotification}
              key={eachNotification.notifycationID}
              onPress={() => {
                navigate("ShowNotification", {
                  notification: eachNotification,
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
  listContainer: {
    flex: 1,
  },
});
