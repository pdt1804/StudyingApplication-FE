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

function Messenger(props) {
  //list of example = state
  const [chatHistory, setChatHistory] = useState([
    {
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
      message: "Hello.",
      timestamp: 1668135552,
    },
    {
      imageUrl: "https://i.pravatar.cc/505",
      isSender: false,
      message: "Hi. How are you?",
      timestamp: 1696993152,
    },
    {
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
      message: "Im fine thank you, and you?",
      timestamp: 1699585152,
    },
    {
      imageUrl: "https://i.pravatar.cc/505",
      isSender: false,
      message: "No.",
      timestamp: 1699667952,
    },
    {
      imageUrl: "https://i.pravatar.cc/505",
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
      imageUrl: "https://i.pravatar.cc/500",
      isSender: true,
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
      message: "Are you a morning person or a night person? I finally finished w/my class work 4 hours in straight. this was relaxing and kept me in the game to finish. thank you and may GOD bless you",
      timestamp: 1700112783,
    },
  ]);

  const { imageUrl, name } = props.route.params.user;

  //navigation
  const { navigation, route } = props;
  //function of navigation to/back
  const { navigate, goBack } = navigation;

  //filter tabs (if isLeader then show all)
  const filteredChatTabs = () =>
    chatTab.filter((eachTab) => eachTab.usedByLeaderOnly == false);

  return (
    <View style={styles.container}>
      <UIHeader
        title={name}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
      />

      <View style={styles.displayView}>
        <ScrollView /* Chat */>
          {chatHistory.map((eachItem) => (
            <MessengerItems item={eachItem} key={eachItem.timestamp} />
          ))}
        </ScrollView>

        <EnterMessageBar />
      </View>
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
