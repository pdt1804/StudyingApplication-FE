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
import { SearchBarTransparent, Icon } from "../../../components";
import { Dropdown } from "react-native-element-dropdown";
import { groupStudying_getAllGroupByTopics, group_findGroupbyName, information_getAllTopics } from "../../../api";
import { groupStudying_getAllGroupByTopic } from "../../../api/ReNewStyle/groupStudyingController";


function TabFindByTopics(props) {
  const { navigate, goBack } = props.navigation;
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [listTopics, setListTopics] = useState([]);

  const [isDropBarFocus, setIsDropBarFocus] = useState(false);

  useEffect(() => {
    fetchDataGroups();
    const intervalId = setInterval(fetchDataGroups, 1000);
    return () => clearInterval(intervalId);
  }, [searchText]);

  useEffect(() => {
    fetchDataTopics();
  }, []); // empty means run only once

  const fetchDataGroups = async () => {
    try {
      if (searchText.length >= 1) {
        const response = await group_findGroupbyName(searchText);
        setGroups(response.data);
        setListTopics(await information_getAllTopics());
        //setFilteredList(listTopics.map((topic) => ({ label: topic.topicName, value: topic.topicName })))
      } else {
        setGroups([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const fetchDataTopics = async () => {
    const topics = await information_getAllTopics();
    setListTopics(
      topics.map((topic) => ({
        label: topic.topicName,
        value: topic.topicName,
      }))
    );
  };

  const selectTopic = async (item) => {
    setSearchText(item.value);
    setIsDropBarFocus(false);
    console.log(item._index)
    const response = await groupStudying_getAllGroupByTopic((item._index + 1));
    setGroups(response.data)
    console.log(response.data)
  }

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isDropBarFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={listTopics}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isDropBarFocus ? "Select ritem" : "..."}
        searchPlaceholder="Search..."
        value={searchText}
        onFocus={() => setIsDropBarFocus(true)}
        onBlur={() => setIsDropBarFocus(false)}
        onChange={(item) => {
          selectTopic(item)
        }}
        renderLeftIcon={() => (
          <Icon
            name={icons.searchIcon}
            size={20}
            color={isDropBarFocus ? "blue" : "black"}
          />
        )}
      />

      <Text>{searchText}</Text>

      <ScrollView>
        {groups
          .filter((eachGroup) =>
            eachGroup.nameGroup.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachGroup) => (
            <TabFindByTopicsItems
              group={eachGroup}
              key={eachGroup.groupID}
              onPress={() => {
                navigate("GroupInfo", {id: eachGroup.groupID});
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default TabFindByTopics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  dropdown: {
    height: "auto",
    minHeight: 50,
    marginHorizontal: 10,
    marginVertical: 15,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
