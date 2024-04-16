import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import TabYourGroupsItems from "./TabYourGroupsItems";
import {
  Icon,
  SearchBarAndButton,
  CommonButton,
  TextInputMediumIcon,
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

  const [modalVisible, setModalVisible] = useState(false);

  const [newGroupName, setNewGroupName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCreateGroup = async () => {
    if (newGroupName.length > 8) {
      const response = await group_createGroup(newGroupName, newPassword);
      if (response.status == 200) {
        alert("Tạo nhóm thành công, vui lòng vào nhóm mới để thêm thành viên");
        setModalVisible(false)
      }
    } else {
      alert("Nhập tối thiểu 9 ký tự cho tên nhóm");
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.fadeModalView}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.slideModalView}>
          <View style={styles.headerView}>
            <Text style={styles.title}>Tạo nhóm mới</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Icon
                name={icons.cancelBlankIcon}
                size={30}
                color={colors.GrayBackground}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contentView}>
            <View style={styles.mainView}>
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
          </View>
        </View>
      </Modal>

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

  headerView: {
    width: '98%',
    height: '9%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  title: {
    marginLeft: "5%",
    fontSize: fontSizes.h4,
    fontWeight: "bold",
  },

  slideModalView: {
    flex: 1,
    width: "99%",
    marginTop: "33%",
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "center",
  },
  fadeModalView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
  },
  contentView: {
    width: "90%",
    marginTop: '5%',
    marginHorizontal: "10%",
    borderRadius: 20,
    paddingHorizontal: 35,
    alignItems: "center",
  },
});
