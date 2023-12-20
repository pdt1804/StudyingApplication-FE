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

function Messenger(props) {
  //list of example = state
  const [chatHistory, setChatHistory] = useState([]);

  //const { imageUrl, name } = props.route.params.user;

  const {myUsername, friendUsername} = props.route.params;

  //navigation
  const { navigation, route } = props;
  //function of navigation to/back
  const { navigate, goBack } = navigation;

  //filter tabs (if isLeader then show all)
  const filteredChatTabs = () =>
    chatTab.filter((eachTab) => eachTab.usedByLeaderOnly == false);

    const fetchData = async () => {
      try {
        const response = await axios.get(API_BASE_URL + "/api/v1/messageUser/loadMessageforUser?myUserName=" + myUsername + "&toUserName=" + friendUsername);
        console.log(response.data);
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

  return (
    <View style={styles.container}>
      <UIHeader
        title={friendUsername}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
      />

      <SafeAreaView style={styles.displayView}>
      <ScrollView>
          {chatHistory.map((eachItem) => (
            <MessengerItems item={eachItem} key={eachItem.id} />
          ))}
        </ScrollView>

        <EnterMessageBar myUsername={myUsername} friendUsername={friendUsername}/>
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
