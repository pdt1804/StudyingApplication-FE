import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TabYourGroups from "./Tabs/TabYourGroups";
import TabSuggestions from "./Tabs/TabSuggestions";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  //list of group example = state
  const [groups, setGroups] = useState([]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {

        const username = await AsyncStorage.getItem('username');
        setUsername(username);

        const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/getAllGroupofUser?myUserName=" + username);

        console.log(response.data);
        setGroups(response.data);

                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  return (
    <View style={styles.container}>
      <UIHeader title={"Nhóm học tập"} />
      <View style={styles.displayView}><Tab.Navigator
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
        </Tab.Navigator>
      </View>
    </View>
  )
}

export default GroupChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  searchBarView: {
    height: "7%",
    paddingHorizontal: 7,
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: colors.transparentWhite,
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
