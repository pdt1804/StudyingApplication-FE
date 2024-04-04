import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import TabNotificationItems from "./TabNotificationItems";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../api/DomainAPI";

function TabNotification(props) {
  const [notifications, setNotifications] = useState([]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation
  const { navigate, goBack } = props.navigation;

  const [userName, setUserName] = useState("")

  const [leaderOfGroup, setLeaderOfGroup] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
     
        const extractToken = await axios.get(API_BASE_URL + "/api/v1/information/ExtractBearerToken", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setUserName(extractToken.data);
  
        const response = await axios.get(API_BASE_URL + "/api/v1/notifycation/getAllNotifycationbyGroupID?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });
  
        setNotifications(response.data);

        const leader = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setLeaderOfGroup(leader.data.leaderOfGroup.userName)
    };
  
    fetchData(); // Gọi fetchData ngay sau khi component được mount
  
    // Sử dụng setInterval để gọi lại fetchData mỗi giây
      const intervalId = setInterval(fetchData, 3000);
    
      // Hủy interval khi component bị unmounted
      return () => clearInterval(intervalId);
  }, [props.userName, userName])


  return (
    <View style={styles.container}>
    <View style={styles.searchBarAndButtonView}>
        <View /* Search bar */ style={styles.searchBarView}>
          <Image source={images.searchIcon} style={styles.searchBarImage} />
          <TextInput
            autoCorrect={false}
            inputMode="search"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={styles.searchBarTypingArea}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            if (leaderOfGroup == userName)
            {
              navigate("CreateNotification");
            }
            else
            {
              alert('Bạn không phải nhóm trưởng')
            }
          }}
        >
          <Text style={styles.buttonText}>{"Tạo thông báo"}</Text>
        </TouchableOpacity>
      </View>

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
                navigate("ShowNotification", { notification: eachNotification });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default TabNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  searchBarAndButtonView: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarView: {
    width: "50%",
    height: "65%",
    marginHorizontal: 10,
    marginTop: 10,    
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 90,    
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  searchBarTypingArea: {
    height: "75%",
    flex: 1,
    marginRight: 10,
  },
  searchBarImage: {
    width: 22,
    height: 22,
    resizeMode: "stretch",
    marginHorizontal: 8,
  },
  buttonContainer: {
    width: "auto",
    height: "65%",

    marginRight: 10,
    marginTop: 12,

    borderRadius: 20,

    backgroundColor: colors.active,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    paddingHorizontal: 11,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
  },
});
