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
import { API_BASE_URL } from "../../../../DomainAPI";
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
      <Image source={images.chevronRightIcon} style={styles.eachOptionIcon} />
    </TouchableOpacity>
  );
}

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const ShowProfileStranger = (props) => {
  
  let { userName, image, fulName, phoneNumber, yearOfBirth, gender, email } = props.route.params;

  if (image == null)
  {
    image = "https://static.vecteezy.com/system/resources/previews/019/243/593/original/illustration-realistic-cute-blue-person-icon-3d-creative-isolated-on-background-vector.jpg";
  }

  //navigation
  const { navigate, goBack } = props.navigation;

  //handle button here  
  const handleButton = async () => {}

  const AddFriend = async () => {

    const response = await axios.post(API_BASE_URL + "/api/v1/friendship/addFriend?sentUserName=" + await AsyncStorage.getItem('username') + "&receivedUserName=" + userName)
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
            <TouchableOpacity onPress={ShowPicture}>
              <Image source={{ uri: image }} style={styles.profileImage} />
              <Text style={styles.profileUsername}>{fulName}</Text>
            </TouchableOpacity>
          </View>

          <GroupOption text={"Thông tin tài khoản"} />

          <EachOptionViewOnly icon={images.phoneIcon} text={"Số điện thoại: " + (phoneNumber == 0 ? "chưa cập nhật" : (0 + phoneNumber))} />
          <EachOptionViewOnly icon={images.emailIcon} text={"Email: " + (email != null ? email : "chưa cập nhật")} />
          <EachOptionViewOnly icon={images.personIcon} text={"Giới tính: " + (gender != null ? gender : "chưa cập nhật")} />
          <EachOptionViewOnly icon={images.documentBlackIcon} text={"Năm sinh: " + (yearOfBirth == 0 ? "chưa cập nhật" : yearOfBirth)} />

          <CommonButton
            onPress={AddFriend}
            title={"Thêm bạn".toUpperCase()}
          />
        </View>
      </ScrollView>

      <UIHeader
        title={null}
        leftIconName={images.backIcon}
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
export default ShowProfileStranger;

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
