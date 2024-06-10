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
import TabSuggestAndFindItems from "./TabSuggestAndFindItems";
import { images, icons, colors, fontSizes } from "../../../constants";
import { SearchBarTransparent, RowSectionTitle } from "../../../components";
import {
  groupStudying_findGroupbyName,
  groupStudying_getAllRecommendedGroup,
} from "../../../api";

export default function TabSuggestions(props) {
  const [groups, setGroups] = useState([]);
  const [recommendedGroup, setRecommendedGroup] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState("☆☆☆ Các nhóm phù hợp với bạn ☆☆☆")

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRecommendedGroup(await groupStudying_getAllRecommendedGroup())
        setGroups(await groupStudying_getAllRecommendedGroup())
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

  const findGroupByText = async (text) => {
    if (text.length >= 1) {
      //console.log(text)
      const response = await groupStudying_findGroupbyName(text);
      await setGroups(response);
      setTitle("Kết quả tìm kiếm: " + text)
    } else {
      //setGroups([]);
      await setGroups(recommendedGroup)
      console.log(recommendedGroup)
      setTitle("☆☆☆ Các nhóm phù hợp với bạn ☆☆☆")
    }
  }

  return (
    <View style={styles.container}>
      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          findGroupByText(text);
        }}
      />

      <RowSectionTitle
        text={title}
        style={styles.rowSectionTitle}
      />

      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <TabSuggestAndFindItems
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
