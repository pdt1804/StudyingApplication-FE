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
import TabFindByTopicsItems from "./TabFindByTopicsItems";
import { images, icons, colors, fontSizes } from "../../../constants";
import { SearchBarTransparent, RowSectionTitle } from "../../../components";
import { groupStudying_getAllRecommendedGroup, group_findGroupbyName } from "../../../api";

function TabSuggestions(props) {
  const [groups, setGroups] = useState([]);
  const [recommendedGroup, setRecommendedGroup] = useState([]);

  const [searchText, setSearchText] = useState("");


export default function TabSuggestions(props) {
  const { navigate, goBack } = props.navigation;

//<<<<<<< Tesing-Expo
  useEffect(() => {
    const fetchData = async () => {
      try {
        setRecommendedGroup((await groupStudying_getAllRecommendedGroup()).data)
        setGroups((await groupStudying_getAllRecommendedGroup()).data)
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
    //const intervalId = setInterval(fetchData, 1000);
    // // Hủy interval khi component bị unmounted
    //return () => clearInterval(intervalId);
  }, [props.userName]);
// =======
//   const [groups, setGroups] = useState([]);
// >>>>>>> Tesing-expo

  const findGroupByText = async (text) => {
    if (text.length > 0) {
      const responseData = await groupStudying_findGroupbyName(text);
      setGroups(responseData);
    } else {
//<<<<<<< Tesing-Expo
      //setGroups([]);
      await setGroups(recommendedGroup)
      console.log(recommendedGroup)

// =======
//       const responseData = await groupStudying_getAllRecommendedGroup();
//       setGroups(responseData);
// >>>>>>> Tesing-expo
    }
  };

  useEffect(() => {
    findGroupByText("");
  }, []); // để [] là chỉ chạy 1 lần, cần chạy cái này để lấy danh sách recommend đầu tiên đã.

  return (
    <View style={styles.container}>
      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          findGroupByText(text);
        }}
      />

      <RowSectionTitle
        text={"☆☆☆ Các nhóm phù hợp với bạn ☆☆☆"}
        style={styles.rowSectionTitle}
      />

      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <TabFindByTopicsItems
            group={item}
            onPress={() => navigate("GroupInfoForViewer", { id: item.groupID })}
          />
        )}
        keyExtractor={(item) => item.groupID}
        extraData={navigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  rowSectionTitle: { alignSelf: "center", marginStart: 0 },
});
