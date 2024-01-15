import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { images, colors, fontSizes } from "../constants/index";
import { CommonButton } from "../components";
import axios from "axios";

const Verification = (props) => {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //use for api
  const [otp, setOTP] = useState("-1");
  const [otpFromAPI, setOtpFromAPI] = useState("");

  const { userName, api } = props.route.params;

  useEffect(() => {
    const fetchData = async () => {

        const getAuthOTP = await axios.get(api);
        setOtpFromAPI(getAuthOTP.data)

    };

    fetchData();
  }, [props.userName]);

  const handleVerification = async () => {
    if (otpFromAPI == otp) {
      navigate("ResetPassword", {
        userName: userName,
      });
    } else {
      alert("OTP không đúng");
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
            <Image
              source={images.emailCheckMarkIcon}
              style={styles.textInputImage}
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
