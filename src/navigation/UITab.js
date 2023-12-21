import * as React from "react";
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Settings, GroupChat, Friends, AllNotification } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { images, colors, fontSizes } from "../constants";

const Tab = createBottomTabNavigator();

const ScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.active,
  tabBarInactiveTintColor: colors.inactive,
  tabBarActiveBackgroundColor: colors.backgroundWhite,
  tabBarInactiveBackgroundColor: colors.backgroundWhite,

  tabBarIcon: ({ focused, color, size }) => {
    let screenName = route.name;
    let iconName = images.personIcon;
    if (screenName == "GroupChat") {
      iconName = images.groupIcon;
    } else if (screenName == "Friends") {
      iconName = images.activeChatMessageIcon;
    } else if (screenName == "Notifications") {
      iconName = images.activeBellAlarm;
    }

    return (
      <Image
        source={iconName}
        style={{
          width: 20,
          height: 20,
          //tintColor: focused ? colors.active : colors.inactive,
          tintColor: color,
          marginTop: '10%',
        }}
      />
    );
  },
});

const tabBarLabelStyles = {
  fontSize: fontSizes.h7,
  marginTop: '5%',
  marginBottom: '5%',
};

function UITab(props) {
  return (
    <Tab.Navigator initialRouteName="Friends" screenOptions={ScreenOptions}>
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
          tabBarLabel: "Nhóm học tập",
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
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Tài khoản",
          tabBarLabelStyle: tabBarLabelStyles,
        }}
      />
    </Tab.Navigator>
  );
}
export default UITab;
