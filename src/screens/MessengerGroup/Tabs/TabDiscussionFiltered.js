import React, { useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,Modal, Button,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { SearchBarAndButton } from "../../../components";
import { UIHeader } from "../../../components";
import TabDiscussionItems from "./TabDiscussionItems";
import axios from "axios";
import { API_BASE_URL } from "../../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FloatingAction } from "react-native-floating-action";

const floatingActions = [
  {
    text: "Chỉnh sửa chủ đề",
    icon: icons.pencilIcon,
    name: "bt_edit",
    position: 1,
  },
  {
    text: "Xóa chủ đề",
    icon: icons.trashCanIcon,
    name: "bt_delete",
    position: 2,
  },
];

function TabDiscussionFiltered(props) {
  let { nameSubject, subjectID } = props.route.params.type;

  //navigation
  const { navigate, goBack } = props.navigation;

  const [topics, setTopics] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [username, setUsername] = useState("");
  const [leaderOfGroup, setLeaderOfGroup] = useState("");
  const [groupID, setGroupID] = useState("");
  const [newSubjectName, setNewSubjectName] = useState(nameSubject);

  useEffect(() => {
    const fetchData = async () => {
      const extractToken = await axios.get(
        API_BASE_URL + "/api/v1/information/ExtractBearerToken",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      setUsername(extractToken.data);

      const response = await axios.get(
        API_BASE_URL +
          "/api/v1/blog/getAllBlogBySubject?groupID=" +
          (await AsyncStorage.getItem("groupID")) +
          "&subjectID=" +
          subjectID,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      //console.log(response.data)
      setTopics(response.data);

      const responseGroup = await axios.get(
        API_BASE_URL +
          "/api/v1/groupStudying/findGroupbyId?groupID=" +
          (await AsyncStorage.getItem("groupID")),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      setLeaderOfGroup(responseGroup.data.leaderOfGroup.userName);

      setGroupID(responseGroup.data.groupID);
    };

    fetchData(); // Gọi fetchData ngay sau khi component được mount

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 3000);

    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);
  }, [props.userName, username]);

  const deleteSubject = () => {
    if (username != leaderOfGroup) {
      alert("Bạn không phải nhóm trưởng");
    } else {
      Alert.alert(
        "Xác nhận xoá",
        "Bạn có chắc chắn muốn xoá?",
        [
          {
            text: "Huỷ",
            style: "cancel",
          },
          {
            text: "Xoá",
            style: "destructive",
            onPress: async () => {
              const response = await axios.delete(
                API_BASE_URL +
                  "/api/v1/blog/sureToDeleteSubject?subjectID=" +
                  subjectID +
                  "&groupID=" +
                  groupID,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization:
                      "Bearer " + (await AsyncStorage.getItem("username")),
                  },
                }
              );

              if (response.status == 200) {
                goBack();
              } else {
                alert("Kiểm tra lại mạng, xoá không thành công");
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

const showTextInputAlert = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    // Xử lý giá trị nhập vào tại đây
    console.log(inputValue);
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{ margin: 20, padding: 20, backgroundColor: 'white' }}>
          <Text>Hãy nhập tên chủ đề:</Text>
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          />
          <Button title="Hủy" onPress={() => setModalVisible(false)} />
          <Button title="Sửa" onPress={handleConfirm} />
        </View>
      </Modal>

      <Button title="Sửa tên chủ đề" onPress={() => setModalVisible(true)} />
    </View>
  );
};

/* 
  const showTextInputAlert = () => {
    Alert.prompt(
      "Sửa tên chủ đề",
      "Hãy nhập tên chủ đề:",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Sửa",
          onPress: async (text) => {
            if (text.length == 0) {
              alert("Sửa không thành công, vui lòng nhập tên chủ đề");
              return;
            }
            if (true) {
              var form = new FormData();
              form.append("subjectID", subjectID);
              form.append("newNameSubject", text);

              const response = await axios.put(
                API_BASE_URL + "/api/v1/blog/updateSubject",
                form,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization:
                      "Bearer " + (await AsyncStorage.getItem("username")),
                  },
                }
              );
              if (response.status == 200) {
                alert("Sửa thành công");
                setNewSubjectName(text);
              } else {
                alert("Đã có lỗi xảy ra");
              }
            } else {
              alert("Bạn không phải trưởng nhóm");
            }
          },
        },
      ],
      "plain-text",
      nameSubject,
      "default"
    );
  };
 */
  const updateSubject = () => {
    if (username != leaderOfGroup) {
      alert("Bạn không phải nhóm trưởng");
    } else {
      showTextInputAlert();
    }
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={newSubjectName}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
      />

      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Tạo bài đăng"}
        buttonOnPress={() => {
          navigate("CreatePost", { subjectID: subjectID });
        }}
        buttonLength={"100%"}
      />

      <ScrollView style={styles.listContainer}>
        {topics
          .filter((eachTopic) =>
            eachTopic.content.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachTopic) => (
            <TabDiscussionItems
              topic={eachTopic}
              key={eachTopic.blogID}
              onPress={() => {
                navigate("ShowPost", {
                  topic: eachTopic,
                  nameSubject: nameSubject,
                  subjectID: subjectID,
                });
              }}
            />
          ))}
      </ScrollView>

      <FloatingAction
        actions={floatingActions}
        position="right"
        onPressItem={(name) => {
          name == "bt_edit" ? updateSubject() : deleteSubject();
        }}
      />
    </View>
  );
}
export default TabDiscussionFiltered;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  listContainer: {
    flex: 1,
    margin: 7,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
