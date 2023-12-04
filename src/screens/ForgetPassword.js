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

const ForgetPassword = (props) => {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //use for api
  const handleForgetPassword = async () => {
    navigate("Verification");
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.partitionTop} />

      <View style={styles.partitionMiddle}>
        <View style={styles.forgetPasswordView}>
          <Text style={styles.forgetPasswordText}>ForgetPassword</Text>
        </View>

        <View style={styles.mainView}>
          <View /* username */ style={styles.textInputView}>
            <Image source={images.personIcon} style={styles.textInputImage} />
            <TextInput
              style={styles.textInputTypingArea}
              inputMode="text"
              placeholder="Username"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <CommonButton
            onPress={handleForgetPassword}
            title={"continue".toUpperCase()}
          />
        </View>
      </View>

      <View style={styles.partitionBottom} />
    </View>
  );
};
export default ForgetPassword;

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
  forgetPasswordView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  forgetPasswordText: {
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
