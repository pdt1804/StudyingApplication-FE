import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { EnterMessageBar, MessengerGroupItems } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../api/DomainAPI";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import {
  messenger_loadMessageInGroup,
  messenger_receiveMessage,
} from "../../../api";

function TabMessenger(props) {
  const { navigate } = props.navigation;

  const [chatHistory, setChatHistory] = useState([]);
  const [userName, setUserName] = useState(null);

  const [socket, setSocket] = useState(new SockJS(API_BASE_URL + "/ws"));
  let stompClient = over(socket);

  useEffect(() => {
    const fetchData = async () => {
      setUserName((await AsyncStorage.getItem("username")).toString());
      stompClient.connect({}, onConnected, onError);
      const chatData = await messenger_loadMessageInGroup();
      setChatHistory(chatData);

      console.log(chatData[5].files[0].url)

    };
    fetchData();
  }, [props.userName, userName]);

  const onConnected = async () => {
    stompClient.subscribe(
      "/user/public/queue/chat/" + (await AsyncStorage.getItem("groupID")),
      onReceivedMessage
    );
  };

  const onError = async () => {
    alert("Error");
  };

  const onReceivedMessage = async (message) => {
    const chatData = await messenger_receiveMessage();
    setChatHistory(chatData);
  };

  const scrollViewRef = useRef();
  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: false });
  }, [chatHistory]);

  return (
    <View style={styles.displayView}>
      <ScrollView ref={scrollViewRef}>
        {chatHistory.map((eachItem) => (
          <MessengerGroupItems
            item={eachItem}
            files={eachItem.files}
            key={eachItem.id}
            navigate={navigate}
            stompClient={stompClient}
          />
        ))}
      </ScrollView>

      <EnterMessageBar stompClient={stompClient} actionType={"group"} />
    </View>
  );
}
export default TabMessenger;

const styles = StyleSheet.create({
  displayView: { flex: 1 },
});
