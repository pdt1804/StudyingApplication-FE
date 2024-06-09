import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import ChatbotItems from "./ChatbotItems";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, Icon, SearchBarTransparent } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notifications_getAllByUserName } from "../../api";
import { information_getAllChatbots } from "../../api/ReNewStyle/informationController";

function ChatbotScreen(props) {
  const [chatbots, setChatbots] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setChatbots(await information_getAllChatbots())
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const navigateToChatbotScreen = (chatbot) => {
    push("MessageBot", {chatbot: chatbot})
  }

  return (
    <View style={styles.container}>
      <UIHeader title={"Góc tự học"} />

      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
      />

      <ScrollView>
        {chatbots
          .filter((eachChatbot) =>
              eachChatbot.information.fulName
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachChatbot) => (
            <ChatbotItems
              chatbot={eachChatbot}
              key={eachChatbot.information.infoID}
              onPress={() => navigateToChatbotScreen(eachChatbot)}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default ChatbotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
});
