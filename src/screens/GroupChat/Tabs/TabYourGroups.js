import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import TabYourGroupsItems from "./TabYourGroupsItems";
import {
  SearchBarAndButton,
  CommonButton,
  TextInputMediumIcon,
  WhiteSlideBottomUp,
} from "../../../components";
import { images, colors, icons, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { group_getAllGroupofUser, group_createGroup } from "../../../api";

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

  // Button tạo group mới
  const [newGroupName, setNewGroupName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const renderContentCreateGroup = () => {
    return (
      <View>
        <TextInputMediumIcon
          inputMode={"text"}
          name={"Tên nhóm"}
          icon={icons.personCircleIcon}
          placeholder={"Nhập tên nhóm mới"}
          isPassword={false}
          onChangeText={(text) => setNewGroupName(text)}
        />
        <TextInputMediumIcon
          inputMode={"text"}
          name={"Mật khẩu gia nhập nhóm"}
          icon={icons.phoneRingCircleIcon}
          placeholder={"Nhập mật khẩu mới"}
          isPassword={true}
          onChangeText={(text) => setNewPassword(text)}
        />

        <CommonButton
          onPress={handleCreateGroup}
          title={"Tạo nhóm".toUpperCase()}
        />
      </View>
    );
  };

  const handleCreateGroup = async () => {
    if (newGroupName.length > 8) {
      const response = await group_createGroup(newGroupName, newPassword);
      if (response.status == 200) {
        alert("Tạo nhóm thành công, vui lòng vào nhóm mới để thêm thành viên");
        setModalVisible(false);
      }
    } else {
      alert("Nhập tối thiểu 9 ký tự cho tên nhóm");
    }
  };

  return (
    <View style={styles.container}>
      <WhiteSlideBottomUp
        title={"Tạo nhóm mới"}
        renderContent={renderContentCreateGroup}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Tạo nhóm học tập"}
        buttonOnPress={() => {
          setModalVisible(true);
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
