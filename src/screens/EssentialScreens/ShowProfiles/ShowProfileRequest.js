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
import {
  UIHeader,
  CommonButton,
  DoubleCommonButton,
} from "../../../components";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../api/DomainAPI";

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

const ShowProfileRequest = (props) => {
  let { userName, image, fulName, phoneNumber, yearOfBirth, gender, email } =
    props.route.params;

  //navigation
  const { navigate, goBack } = props.navigation;

  //handle button here
  const handleAcceptButton = async () => {
    const response = await axios.post(API_BASE_URL + "/api/v1/friendship/acceptInvitation", { sentUserName: userName }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    console.log(response.status);
    goBack();
  };

  const handleRevokeButton = async () => {
    const response = await axios.post(API_BASE_URL + "/api/v1/friendship/refuseInvitation", { sentUserName: userName }, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    console.log(response.status);
    goBack();
  };

  const [buttonName, setButtonName] = useState("Add Friend");

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

          <EachOptionViewOnly icon={images.phoneIcon} text={"Số điện thoại: " + (phoneNumber == 0 ? "chưa cập nhật" : (0 + phoneNumber))} />
          <EachOptionViewOnly icon={images.emailIcon} text={"Email: " + (email != null ? email : "chưa cập nhật")} />
          <EachOptionViewOnly icon={images.personIcon} text={"Giới tính: " + (gender != null ? gender : "chưa cập nhật")} />
          <EachOptionViewOnly icon={images.documentBlackIcon} text={"Năm sinh: " + (yearOfBirth == 0 ? "chưa cập nhật" : yearOfBirth)} />


          {/* <DoubleCommonButton
            onPressLeft={handleAcceptButton}
            titleLeft={"Xác nhận".toUpperCase()}

            styleRight={{
              borderColor: 'black',
              backgroundColor: 'pink'
            }}
            onPressRight={handleRevokeButton}
            titleRight={"Từ chối".toUpperCase()}
          /> */}

          <DoubleCommonButton
            onPressRight={handleAcceptButton}
            titleRight={"Xác nhận".toUpperCase()}

            styleLeft={{
              borderColor: 'black',
              backgroundColor: 'pink'
            }}
            onPressLeft={handleRevokeButton}
            titleLeft={"Từ chối".toUpperCase()}
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
export default ShowProfileRequest;

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
