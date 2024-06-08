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
  const { navigate, goBack } = props.navigation;

  const [groups, setGroups] = useState([]);

  const findGroupByText = async (text) => {
    if (text.length > 0) {
      const responseData = await groupStudying_findGroupbyName(text);
      setGroups(responseData);
    } else {
      const responseData = await groupStudying_getAllRecommendedGroup();
      setGroups(responseData);
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
