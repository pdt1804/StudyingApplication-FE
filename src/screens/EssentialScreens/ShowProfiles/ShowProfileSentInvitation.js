import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import { UIHeader, CommonButton, DoubleCommonButton } from "../../../components";
import { API_BASE_URL } from "../../../api/DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function GroupOption(props) {
  const { text } = props;

  return (
    <View style={styles.groupOptionsView}>
      <Text style={styles.groupOptionsText}>{text}</Text>
    </View>
  );
}

function EachOptionViewOnly(props) {
  const { icon, text } = props;

  return (
    <View style={styles.eachOptionView}>
      <Image source={icon} style={styles.eachOptionIcon} />
      <Text style={styles.eachOptionText}>{text}</Text>
    </View>
  );
}

function EachOptionNavigate(props) {
  const { icon, text, onPress } = props;

  return (
    <TouchableOpacity style={styles.eachOptionView} onPress={onPress}>
      <Image source={icon} style={styles.eachOptionIcon} />
      <Text style={styles.eachOptionText}>{text}</Text>
      <View style={{ flex: 1 }} />
      <Image source={icons.chevronRightIcon} style={styles.eachOptionIcon} />
    </TouchableOpacity>
  );
}

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const ShowProfileSentInvitation = (props) => {
  
  let { userName, image, fulName, phoneNumber, yearOfBirth, gender, email } = props.route.params;

  //navigation
  const { navigate, goBack } = props.navigation;

  //handle button here  
  const handleButton = async () => {}

  const UndoAddFriend = async () => {

    const response = await axios.post(API_BASE_URL + "/api/v1/friendship/undoInvitationFriend" , {receivedUserName: userName}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })
    goBack();
}

const ShowPicture = () => {
  navigate("ShowPicture", {file: image})
}

  return (
    <View style={styles.container}>
      <ScrollView>
        <View /* the top color */ style={styles.colorView} />
        <View style={styles.mainView}>
          <View /* Profile picture */ style={styles.profileView}>
          <TouchableOpacity style={styles.profileView} onPress={ShowPicture}>
              <Image source={{ uri: image }} style={styles.profileImage} />
              <Text style={styles.profileUsername}>{fulName}</Text>
            </TouchableOpacity>
          </View>

          <GroupOption text={"Thông tin tài khoản"} />

          <EachOptionViewOnly icon={icons.phoneIcon} text={"Số điện thoại: " + (phoneNumber == 0 ? "chưa cập nhật" : (0 + phoneNumber))} />
          <EachOptionViewOnly icon={icons.emailIcon} text={"Email: " + (email != null ? email : "chưa cập nhật")} />
          <EachOptionViewOnly icon={icons.personIcon} text={"Giới tính: " + (gender != null ? gender : "chưa cập nhật")} />
          <EachOptionViewOnly icon={icons.documentBlackIcon} text={"Năm sinh: " + (yearOfBirth == 0 ? "chưa cập nhật" : yearOfBirth)} />

          <CommonButton
            onPress={UndoAddFriend}
            title={"Thu hồi".toUpperCase()}
          />
        </View>
      </ScrollView>

      <UIHeader
        title={null}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={styles.UIHeaderMainStyle}
        iconStyle={styles.UIHeaderIconStyle}
      />
    </View>
  );
};
export default ShowProfileSentInvitation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  UIHeaderMainStyle: {
    top: 0,
    position: "absolute",
    backgroundColor: null,
  },
  UIHeaderIconStyle: { tintColor: colors.inactive },
  mainView: {
    flex: 1,
    marginTop: 290,
  },
  colorView: {
    height: 400,
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: generateColor(),
  },
  profileView: {
    height: 200,
    alignItems: "center",
  },
  profileImage: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 90,
    borderColor: "white",
    borderWidth: 5,
  },
  profileUsername: {
    color: "black",
    fontSize: fontSizes.h6,
  },
  groupOptionsView: {
    height: 50,
    marginStart: 12,
    justifyContent: "center",
  },
  groupOptionsText: {
    fontSize: fontSizes.h7,
    color: colors.noImportantText,
    paddingStart: 10,
  },
  eachOptionView: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  eachOptionIcon: {
    width: 20,
    height: 20,
    marginStart: 10,
  },
  eachOptionText: {
    fontSize: fontSizes.h6,
    color: "black",
    paddingStart: 15,
  },
});
