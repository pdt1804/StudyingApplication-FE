import React, { useState, useEffect } from "react";
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
import { EnterMessageBar, MessengerItems } from "../../../components";

function TabMessenger(props) {
  //list of example = state
  const [chatHistory, setChatHistory] = useState([
    {
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
      message:
        "Hello.",
      timestamp: 1668135552,
    },
    {
      imageUrl: "https://i.pravatar.cc/5055",
      isSender: false,
      message: "Hi. How are you? ",
      timestamp: 1696993152,
    },
    {
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
      message: "Im fine thank you, and you?",
      timestamp: 1699585152,
    },
    {
      imageUrl: "https://i.pravatar.cc/5055",
      isSender: false,
      message: "No.",
      timestamp: 1699667952,
    },
    {
      imageUrl: "https://i.pravatar.cc/5075",
      isSender: false,
      message: "Im in heaven.",
      timestamp: 1699671552,
    },
    {
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
      message: "Whats your favorite TV show?",
      timestamp: 1700098383,
    },
    {
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
      message: "Whats your favorite movie?",
      timestamp: 1700101983,
    },
    {
      imageUrl: "https://i.pravatar.cc/5075",
      isSender: false,
      message: "Whats your favorite book?",
      timestamp: 1700105583,
    },
    {
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
      message: "What are you doing this weekend?",
      timestamp: 1700109183,
    },
    {
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
      message: "Are you a morning person or a night person?",
      timestamp: 1700112783,
    },
  ]);

  return (
    <View style={styles.displayView}>
      <ScrollView /* Chat */>
        {chatHistory.map((eachItem) => (
          <MessengerItems item={eachItem} key={eachItem.timestamp} />
        ))}
      </ScrollView>

      <EnterMessageBar />
    </View>
  );
}
export default TabMessenger;

const styles = StyleSheet.create({
  displayView: { flex: 1 },
});
