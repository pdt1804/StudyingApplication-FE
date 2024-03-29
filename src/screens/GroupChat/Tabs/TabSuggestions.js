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
import { images, colors, fontSizes } from "../../../constants";
import { SearchBarTransparent } from "../../../components";
import { group_findGroupbyName } from "../../../api";

function TabSuggestions(props) {
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchText.length >= 1) {
          const response = await group_findGroupbyName(searchText);
          setGroups(response.data);
        } else {
          setGroups([]);
        }
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
  }, [searchText]);

  return (
    <View style={styles.container}>
      <SearchBarTransparent
        searchBarOnChangeText={(text) => {
          setSearchText(text);
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
                navigate("GroupSuggestionInfo", { user: eachGroup });
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
