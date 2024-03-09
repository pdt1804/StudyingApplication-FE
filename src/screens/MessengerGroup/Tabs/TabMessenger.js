import React, { useState, useEffect, useRef } from "react";
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
import { EnterMessageBar, MessengerItems, MessengerGroupItems } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../../../DomainAPI";
import EnterMessageGroupBar from "../../../components/EnterMessageGroupBar";
import SockJS from 'sockjs-client';
import { over } from "stompjs";

const getGroupID = async () =>
{
  return await AsyncStorage.getItem('groupID').toString();
}

function TabMessenger(props) {
  //list of example = state
  const { navigate, goBack, push } = props.navigation;

  const [chatHistory, setChatHistory] = useState([]);
  const [userName, setUserName] = useState(null);

  const [groupID, setGroupID] = useState(null);

  const [socket, setSocket] = useState(new SockJS(API_BASE_URL + "/ws"))
  //const [stompClient, setStompClient] = useState(over(socket));
  
  let stompClient = over(socket);

  useEffect(() => {

    const fetchData = async () => {
      setUserName((await AsyncStorage.getItem('username')).toString());

      setGroupID(await AsyncStorage.getItem('groupID'))

      stompClient.connect({} , onConnected, onError)

  
        const response = await axios.get(API_BASE_URL + "/api/v1/messagegroup/loadMessageInGroup?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });
  
        setChatHistory(response.data);

    };
  
    fetchData(); // Gọi fetchData ngay sau khi component được mount
  
    // Sử dụng setInterval để gọi lại fetchData mỗi giây
      // const intervalId = setInterval(fetchData, 3000);
    
      // // Hủy interval khi component bị unmounted
      // return () => clearInterval(intervalId);
  }, [props.userName, userName])

  const onConnected = async () =>
  {
    stompClient.subscribe("/user/public/queue/chat/" + await AsyncStorage.getItem('groupID'), onReceivedMessage)

    // groups.map((group) => {
    //   stompClient.subscribe("/public/queue/" + group.groupID, onReceived)
    // })

  }

  const onError = async () =>
  {
    alert('Error')
  }

  const onReceivedMessage = async (message) =>
  {
    if (await AsyncStorage.getItem('group') == "list")
    {
      return
    }
    else
    {
      const response = await axios.get(API_BASE_URL + "/api/v1/messagegroup/loadMessageInGroup?groupID=" + await AsyncStorage.getItem('groupID'), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      });

      setChatHistory(response.data);
    }
  }


  const scrollRef = useRef(null);
  useEffect(() => {
    // Scroll to bottom after rendering
    scrollRef.current.scrollToEnd({ animated: true });
  }, []);

  return (
    <View style={styles.displayView}>
      <ScrollView /* Chat */ ref={scrollRef}>
        {chatHistory.map((eachItem) => (
          <MessengerGroupItems item={eachItem} key={eachItem.id} navigate={navigate} stompClient={stompClient}/>
        ))}
      </ScrollView>

      <EnterMessageGroupBar userName={userName} groupID={groupID} stompClient={stompClient}/>
    </View>
  );
}
export default TabMessenger;

const styles = StyleSheet.create({
  displayView: { flex: 1 },
});
