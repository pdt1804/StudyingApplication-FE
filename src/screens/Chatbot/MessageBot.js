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
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, EnterMessageBar, MessengerItems } from "../../components";
import { API_BASE_URL } from "../../api/DomainAPI";
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

  const { userName, information } = props.route.params.chatbot;

  //function of navigation to/back
  const { navigate, goBack } = navigation;

  //filter tabs (if isLeader then show all)
  const filteredChatTabs = () =>
    chatTab.filter((eachTab) => eachTab.usedByLeaderOnly == false);

    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/api/v1/messageUser/loadMessageforUser?toUserName=" + userName, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });
        setChatHistory(response.data);
        //console.log(chatHistory)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData(); // Gọi lần đầu tiên khi component được render
    }, [props.userName]);

  return (
    <View style={styles.container}>
      <UIHeader
        title={information.fulName}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
      />

      <SafeAreaView style={styles.displayView}>
      <FlatList
          data={chatHistory}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => (
            <MessengerItems item={item} files={item.files} />
          )}
        />
  
        <EnterMessageChatBot userName={userName} fetchData={fetchData()}/>
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
