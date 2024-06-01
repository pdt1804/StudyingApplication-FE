import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { group_findGroupById } from "../../api";

import TabMessenger from "./Tabs/TabMessenger";
import TabDiscussion from "./Tabs/TabDiscussion";
import TabSubject from "./Tabs/TabSubject";
import TabNotification from "./Tabs/TabNotification";
import TabDocument from "./Tabs/TabDocument";

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
        ? (iconName = icons.activeChatMessageIcon)
        : screenName == "TabDiscussion"
        ? (iconName = icons.activeBlogSearchIcon)
        : screenName == "TabSubject"
        ? (iconName = icons.activeFAQIcon)
        : screenName == "TabNotification"
        ? (iconName = icons.activeBellAlarm)
        : (iconName = icons.documentBlackIcon)
      : screenName == "TabMessenger"
      ? (iconName = icons.inactiveChatMessageIcon)
      : screenName == "TabDiscussion"
      ? (iconName = icons.inactiveBlogSearchIcon)
      : screenName == "TabSubject"
      ? (iconName = icons.inactiveFAQIcon)
      : screenName == "TabNotification"
      ? (iconName = icons.inactiveBellAlarm)
      : (iconName = icons.documentIcon);

    return (
      <Image
        source={iconName}
        style={{
          right: "25%", //To level both sides evenly after width > 100%.
          bottom: "15%",
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
  const [group, setGroup] = useState("");
  //navigation
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      const groupID = await AsyncStorage.getItem("groupID");
      const response = await group_findGroupById(groupID);
      setGroup(response.data);
    };

    fetchData();
  }, [props.userName]);

  const ShowGroupInfo = async () => {
    navigate("GroupInfo", {id: await AsyncStorage.getItem('groupID')});
  };

  const goBackToGroupList = async () => {
    await AsyncStorage.setItem("group", "list");
    goBack();
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={group.nameGroup}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBackToGroupList();
        }}
        onPressRightIcon={null}
        onPressTitle={ShowGroupInfo}
      />

      <View style={styles.displayView}>
        <Tab.Navigator
          initialRouteName="TabMessenger"
          screenOptions={ScreenOptions}
        >
          <Tab.Screen name="TabMessenger" component={TabMessenger} />
          <Tab.Screen name="TabDiscussion" component={TabDiscussion} />
          <Tab.Screen name="TabSubject" component={TabSubject} />
          <Tab.Screen name="TabNotification" component={TabNotification} />
          <Tab.Screen name="TabDocument" component={TabDocument} />
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
