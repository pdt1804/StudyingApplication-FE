import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images, colors, fontSizes } from "../constants/index";
import { CommonButton } from "../components";

const ResetPassword = (props) => {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //use for api
  const handleResetPassword = async () => {
    navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.partitionTop} />

      <View style={styles.partitionMiddle}>
        <View style={styles.verificationView}>
          <Text style={styles.verificationText}>ResetPassword!!</Text>
        </View>

        <View style={styles.mainView}>
          <View /* new password */ style={styles.textInputView}>
            <Image source={images.keyIcon} style={styles.textInputImage} />
            <TextInput
              style={styles.textInputTypingArea}
              secureTextEntry={true} // * the password
              inputMode="text"
              placeholder="Your new Password"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View /* re-enter password */ style={styles.textInputView}>
            <Image source={images.keyIcon} style={styles.textInputImage} />
            <TextInput
              style={styles.textInputTypingArea}
              secureTextEntry={true} // * the password
              inputMode="text"
              placeholder="Re-enter Password"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <CommonButton
            onPress={handleResetPassword}
            title={"ResetPassword".toUpperCase()}
          />
        </View>
      </View>

      <View style={styles.partitionBottom} />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBackground,
    flex: 1,
  },
  partitionTop: {
    flex: 3,
  },
  partitionMiddle: {
    flex: 4,
    width: "100%",
  },
  partitionBottom: {
    flex: 3,
  },
  verificationView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  verificationText: {
    color: "black",
    fontSize: fontSizes.h1,
    fontWeight: "bold",
  },
  mainView: {
    flex: 4,
    width: "90%",
    paddingTop: 30,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "rgba(250,250,250,0.8)",
    alignSelf: "center",
  },
  textInputView: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 15,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
  },
  textInputImage: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  textInputTypingArea: {
    width: 250,
    height: 35,
  },
});
