import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, EnterMessageBar, MessengerItems } from "../../components";
import { API_BASE_URL } from "../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { messenger_getFriendID, messenger_loadMessageforUser } from "../../api";

function Messenger(props) {
  const { myUsername, friendUsername,  } = props.route.params;
  const [chatHistory, setChatHistory] = useState([]);
  const [friendID, setFriendID] = useState(null);

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  const [socket, setSocket] = useState(new SockJS(API_BASE_URL + "/ws"));
  let stompClient = over(socket);

  const fetchData = async () => {
    try {
      stompClient.connect({}, onConnected, onError);

      const response = await messenger_loadMessageforUser(friendUsername);
      setChatHistory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [,props.userName]);

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
      setIsNewNotification(true)
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

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: false });
  }, [chatHistory]);

  return (
    <View style={styles.container}>
      <UIHeader
        title={friendUsername}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBackToFriendList();
        }}
        onPressRightIcon={null}
        onPressTitle={() => LoadUserInformation()}
      />

      <View style={styles.displayView}>
        <ScrollView ref={scrollViewRef}>
          {chatHistory.map((eachItem) => (
            <MessengerItems item={eachItem} key={eachItem.id} />
          ))}
        </ScrollView>

        <EnterMessageBar
          myUsername={myUsername}
          friendUsername={friendUsername}
          stompClient={stompClient}
          friendID={friendID}
          actionType={'friend'}
        />
      </View>
    </View>
  );
}
export default Messenger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  displayView: { flex: 1 },
});
