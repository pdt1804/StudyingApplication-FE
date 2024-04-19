import React, { useState } from "react";
import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import { UIHeader, CommonButton, Icon } from "../components";
import { auth_getRecoveryCode } from "../api";

const ForgetPassword = (props) => {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //use for api
  const [username, setUsername] = useState(".");
  const handleForgetPassword = async () => {
    try {
      const apiPath = await auth_getRecoveryCode(username);

      navigate("Verification", {
        api: apiPath,
        userName: username,
        actionType: "ForgetPassword",
      });

      // if (response.status == 200) {
      //   navigate("Verification", {
      //     OTP: response.data,
      //     userName: username,
      //   });
      // } else {
      //   alert("Có lẽ email của user này đã bị lỗi");
      //   alert("Hãy liên lạc với chúng tôi theo số điện thoại 09xxxxxxx08 để được giúp đỡ");
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
          <Text style={styles.forgetPasswordText}>Quên mật khẩu?</Text>
        </View>

        <View style={styles.mainView}>
          <View /* username */ style={styles.textInputView}>
            <Icon
              name={icons.personCircleIcon}
              size={55}
              color={colors.PrimaryBackground}
              style={{ marginTop: 25 }}
            />
            <View>
              <Text>Tên đăng nhập:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                inputMode="text"
                onChangeText={(text) => setUsername(text)}
                placeholder="Nhập tên đăng nhập của bạn"
                placeholderTextColor={colors.noImportantText}
              />
            </View>
          </View>

          <CommonButton
            onPress={handleForgetPassword}
            title={"tiếp tục".toUpperCase()}
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
export default ForgetPassword;

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
