import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import TabYourGroupsItems from "./TabYourGroupsItems";
import { Icon, SearchBarAndButton } from "../../../components";
import { images, colors, icons, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { group_getAllGroupofUser } from "../../../api";

export default function TabYourGroups(props) {
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //Có thấy để "stompClient" ở đây nhưng ko thấy sử dụng
  //nên xóa rồi nha

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await group_getAllGroupofUser();
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);
  }, [props.userName]);

  const SelectedGroup = async (eachGroup) => {
    try {
      await AsyncStorage.removeItem("groupID");
      await AsyncStorage.setItem("groupID", eachGroup.groupID.toString());
      await AsyncStorage.setItem("group", "chat");
      navigate("MessengerGroup", { group: eachGroup });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Tạo nhóm học tập"}
        buttonOnPress={() => {
          navigate("CreateGroup");
        }}
        buttonLength={"100%"}
      />

      <View style={styles.blackLine} />

      <ScrollView>
        {groups
          .filter((eachGroup) =>
            eachGroup.nameGroup.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachGroup) => (
            <TabYourGroupsItems
              group={eachGroup}
              key={eachGroup.groupID}
              onPress={() => {
                SelectedGroup(eachGroup);
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  blackLine: {
    backgroundColor: colors.inactive,
    height: 1,
    width: "95%",
    alignSelf: "center",
  },
});
