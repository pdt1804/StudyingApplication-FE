import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader, EnterMessageBar, MessengerItems } from "../../components";
import { API_BASE_URL } from "../../../DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRef } from "react";
import SockJS from 'sockjs-client';
import { over } from "stompjs";

function Messenger(props) {
  //list of example = state
  const [chatHistory, setChatHistory] = useState([]);

  //const { imageUrl, name } = props.route.params.user;

  const {myUsername, friendUsername} = props.route.params;

  //navigation
  const { navigation, route } = props;
  //function of navigation to/back
  const { navigate, goBack } = navigation;
  
  const [friendID, setFriendID] = useState(null);
  
  const [socket, setSocket] = useState(new SockJS(API_BASE_URL + "/ws"))
  //const [stompClient, setStompClient] = useState(over(socket));
  
  let stompClient = over(socket);

  //filter tabs (if isLeader then show all)
  const filteredChatTabs = () =>
    chatTab.filter((eachTab) => eachTab.usedByLeaderOnly == false);

    const fetchData = async () => {
      try {

        stompClient.connect({} , onConnected, onError)

        const response = await axios.get(API_BASE_URL + "/api/v1/messageUser/loadMessageforUser?toUserName=" + friendUsername, {
          headers: {
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });

        setChatHistory(response.data);

        setChatHistory(response.data);




      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData(); // Gọi lần đầu tiên khi component được render
  
      // const intervalId = setInterval(() => {
      //   fetchData(); // Gọi lại sau mỗi 2 giây
      // }, 1000);
  
      // return () => clearInterval(intervalId); // Xóa interval khi component bị unmount hoặc dependencies thay đổi
    }, [props.userName]);
  
    const onConnected = async () =>
    {
      const getFriendID = await axios.get(API_BASE_URL + "/api/v1/messageUser/getFriendID?toUserName=" + friendUsername, {
        headers: {
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      });

      setFriendID(getFriendID.data);
      
      stompClient.subscribe("/user/private/queue/chat/" + getFriendID.data, onReceivedMessage)
      //stompClient.subscribe("/user/private/queue/chat/456", onReceivedMessage)

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
      if (await AsyncStorage.getItem('friend') == "list")
      {
        return
      }
      else
      {
        const response = await axios.get(API_BASE_URL + "/api/v1/messageUser/loadMessageforUser?toUserName=" + friendUsername, {
          headers: {
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });

        setChatHistory(response.data);
      }
    }
    

  function LoadUserInformation()
  {
    navigate("ShowProfileFriend", { friendUsername: friendUsername })
  }

  const goBackToFriendList = async () => {

    await AsyncStorage.setItem('friend', "list");
    goBack();

  }

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
        onPressTitle={() => navigate("ShowProfileFriend", { friendUsername: friendUsername })}
      />

      <SafeAreaView style={styles.displayView}>
      <ScrollView>
          {chatHistory.map((eachItem) => (
            <MessengerItems item={eachItem} key={eachItem.id} />
          ))}
        </ScrollView>

        <EnterMessageBar myUsername={myUsername} friendUsername={friendUsername} stompClient={stompClient} friendID={friendID}/>
      </SafeAreaView>
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
