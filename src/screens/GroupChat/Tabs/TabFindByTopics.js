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
import { Dropdown } from "../../../components";
import {
  groupStudying_getAllGroupByTopics,
  group_findGroupbyName,
  information_getAllTopics,
} from "../../../api";
import { groupStudying_getAllGroupByTopic } from "../../../api/ReNewStyle/groupStudyingController";

function TabFindByTopics(props) {
  const { navigate, goBack } = props.navigation;
  const [groups, setGroups] = useState([]);
  const [listTopics, setListTopics] = useState([]);

  const [isDropBarFocus, setIsDropBarFocus] = useState(false);

  useEffect(() => {
    fetchDataTopics();
  }, []); // empty means run only once

  const fetchDataTopics = async () => {
    const topics = await information_getAllTopics();
    setListTopics(
      topics.map((topic) => ({
        label: topic.topicName,
        value: topic.topicID,
      }))
    );
  };

  const selectTopic = async (item) => {
    setIsDropBarFocus(false);
    const response = await groupStudying_getAllGroupByTopic(item.value);
    setGroups(response.data);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        data={listTopics}
        onSelect={(item) => {
          selectTopic(item);
        }}
      />

      <ScrollView>
        {groups
          .map((eachGroup) => (
            <TabFindByTopicsItems
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
