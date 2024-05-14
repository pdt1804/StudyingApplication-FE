import React, { useState } from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes, icons } from "../../constants/index";
import { UIHeader, CommonButton, TextInputMediumIcon } from "../../components";
import CryptoJS from "crypto-js";
import { user_profile_changePassword } from "../../api";

const ResetPasswordInSetting = (props) => {
  const { navigate, goBack, push } = props.navigation;

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("none");
  const [rePassword, setRePassword] = useState("none");

  //use for api
  const handleResetPassword = async () => {
    try {
      if (password == rePassword && password.length > 8) {
        const response = await user_profile_changePassword(currentPassword, password);
        if (response.data == "Successful") {
          alert("Đổi thành công");
          goBack();
          setCurrentPassword("");
          setPassword("");
          setRePassword("");
        } else {
          alert("Đổi không thành công");
        }
      }else {
        alert("Thông tin bạn nhập không đúng, vui lòng nhập lại. Mật khẩu cần tối thiểu 9 ký tự.");}
    } catch (Error) {
      console.error(Error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.decorStuff01} style={styles.decorStuffTop} />
      <Image source={images.decorStuff02} style={styles.decorStuffBottom} />

      <View style={styles.partitionMiddle}>
        <View style={styles.forgetPasswordView}>
          <Text style={styles.forgetPasswordText}>Đặt lại mật khẩu!</Text>
        </View>

        <View style={styles.mainView}>
          <TextInputMediumIcon
            name={"Mật khẩu hiện tại"}
            icon={icons.typePasswordIcon}
            placeholder={"Nhập mật khẩu hiện tại"}
            isPassword={true}
            onChangeText={(p) => setCurrentPassword(p)}
          />
          
          <TextInputMediumIcon
            name={"Mật khẩu mới"}
            icon={icons.typeNewPasswordIcon}
            placeholder={"Nhập mật khẩu mới"}
            isPassword={true}
            onChangeText={(p) => setPassword(p)}
          />
          
          <TextInputMediumIcon
            name={"Nhập lại mật khẩu"}
            icon={icons.reTypePasswordIcon}
            placeholder={"Nhập lại mật khẩu"}
            isPassword={true}
            onChangeText={(p) => setRePassword(p)}
          />

          <CommonButton
            onPress={handleResetPassword}
            title={"Đổi mật khẩu".toUpperCase()}
          />
        </View>
      </View>

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
export default ResetPasswordInSetting;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  partitionMiddle: {
    width: "100%",
  },
  UIHeaderMainStyle: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: null,
  },
  UIHeaderIconStyle: { tintColor: colors.inactive },
  forgetPasswordView: {
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
  },
  forgetPasswordText: {
    color: colors.PrimaryOnContainerAndFixed,
    fontSize: fontSizes.h1,
    fontWeight: "bold",
    alignSelf: "center",
  },
  mainView: {
    width: "90%",
    height: 450,
    padding: 15,
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
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
  textInputImage: {
    width: 55,
    height: 55,
    marginRight: 10,
    marginTop: 25,
    tintColor: colors.PrimaryBackground,
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
  decorStuffTop: {
    width: 250,
    height: 120,
    opacity: 0.5,
    resizeMode: "stretch",
    top: "10%",
    left: 0,
    position: "absolute",
  },
  decorStuffBottom: {
    width: 250,
    height: 120,
    opacity: 0.5,
    resizeMode: "stretch",
    bottom: "10%",
    right: 0,
    position: "absolute",
  },
});
