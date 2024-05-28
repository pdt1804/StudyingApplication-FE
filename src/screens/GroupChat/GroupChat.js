import React from "react";
import { View, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TabYourGroups from "./Tabs/TabYourGroups";
import TabSuggestions from "./Tabs/TabSuggestions";
import TabFindByTopics from "./Tabs/TabFindByTopics";

const Tab = createMaterialTopTabNavigator();

const ScreenOptions = ({ route }) => ({
  tabBarShowLabel: true,
  tabBarActiveTintColor: colors.active,
  tabBarInactiveTintColor: colors.inactive,
  tabBarActiveBackgroundColor: colors.backgroundWhite,
  tabBarInactiveBackgroundColor: colors.backgroundWhite,
});

const tabBarLabelStyles = {
  fontSize: fontSizes.h6,
};

function GroupChat(props) {
  return (
    <View style={styles.container}>
      <UIHeader title={"Nhóm học tập"} />
      <View style={styles.displayView}>
        <Tab.Navigator
          initialRouteName="TabYourGroups"
          screenOptions={ScreenOptions}
        >
          <Tab.Screen
            name="TabYourGroups"
            component={TabYourGroups}
            options={{
              tabBarLabel: "Đã tham gia",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
          <Tab.Screen
            name="TabSuggestions"
            component={TabSuggestions}
            options={{
              tabBarLabel: "Gợi ý nhóm",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
          <Tab.Screen
            name="TabFindByTopics"
            component={TabFindByTopics}
            options={{
              tabBarLabel: "Tìm kiếm theo chủ đề",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

export default GroupChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  displayView: {
    flex: 1,
    flexDirection: "column",
  },
});
