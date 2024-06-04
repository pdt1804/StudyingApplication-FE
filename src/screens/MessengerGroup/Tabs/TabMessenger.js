import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { EnterMessageBar, MessengerItems } from "../../../components";
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
  const [socket, setSocket] = useState(new SockJS(API_BASE_URL + "/ws"));

  let stompClient = over(socket);

  const fetchData = async () => {
    stompClient.connect({}, onConnected, onError);
    const chatData = await messenger_loadMessageInGroup();
    setChatHistory(chatData);
    // console.log("-----------------------------------------------------------------")
    // console.log(chatData.fi)
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   fetchData();
    // }, 1000);
    // return () => clearInterval(intervalId);
    fetchData();
  }, [props.userName]);

  const onConnected = async () => {
    stompClient.subscribe(
      "/user/public/queue/chat/" + (await AsyncStorage.getItem("groupID")),
      onReceivedMessage
    );
  };

  const onError = async () => {
    alert("Error");
  };

  const onReceivedMessage = async () => {
    const chatData = await messenger_receiveMessage();
    setChatHistory(chatData);
  };

  return (
    <View style={styles.displayView}>
      <FlatList
        data={chatHistory}
        keyExtractor={(item) => item.id}
        inverted
        renderItem={({ item }) => (
          <MessengerItems
            kind={"group"}
            item={item}
            files={item.files}
            navigate={navigate}
          />
        )}
      />

      <EnterMessageBar stompClient={stompClient} actionType={"group"} />
    </View>
  );
}
export default TabMessenger;

const styles = StyleSheet.create({
  displayView: { flex: 1 },
});
