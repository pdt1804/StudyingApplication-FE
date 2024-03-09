import React, { useState, useEffect, useMemo } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import TabTypePostItems from "./TabTypePostItems";
import axios from "axios";
import { API_BASE_URL } from "../../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TabTypePost(props) {
  //list of example = state
  const [types, setTypes] = useState([]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation
  const { navigate, goBack } = props.navigation;

  const [username, setUsername] = useState('');

  const [group, setGroup] = useState('');

  useEffect(() => {
    const fetchData = async () => {

        const response = await axios.get(API_BASE_URL + "/api/v1/blog/getAllSubject?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });
      
        const responseGroup = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        const extractToken = await axios.get(API_BASE_URL + "/api/v1/information/ExtractBearerToken", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setUsername(extractToken.data)
        
        setGroup(responseGroup.data)
        setTypes(response.data);
    };

    fetchData(); // Gọi fetchData ngay sau khi component được mount

    // Sử dụng setInterval để gọi lại fetchData mỗi giây
       const intervalId = setInterval(fetchData, 3000);

      // // Hủy interval khi component bị unmounted
       return () => clearInterval(intervalId);
    }, [props.userName, username])


    const showTextInputAlert = () => {
      Alert.prompt(
        'Tạo chủ đề mới',
        'Hãy nhập tên chủ đề:',
        [
          {
            text: 'Hủy',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async (text) => {
              if (text.length == 0)
              {
                alert('Tạo không thành công, hãy nhập tên chủ đề')
                return;
              }
              if (group.leaderOfGroup.userName == username) {

                var form = new FormData()
                form.append("groupID", await AsyncStorage.getItem("groupID"))
                form.append("nameSubject", text)

                const response = await axios.post(
                  API_BASE_URL +
                    '/api/v1/blog/createNewSubject', form, {
                      headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
                      },
                    }
                );
                if (response.status == 200) {
                  alert("Thêm thành công")
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
        '',
        'default'
      );
    };

  const CreateSubject = async () => {
    showTextInputAlert();
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarAndButtonView}>
        <View /* Search bar */ style={styles.searchBarView}>
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
          onPress={CreateSubject}
        >
          <Text style={styles.buttonText}>{"Tạo chủ đề mới"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {types.filter((eachType) =>
          eachType.nameSubject
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
          .map((eachType) => (
            <TabTypePostItems
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
export default TabTypePost;

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
