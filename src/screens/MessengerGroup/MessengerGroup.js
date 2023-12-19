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
import TabMessenger from "./Tabs/TabMessenger";
import TabDiscussion from "./Tabs/TabDiscussion";
import TabNotification from "./Tabs/TabNotification";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const ScreenOptions = ({ route }) => ({
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.active,
  tabBarInactiveTintColor: colors.inactive,
  tabBarActiveBackgroundColor: colors.backgroundWhite,
  tabBarInactiveBackgroundColor: colors.backgroundWhite,

  tabBarContentContainerStyle: {},

  tabBarIcon: ({ focused, color }) => {
    let screenName = route.name;
    let iconName = null;
    focused
      ? screenName == "TabMessenger"
        ? (iconName = images.activeChatMessageIcon)
        : screenName == "TabDiscussion"
        ? (iconName = images.activeBlogSearchIcon)
        : (iconName = images.activeBellAlarm)
      : screenName == "TabMessenger"
      ? (iconName = images.inactiveChatMessageIcon)
      : screenName == "TabDiscussion"
      ? (iconName = images.inactiveBlogSearchIcon)
      : (iconName = images.inactiveBellAlarm);
    return (
      <Image
        source={iconName}
        style={{
          right: "25%", //To level both sides evenly after width > 100%.
          bottom: '15%',
          width: "150%",
          height: "125%",
          resizeMode: "stretch",
          tintColor: color,
        }}
      />
    );
  },
});

function MessengerGroup(props) {
  //I forget what's' this
  const { imageUrl, name } = props.route.params.user;

  //navigation
  const { navigate, goBack } = props.navigation;

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
        <Tab.Navigator
          initialRouteName="TabMessenger"
          screenOptions={ScreenOptions}
        >
          <Tab.Screen name="TabMessenger" component={TabMessenger} />
          <Tab.Screen name="TabDiscussion" component={TabDiscussion} />
          <Tab.Screen name="TabNotification" component={TabNotification} />
        </Tab.Navigator>
      </View>
    </View>
  );
}
export default MessengerGroup;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundWhite },
  tabsContainer: {
    height: 50,
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
