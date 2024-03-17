import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import { CommonButton, Icon } from "../components";
import { auth_getAuthOTP, user_createAccountData } from "../api";

const Verification = (props) => {
  const { userName, api, newUser, otp, kind: actionType } = props.route.params;
  //userName, api are for ForgetPassword
  //newUser, otp are for Registration
  //actionType: ForgetPassword (0) - Registration (1)

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //use for api: ForgetPassword
  const [OTP, setOTP] = useState("-1");
  const [otpFromAPI, setOtpFromAPI] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const getAuthOTP = await auth_getAuthOTP(api);
      setOtpFromAPI(getAuthOTP);
    };
    fetchData();
  }, [props.userName]);

  const handleVerification_ForgetPassword = async () => {
    alert(`ForgetPassword: otp từ hệ thống: ${otpFromAPI}, từ màn hình: ${OTP},`);

    if (otpFromAPI == OTP) {
      navigate("ResetPassword", {
        userName: userName,
      });
    } else {
      //alert("OTP không đúng");
    }
  };

  //use for api: Registration
  const handleVerification_Registration = async () => {
    alert(`Registration: otp từ hệ thống: ${otp}, từ màn hình: ${OTP},`);

    if (otp == OTP) {
      const dataResponse = await user_createAccountData(newUser);
      if (dataResponse == newUser.userName) {
        alert("Đăng ký thành công, hãy đăng nhập và trải nghiệm");
        navigate("Login");
      } else {
        //unsuccessful
        alert("Đã có lỗi xảy ra, vui lòng thử lại");
      }
    } else {
      //alert("OTP không đúng");
    }
  };

  //final handleVerification
  const handleVerification = async () => {
    if (actionType === 0 || actionType === "ForgetPassword") {
      handleVerification_ForgetPassword();
    } else if (actionType === 1 || actionType === "Registration") {
      handleVerification_Registration();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={images.decorStuff01} style={styles.decorStuffTop} />
      <Image source={images.decorStuff02} style={styles.decorStuffBottom} />

      <View style={styles.partitionMiddle}>
        <View style={styles.forgetPasswordView}>
          <Text style={styles.forgetPasswordText}>Xác thực email</Text>
        </View>

        <View style={styles.mainView}>
          <View /* Verification code */ style={styles.textInputView}>
            <Icon
              name={icons.emailCheckMarkIcon}
              size={55}
              color={colors.PrimaryBackground}
              style={{ marginTop: 25 }}
            />
            <View>
              <Text>Mã xác thực:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                maxLength={6}
                inputMode="numeric"
                onChangeText={(number) => setOTP(number)}
                placeholder="Nhập mã xác thực"
                placeholderTextColor={colors.noImportantText}
              />
            </View>
          </View>

          <CommonButton
            onPress={handleVerification}
            title={"tiếp tục".toUpperCase()}
          />
        </View>
      </View>
    </View>
  );
};
export default Verification;

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
