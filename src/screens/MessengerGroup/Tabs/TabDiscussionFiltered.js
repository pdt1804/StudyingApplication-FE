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
import { Dropdown } from "react-native-element-dropdown";
import { images, colors, icons, fontSizes } from "../../../constants";
import { UIHeader } from "../../../components";
import TabDiscussionItems from "./TabDiscussionItems";
import axios from "axios";
import { API_BASE_URL } from "../../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FloatingAction } from "react-native-floating-action";

const floatingActions = [
  {
    text: "Chỉnh sửa chủ đề",
    icon: images.pencilIcon,
    name: "bt_edit",
    position: 1,
  },
  {
    text: "Xóa chủ đề",
    icon: images.trashCanIcon,
    name: "bt_delete",
    position: 2,
  },
];

function TabDiscussionFiltered(props) {
  let { nameSubject, subjectID } = props.route.params.type;

  //list of example = state
  const [topics, setTopics] = useState([]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation
  const { navigate, goBack } = props.navigation;

  const [username, setUsername] = useState('');

  const [leaderOfGroup, setLeaderOfGroup] = useState('');

  const [groupID, setGroupID] = useState('');

  const [newSubjectName, setNewSubjectName] = useState(nameSubject)

  useEffect(() => {
    const fetchData = async () => {

      setUsername(await AsyncStorage.getItem('username'))

      const response = await axios.get(API_BASE_URL + "/api/v1/blog/getAllBlogBySubject?groupID=" + await AsyncStorage.getItem('groupID') + "&subjectID=" + subjectID);

      //console.log(response.data)
      setTopics(response.data);

      const responseGroup = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'))

      setLeaderOfGroup(responseGroup.data.leaderOfGroup.userName)

      setGroupID(responseGroup.data.groupID)
    };

    fetchData(); // Gọi fetchData ngay sau khi component được mount

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
     const intervalId = setInterval(fetchData, 3000);

    // // Hủy interval khi component bị unmounted
     return () => clearInterval(intervalId);
  }, [props.userName, username])

  const deleteSubject = () => {

    if (username != leaderOfGroup)
    {
      alert('Bạn không phải nhóm trưởng')
    }
    else
    {
      Alert.alert(
        'Xác nhận xoá',
        'Bạn có chắc chắn muốn xoá?',
        [
          {
            text: 'Huỷ',
            style: 'cancel',
          },
          {
            text: 'Xoá',
            style: 'destructive',
            onPress: async () => {

              const response = await axios.delete(API_BASE_URL + "/api/v1/blog/sureToDeleteSubject?subjectID=" + subjectID + "&groupID=" + groupID)

              if (response.status == 200)
              {
                goBack();
              }
              else
              {
                alert('Kiểm tra lại mạng, xoá không thành công')
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  }

  const showTextInputAlert = () => {
    Alert.prompt(
      'Sửa tên chủ đề',
      'Hãy nhập tên chủ đề:',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Sửa',
          onPress: async (text) => {
            if (text.length == 0)
            {
                alert("Sửa không thành công, vui lòng nhập tên chủ đề")
                return;
            }
            if (true) {
              const response = await axios.put(
                API_BASE_URL +
                  '/api/v1/blog/updateSubject?subjectID=' +
                   subjectID +
                  '&newNameSubject=' +
                   text
              );
              if (response.status == 200) {
                alert("Sửa thành công")
                setNewSubjectName(text);
              }
              else
              {
                alert("Đã có lỗi xảy ra")
              }
            } else {
              alert('Bạn không phải trưởng nhóm');
            }
          },
        },
      ],
      'plain-text',
       nameSubject,
      'default'
    );
  };

  const updateSubject = () => {
    if (username != leaderOfGroup)
    {
      alert('Bạn không phải nhóm trưởng')
    }
    else
    {
      showTextInputAlert();
    }
  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={newSubjectName}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
      />
      <View style={styles.searchBarAndButtonView}>
        <View style={styles.searchBarView}>
          <Image source={images.searchIcon} style={styles.searchBarImage} />
          <TextInput
            autoCorrect={false}
            inputMode="search"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={styles.searchBarTypingArea}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigate("CreatePost", {subjectID: subjectID});
          }}
        >
          <Text style={styles.buttonText}>{"Tạo bài đăng"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {topics
          .filter((eachTopic) => eachTopic.content
            .toLowerCase()
            .includes(searchText.toLowerCase()))
          .map((eachTopic) => (
            <TabDiscussionItems
              topic={eachTopic}
              key={eachTopic.blogID}
              onPress={() => {
                navigate("ShowPost", { topic: eachTopic, nameSubject: nameSubject, subjectID: subjectID });
              }}
            />
          ))}
      </ScrollView>

<FloatingAction
  actions={floatingActions}
  position="right"
  onPressItem={(name) => {
    name=='bt_edit' ? (
      updateSubject()
    ) : (
      deleteSubject()
    );
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
  searchBarAndButtonView: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarView: {
    width: "50%",
    height: "65%",
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  searchBarTypingArea: {
    height: "75%",
    flex: 1,
    marginRight: 10,
  },
  searchBarImage: {
    width: 22,
    height: 22,
    resizeMode: "stretch",
    marginHorizontal: 8,
  },
  buttonContainer: {
    width: "auto",
    height: "65%",

    marginRight: 10,
    marginTop: 12,

    borderRadius: 20,

    backgroundColor: colors.active,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    paddingHorizontal: 11,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    margin: 7,
  },
  dropdown: {
    flex: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: colors.backgroundWhite,
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
