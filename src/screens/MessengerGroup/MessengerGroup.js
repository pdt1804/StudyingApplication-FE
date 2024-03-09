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
import TabTypePost from "./Tabs/TabTypePost";
import TabNotification from "./Tabs/TabNotification";
import TabDocument from "./Tabs/TabDocument";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
        : screenName == "TabTypePost"
        ? (iconName = images.activeFAQIcon)
        : screenName == "TabNotification"
        ? (iconName = images.activeBellAlarm)
        : (iconName = images.documentBlackIcon)
      : screenName == "TabMessenger"
      ? (iconName = images.inactiveChatMessageIcon)
      : screenName == "TabDiscussion"
      ? (iconName = images.inactiveBlogSearchIcon)
      : screenName == "TabTypePost"
      ? (iconName = images.inactiveFAQIcon)
      : screenName == "TabNotification"
      ? (iconName = images.inactiveBellAlarm)
      : (iconName = images.documentIcon)
      
      
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
  //const { imageGroup, nameGroup, groupID } = props.route.params.group;

  //navigation
  const { navigate, goBack } = props.navigation;

  const [group, setGroup] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      
      const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      })
      setGroup(response.data);

    };

    fetchData();
  }, [props.userName]);


  const ShowGroupInfo = async () => {

    navigate('GroupInfo');

  }

  const goBackToGroupList = async () => {

    await AsyncStorage.setItem('group', "list");
    goBack();

  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={group.nameGroup}
        leftIconName={images.backIcon}
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
          <Tab.Screen name="TabMessenger" component={TabMessenger}/>
          <Tab.Screen name="TabDiscussion" component={TabDiscussion}/>
          <Tab.Screen name="TabTypePost" component={TabTypePost}/>
          <Tab.Screen name="TabNotification" component={TabNotification}/>
          <Tab.Screen name="TabDocument" component={TabDocument}/>
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
