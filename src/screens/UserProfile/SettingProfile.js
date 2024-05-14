import React from "react";
import { View, StyleSheet } from "react-native";
import TabSettingBasicInfo from "./Tabs/TabSettingBasicInfo";
import TabSettingTopics from "./Tabs/TabSettingTopics";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const ScreenOptions = ({ route }) => ({
  tabBarShowLabel: true,
  tabBarActiveTintColor: colors.active,
  tabBarInactiveTintColor: colors.inactive,
  tabBarActiveBackgroundColor: colors.backgroundWhite,
  tabBarInactiveBackgroundColor: colors.backgroundWhite,
  tabBarLabelStyles:{
    fontSize: fontSizes.h7,
  }
});

export default function SettingProfile(props) {
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Tùy chỉnh"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {}}
      />
      <View style={styles.displayView}>
        <Tab.Navigator
          initialRouteName="TabSettingBasicInfo"
          screenOptions={ScreenOptions}
        >
          <Tab.Screen
            name="TabSettingBasicInfo"
            component={TabSettingBasicInfo}
            options={{
              tabBarLabel: "Thông tin cơ bản",
            }}
          />
          <Tab.Screen
            name="TabSettingTopics"
            component={TabSettingTopics}
            options={{
              tabBarLabel: "Chủ đề bạn quan tâm",
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
