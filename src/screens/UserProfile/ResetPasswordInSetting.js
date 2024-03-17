import React, { useState } from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { images, colors, fontSizes } from "../../constants/index";
import { UIHeader, CommonButton } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";

const ResetPasswordInSetting = (props) => {

  const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
  };

  const { navigate, goBack, push } = props.navigation;

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("none");
  const [rePassword, setRePassword] = useState("none");

  //use for api
  const handleResetPassword = async () => {
    try {

      console.log(await AsyncStorage.getItem('username'))
      if (password == rePassword && password.length > 8)
      {

        const formData = new FormData();
        formData.append('newPassWord', password);
        formData.append('currentPassWord', currentPassword);

        const response = await axios.post(API_BASE_URL + "/api/v1/information/changePassword", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        if (response.data == "Successful")
        {
          alert("Đổi thành công")
          setCurrentPassword("")
          setPassword("")
          setRePassword("")
        }
        else
        {
          alert("Thông tin bạn nhập không đúng, vui lòng nhập lại")
        }
      }

      // if (currentPassword == responseUserPassWord.data.passWord) {
      //   if (password == rePassword && password.length > 8) {
      //     const response = await axios.post(
      //       API_BASE_URL +
      //         "/api/v1/user/ChangePasswordAfterOTP?userName=" +
      //         (await AsyncStorage.getItem("username")) +
      //         "&passWord=" +
      //         password
      //     );

      //     if (response.data == true) {
      //       alert("Đổi thành công");
      //       setCurrentPassword("");
      //       setPassword("");
      //       setRePassword("");
      //     } else {
      //       alert("Lỗi mạng !");
      //     }
      //   } else {
      //     alert(
      //       "Mật khẩu mới và nhập lại mật khẩu mới không khớp, đảm bảo mật khẩu mới hơn 8 ký tự"
      //     );
      //   }
      // } else {
      //   alert("Mật khẩu bạn nhập không đúng với mật khẩu hiện tại");
      // }
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
          <View /* Password */ style={styles.textInputView}>
            <Image
              source={images.typePasswordIcon}
              style={styles.textInputImage}
            />
            <View>
              <Text>Mật khẩu hiện tại:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                placeholder="Nhập mật khẩu hiện tại"
                placeholderTextColor={colors.noImportantText}
                onChangeText={(p) => setCurrentPassword(p)}
              />
            </View>
          </View>
          <View /* Password */ style={styles.textInputView}>
            <Image
              source={images.typeNewPasswordIcon}
              style={styles.textInputImage}
            />
            <View>
              <Text>Mật khẩu mới:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                placeholder="Nhập mật khẩu mới"
                placeholderTextColor={colors.noImportantText}
                onChangeText={(p) => setPassword(p)}
              />
            </View>
          </View>
          <View /* Retype password */ style={styles.textInputView}>
            <Image
              source={images.reTypePasswordIcon}
              style={styles.textInputImage}
            />
            <View>
              <Text>Nhập lại mật khẩu:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor={colors.noImportantText}
                onChangeText={(p) => setRePassword(p)}
              />
            </View>
          </View>

          <CommonButton
            onPress={handleResetPassword}
            title={"Đổi mật khẩu".toUpperCase()}
          />
        </View>
      </View>

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
