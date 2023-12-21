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
  const [chatHistory, setChatHistory] = useState([]);

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
