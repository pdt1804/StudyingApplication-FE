import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, EnterMessageBar, MessengerItems, LoadingFullScreen } from "../../components";
import { API_BASE_URL } from "../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { messenger_getFriendID, messenger_loadMessageforUser } from "../../api";

export default function Messenger(props) {
  const { navigate, goBack } = props.navigation;
  const { myUsername, friendUsername, state } = props.route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [friendID, setFriendID] = useState(null);
  const [socket, setSocket] = useState(new SockJS(API_BASE_URL + "/ws"));

  let stompClient = over(socket);

  const fetchData = async () => {
    try {
      stompClient.connect({}, onConnected, onError);
      //--
      const response = await messenger_loadMessageforUser(friendUsername);
      console.log(response.data)
      setChatHistory(response.data);
      //--
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.userName]);

  const onConnected = async () => {
    const getFriendIDResponse = await messenger_getFriendID(friendUsername);
    setFriendID(getFriendIDResponse.data);
    stompClient.subscribe(
      "/user/private/queue/chat/" + getFriendIDResponse.data,
      onReceivedMessage
    );
  };

  const onError = async () => {
    alert("Error");
  };
  const onReceivedMessage = async (message) => {
    if ((await AsyncStorage.getItem("friend")) == "list") {
      setIsNewNotification(true);
      return;
    } else {
      const response = await messenger_loadMessageforUser(friendUsername);
      setChatHistory(response.data);
    }
  };

  function LoadUserInformation() {
    navigate("ShowProfileFriend", { friendUsername: friendUsername });
  }

  const goBackToFriendList = async () => {
    await AsyncStorage.setItem("friend", "list");
    goBack();
  };

  if (isLoading) {
    return (
      <LoadingFullScreen/>
    );
  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={friendUsername}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBackToFriendList();
        }}
        onPressRightIcon={null}
        onPressTitle={() => LoadUserInformation()}
      />

      <View style={styles.displayView}>
        <FlatList
          data={chatHistory}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => ( <MessengerItems item={item} files={item.files} /> )}
        />

        <EnterMessageBar
          myUsername={myUsername}
          friendUsername={friendUsername}
          stompClient={stompClient}
          friendID={friendID}
          actionType={"friend"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  displayView: { flex: 1 },
});
