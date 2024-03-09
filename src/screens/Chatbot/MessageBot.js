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
import { useRef } from "react";
import EnterMessageChatBot from "../../components/EnterMessageChatBot";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessengerBotItems from "../../components/MessengerBotItem";


function MessageBot(props) {
  //list of example = state
  const [chatHistory, setChatHistory] = useState([]);

  //const { imageUrl, name } = props.route.params.user;

  //navigation
  const { navigation, route } = props;
  //function of navigation to/back
  const { navigate, goBack } = navigation;

  //filter tabs (if isLeader then show all)
  const filteredChatTabs = () =>
    chatTab.filter((eachTab) => eachTab.usedByLeaderOnly == false);

    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/api/v1/messageUser/loadMessageforUser?toUserName=Chatbot", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });
        setChatHistory(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData(); // Gọi lần đầu tiên khi component được render
  
      const intervalId = setInterval(() => {
        fetchData(); // Gọi lại sau mỗi 2 giây
      }, 1000);
  
      return () => clearInterval(intervalId); // Xóa interval khi component bị unmount hoặc dependencies thay đổi
    }, [props.userName]);

  function LoadUserInformation()
  {
    navigate("ShowProfileFriend", { friendUsername: friendUsername })
  }

  const SendMessage = async () => {


  }

  return (
    <View style={styles.container}>
      <UIHeader
        title="Hỏi đáp"
        leftIconName={null}
        rightIconName={null}
        onPressLeftIcon={() => {
          
        }}
        onPressRightIcon={null}
        onPressTitle={null}
      />

      <SafeAreaView style={styles.displayView}>
        <ScrollView>
          {chatHistory.map((eachItem) => (
            <MessengerBotItems item={eachItem} key={eachItem.id} />
          ))}
        </ScrollView>
  
        <EnterMessageChatBot/>
      </SafeAreaView>
    </View>
  );
}
export default MessageBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  displayView: { flex: 1 },
});
