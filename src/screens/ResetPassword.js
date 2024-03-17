import React, { useState } from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import { CommonButton, Icon } from "../components";
import axios from "axios";
import { API_BASE_URL } from "../../DomainAPI";
import CryptoJS from "crypto-js";

const ResetPassword = (props) => {
  const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
  };

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //use for api
  const { userName } = props.route.params;

  const [password, setPassword] = useState("none");
  const [rePassword, setRePassword] = useState("none");
  const handleResetPassword = async () => {
    try {
      if (password == rePassword && password.length > 8) {
        const response = await axios.post(
          API_BASE_URL +
            "/api/v1/user/ChangePasswordAfterOTP?userName=" +
            userName +
            "&passWord=" +
            password
        );

        if (response.data == true) {
          alert("Thay đổi thành công");
          navigate("Login");
        } else {
          alert("Network Error !");
        }
      } else {
        alert(
          "Không thành công, đảm bảo mật khẩu mới và nhập lại mật khẩu phải giống nhau và có tối thiểu 9 kí tự"
        );
      }
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
            <Icon
              name={icons.typePasswordIcon}
              size={55}
              color={colors.PrimaryBackground}
              style={{ marginTop: 25 }}
            />
            <View>
              <Text>Mật khẩu mới:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                onChangeText={(text) => setPassword(text)}
                placeholder="Nhập mật khẩu mới"
                placeholderTextColor={colors.noImportantText}
              />
            </View>
          </View>
          <View /* Retype password */ style={styles.textInputView}>
            <Icon
              name={icons.reTypePasswordIcon}
              size={55}
              color={colors.PrimaryBackground}
              style={{ marginTop: 25 }}
            />
            <View>
              <Text>Nhập lại mật khẩu:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                onChangeText={(text) => setRePassword(text)}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor={colors.noImportantText}
              />
            </View>
          </View>

          <CommonButton
            onPress={handleResetPassword}
            title={"tiếp tục".toUpperCase()}
          />
        </View>
      </View>
    </View>
  );
};
export default ResetPassword;

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
    height: 350,
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
