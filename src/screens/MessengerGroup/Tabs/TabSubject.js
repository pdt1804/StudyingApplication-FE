import React, { useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import {
  SearchBarAndButton,
  WhiteSlideBottomUp,
  TextInputMediumIcon,
  CommonButton,
} from "../../../components";
import TabSubjectItems from "./TabSubjectItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  group_findGroupById,
  group_getAllSubject,
  group_extractBearerToken,
  group_createNewSubject,
} from "../../../api";

export default function TabSubject(props) {
  //navigation
  const { navigate, goBack } = props.navigation;

  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("");
  const [types, setTypes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const groupID = await AsyncStorage.getItem("groupID");
      const responseGroup = await group_findGroupById(groupID);
      const responseAllSubject = await group_getAllSubject();
      const extractToken = await group_extractBearerToken();

      setUsername(extractToken.data);
      setGroup(responseGroup.data);
      setTypes(responseAllSubject.data);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [props.userName, username]);

  const [modalVisible, setModalVisible] = useState(false);
  const renderContentCreateSubject = () => {
    return (
      <View>
        <TextInputMediumIcon
          inputMode={"text"}
          name={"Tên chủ đề"}
          icon={icons.activeFAQIcon}
          placeholder={"Nhập tên chủ đề"}
          isPassword={false}
          onChangeText={(text) => setNewSubject(text)}
        />

        <CommonButton
          onPress={handleCreateSubject}
          title={"Tạo chủ đề".toUpperCase()}
        />
      </View>
    );
  };

  const handleCreateSubject = async () => {
    if (newSubject.length == 0) {
      alert("Tạo không thành công, hãy nhập tên chủ đề");
      return;
    }
    if (group.leaderOfGroup.userName == username) {
      const response = await group_createNewSubject(newSubject);
      if (response.status == 200) {
        alert("Thêm thành công");
        setModalVisible(false);
      } else {
        alert("Đã có lỗi xảy ra");
      }
    } else {
      alert("Bạn không phải trưởng nhóm");
    }
  };

  return (
    <View style={styles.container}>
      <WhiteSlideBottomUp
        title={"Tạo chủ đề mới"}
        renderContent={renderContentCreateSubject}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Tạo chủ đề mới"}
        buttonOnPress={() => {
          setNewSubject("");
          setModalVisible(true);
        }}
        buttonLength={"100%"}
      />

      <ScrollView style={styles.listContainer}>
        {types
          .filter((eachType) =>
            eachType.nameSubject
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachType) => (
            <TabSubjectItems
              type={eachType}
              key={eachType.subjectID}
              onPress={() => {
                navigate("TabDiscussionFiltered", { type: eachType });
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
  listContainer: {
    flex: 1,
    margin: 7,
  },
});
