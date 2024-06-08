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
import TabSuggestionsItems from "./TabSuggestionsItems";
import { images, icons, colors, fontSizes } from "../../../constants";
import { SearchBarTransparent } from "../../../components";
import { groupStudying_getAllRecommendedGroup, group_findGroupbyName } from "../../../api";

function TabSuggestions(props) {
  const [groups, setGroups] = useState([]);
  const [recommendedGroup, setRecommendedGroup] = useState([]);

  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

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

  const findGroupByText = async (text) => {
    console.log(text)
    if (text.length >= 1) {
      const response = await group_findGroupbyName(text);
      setGroups(response.data);
    } else {
      //setGroups([]);
      await setGroups(recommendedGroup)
      console.log(recommendedGroup)

    }
  }

  return (
    <View style={styles.container}>
      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          findGroupByText(text);
        }}
      />

      <ScrollView>
        {groups
          .filter((eachGroup) =>
            eachGroup.nameGroup.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachGroup) => (
            <TabSuggestionsItems
              group={eachGroup}
              key={eachGroup.groupID}
              onPress={() => {
                navigate("GroupInfoForViewer", {id: eachGroup.groupID});
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default TabSuggestions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
});
