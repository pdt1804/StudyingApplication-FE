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
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { CommonButton } from "../../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../../api/DomainAPI";
import axios from "axios";
import GroupInfo from "./GroupInformation";

function CreateGroup(props) {
  
  const [newGroupName, setNewGroupName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const handleCreateGroup = async () => {

    if (newGroupName.length > 8)
    {
        var form = new FormData()
        form.append('nameGroup', newGroupName)
        form.append('passWord', newPassword)
        form.append('image', "https://www.iconbunny.com/icons/media/catalog/product/1/5/1563.8-team-ii-icon-iconbunny.jpg")

        const response = await axios.post(API_BASE_URL + "/api/v1/groupStudying/createGroup", form, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })
        
        if (response.status == 200)
        {
            alert('Tạo nhóm thành công, vui lòng vào nhóm mới để thêm thành viên');
            navigate('GroupChat');
        }
    }
    else
    {
        alert('Nhập tối thiểu 9 ký tự cho tên nhóm')
    }

  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Tùy chỉnh"}
        leftIconName={images.backIcon}
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
              <Text style={styles.yourInformationText}>Thông tin của bạn</Text>
            </View>

            <View style={styles.mainView}>
              <View /* new Username */ style={styles.textInputView}>
                <Image
                  source={images.personCircleIcon}
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
                  source={images.phoneRingCircleIcon}
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
                onPress={handleCreateGroup}
                title={"Tạo nhóm".toUpperCase()}
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
export default CreateGroup;

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