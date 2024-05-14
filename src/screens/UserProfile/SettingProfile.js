import React from "react";
import { View, StyleSheet } from "react-native";
import TabSettingBasicInfo from "./Tabs/TabSettingBasicInfo";
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
  fontSize: fontSizes.h6,
};

export default function SettingProfile(props) {
  return (
    <View style={styles.container}>
      <UIHeader title={"Nhóm học tập"} />
      <View style={styles.displayView}>
        <Tab.Navigator
          initialRouteName="TabSettingBasicInfo"
          screenOptions={ScreenOptions}
        >
          <Tab.Screen
            name="TabSettingBasicInfo"
            component={TabSettingBasicInfo}
            options={{
              tabBarLabel: "Đã tham gia",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
          <Tab.Screen
            name="TabSettingBasicInfo"
            component={TabSettingBasicInfo}
            options={{
              tabBarLabel: "Gợi ý nhóm",
              tabBarLabelStyle: tabBarLabelStyles,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

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
