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

const getGroupID = async () =>
{
  return await AsyncStorage.getItem('groupID')
}

function TabMessenger(props) {
  //list of example = state
  const { navigate, goBack, push } = props.navigation;

  const [chatHistory, setChatHistory] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setUserName((await AsyncStorage.getItem('username')).toString());
  
        const response = await axios.get(API_BASE_URL + "/api/v1/messagegroup/loadMessageInGroup?myUserName=" + userName + "&groupID=" + await AsyncStorage.getItem('groupID'));
  
        setChatHistory(response.data);

    };
  
    fetchData(); // Gọi fetchData ngay sau khi component được mount
  
    // Sử dụng setInterval để gọi lại fetchData mỗi giây
      const intervalId = setInterval(fetchData, 3000);
    
      // Hủy interval khi component bị unmounted
      return () => clearInterval(intervalId);
  }, [props.userName, userName])


  const scrollRef = useRef(null);
  useEffect(() => {
    // Scroll to bottom after rendering
    scrollRef.current.scrollToEnd({ animated: true });
  }, []);

  return (
    <View style={styles.displayView}>
      <ScrollView /* Chat */ ref={scrollRef}>
        {chatHistory.map((eachItem) => (
          <MessengerGroupItems item={eachItem} key={eachItem.id} navigate={navigate}/>
        ))}
      </ScrollView>

      <EnterMessageGroupBar userName={userName}/>
    </View>
  );
}
export default TabMessenger;

const styles = StyleSheet.create({
  displayView: { flex: 1 },
});
