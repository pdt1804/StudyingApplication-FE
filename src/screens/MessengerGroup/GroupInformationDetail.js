import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { CommonButton } from "../../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../../api/DomainAPI";
import axios from "axios";
import GroupInfo from "./GroupInformation";

function GroupInformationDetail(props) {
  
  const [newGroupName, setNewGroupName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const handleSettings = async () => {
    
    let group = {
        groupID: await AsyncStorage.getItem('groupID'),
        nameGroup: newGroupName,
        passWord: newPassword,
    }
    
    const response = await axios.put(API_BASE_URL + "/api/v1/groupStudying/updateGroup", group, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    });
    
    if (response.status == 200)
    {
        goBack()
    }
    else
    {
        alert("Đã có lỗi mạng xảy ra")
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setNewGroupName(response.data.nameGroup);
        setNewPassword(response.data.passWord);
        
                        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  const handleCancel = async () => {
    navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Tùy chỉnh"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {}}
      />
      <ScrollView>
        <View style={styles.noHeaderContainer}>
          <View style={styles.partitionMiddle}>
            <View style={styles.yourInformationView}>
              <Text style={styles.yourInformationText}>Thông tin nhóm</Text>
            </View>

            <View style={styles.mainView}>
              <View /* new Username */ style={styles.textInputView}>
                <Image
                  source={icons.personCircleIcon}
                  style={styles.textInputImageNoTitle}
                />
                <View>
                  <Text>Tên nhóm:</Text>
                  <TextInput
                    style={styles.textInputTypingArea}
                    inputMode="text"
                    onChangeText={p => setNewGroupName(p)}
                    value={newGroupName}
                    placeholder="Nhập tên nhóm mới"
                    placeholderTextColor={colors.noImportantText}
                  />
                </View>
              </View>
              <View /* new phone number */ style={styles.textInputView}>
                <Image
                  source={icons.phoneRingCircleIcon}
                  style={styles.textInputImage}
                />
                <View>
                  <Text>Mật khẩu gia nhập nhóm:</Text>
                  <TextInput
                    style={styles.textInputTypingArea}
                    inputMode="text"
                    onChangeText={p => setNewPassword(p)}
                    value={newPassword}
                    placeholder="Nhập mật khẩu mới"
                    placeholderTextColor={colors.noImportantText}
                  />
                </View>
              </View>

              <CommonButton
                onPress={handleSettings}
                title={"Lưu thay đổi".toUpperCase()}
              />
            </View>
          </View>

          <Image source={images.decorStuff01} style={styles.decorStuffBottomLeft} />
          <Image source={images.decorStuff02} style={styles.decorStuffBottomRight} />
        </View>
      </ScrollView>
    </View>
  );
}
export default GroupInformationDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
  },
  noHeaderContainer: {
    height: 850,
    justifyContent: "center",
    alignItems: "center",
  },
  partitionMiddle: {
    width: "100%",
  },
  yourInformationView: {
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
  },
  yourInformationText: {
    color: colors.titleScreen,
    fontSize: fontSizes.h2*0.9,
    fontWeight: "bold",
    alignSelf: "center",
  },
  mainView: {
    width: "90%",
    height: 520,
    padding: 15,
    marginBottom: "50%",
    backgroundColor: colors.transparentWhite,
    borderColor: colors.borderedView,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputView: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  textInputImageNoTitle: {
    width: 45,
    height: 45,
    marginRight: 10,
    tintColor: colors.blueIcon,
  },
  textInputImage: {
    width: 55,
    height: 55,
    marginRight: 10,
    marginTop: 25,
    tintColor: colors.blueIcon,
  },
  textInputTypingArea: {
    width: 250,
    height: 55,
    marginTop: 5,
    paddingLeft: 20,
    borderColor: colors.noImportantText,
    borderWidth: 2,
    borderRadius: 20,
  },
  decorStuffBottomRight: {
    width: 250,
    height: 120,
    opacity: 0.5,
    resizeMode: "stretch",
    bottom: "5%",
    right: 0,
    position: "absolute",
  },
  decorStuffBottomLeft: {
    width: 250,
    height: 120,
    opacity: 0.5,
    resizeMode: "stretch",
    bottom: "10%",
    left: 0,
    position: "absolute",
  },
});