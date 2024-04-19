import * as React from "react";
import { View, Alert } from "react-native";
import {
  UserProfile,
  GroupChat,
  Friends,
  AllNotification,
  MessageBot,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { images, icons, colors, fontSizes } from "../constants";
import { Icon } from "../components";

const Tab = createBottomTabNavigator();

const ScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.active,
  tabBarInactiveTintColor: colors.inactive,
  tabBarActiveBackgroundColor: colors.backgroundWhite,
  tabBarInactiveBackgroundColor: colors.backgroundWhite,

  tabBarIcon: ({ focused, color, size }) => {
    let screenName = route.name;
    let iconName = icons.personIcon;
    if (screenName == "GroupChat") {
      iconName = icons.groupIcon;
    } else if (screenName == "Friends") {
      iconName = icons.activeChatMessageIcon;
    } else if (screenName == "Notifications") {
      iconName = icons.activeBellAlarm;
    } else if (screenName == "MessageBot") {
      iconName = icons.activeFAQIcon;
    }

    return (
      <Icon
        name={iconName}
        size={focused ? 30 : 20}
        color={color}
        style={{ marginTop: "10%" }}
      />
    );
  },
});

const tabBarLabelStyles = {
  fontSize: fontSizes.h7,
  marginTop: "5%",
  marginBottom: "5%",
};

export default function MainBottomTab(props) {
  const { tabName } = props.route.params;

  return (
    <Tab.Navigator
      initialRouteName={tabName == null ? "UserProfile" : tabName}
      screenOptions={ScreenOptions}
    >
      <Tab.Screen
        name="Friends"
        component={Friends}
        options={{
          tabBarLabel: "Bạn bè",
          tabBarLabelStyle: tabBarLabelStyles,
        }}
      />
      <Tab.Screen
        name="GroupChat"
        component={GroupChat}
        options={{
          tabBarLabel: "Nhóm",
          tabBarLabelStyle: tabBarLabelStyles,
        }}
      />
      <Tab.Screen
        name="MessageBot"
        component={MessageBot}
        options={{
          tabBarLabel: "Hỏi đáp",
          tabBarLabelStyle: tabBarLabelStyles,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={AllNotification}
        options={{
          tabBarLabel: "Thông báo",
          tabBarLabelStyle: tabBarLabelStyles,
        }}
      />
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          tabBarLabel: "Tài khoản",
          tabBarLabelStyle: tabBarLabelStyles,
        }}
      />
    </Tab.Navigator>
  );
}
