import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TabYourFriends from "./Tabs/TabYourFriends";
import TabFriendRequests from "./Tabs/TabFriendRequests";
import TabSentRequests from "./Tabs/TabSentRequests";
import TabSuggestions from "./Tabs/TabSuggestions";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const ScreenOptions = ({ route }) => ({
  tabBarShowLabel: true,
  tabBarActiveTintColor: colors.active,
  tabBarInactiveTintColor: colors.inactive,
  tabBarActiveBackgroundColor: colors.backgroundWhite,
  tabBarInactiveBackgroundColor: colors.backgroundWhite,
});

const tabBarLabelStyles = {
  fontSize: fontSizes.h8*0.82,
};

function Friends(props) {
  return (
    <View style={styles.container}>
      <UIHeader title={"Bạn bè"} />

      <View style={styles.displayView}>
        <Tab.Navigator
          initialRouteName="TabYourFriends"
          screenOptions={ScreenOptions}
        >
          <Tab.Screen
            name="TabYourFriends"
            component={TabYourFriends}
            options={{
              tabBarLabel: "Đã kết bạn",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
          <Tab.Screen
            name="TabFriendRequests"
            component={TabFriendRequests}
            options={{
              tabBarLabel: "Lời mời kết bạn",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
          <Tab.Screen
            name="TabSentRequests"
            component={TabSentRequests}
            options={{
              tabBarLabel: "Lời mời đã gửi",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
          <Tab.Screen
            name="TabSuggestions"
            component={TabSuggestions}
            options={{
              tabBarLabel: "Gợi ý mới",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}
export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  eachTabView: {
    padding: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  eachTabText: {
    color: "white",
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    paddingVertical: 7,
    paddingHorizontal: 21,
    backgroundColor: colors.active,
    borderRadius: 13,
  },
  displayView: {
    flex: 1,
    flexDirection: "column",
  },
});
