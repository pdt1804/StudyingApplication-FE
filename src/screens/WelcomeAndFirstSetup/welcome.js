import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import { CommonButton, Icon } from "../components";
import { user_register } from "../api";
import CryptoJS from "crypto-js";

const Welcome = (props) => {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //states to store email/password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  //use for api
  const handleRegister = async () => {
    const result = await user_register(username, password, email, rePassword);
    if (result) {
      navigate("Verification", {
        newUser: result.newUser,
        otp: result.otp,
        actionType: "Registration",
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.partitionTop} />

      <View style={styles.partitionMiddle}>
        <View style={styles.welcomeView}>
          <Image source={images.uitLogo} style={styles.imageUIT} />
        </View>

        <View style={styles.mainView}>
          <View /* username */ style={styles.textInputView}>
            <Icon
              name={icons.personIcon}
              size={30}
              color={colors.PrimaryBackground}
            />
            <View>
              <TextInput
                style={styles.textInputTypingArea}
                inputMode="text"
                onChangeText={(text) => {
                  setUsername(text);
                }}
                placeholder="Username"
                placeholderTextColor={colors.placeholder}
              />
              <View style={styles.blackLine} />
            </View>
          </View>

          <View /* email */ style={styles.textInputView}>
            <Icon
              name={icons.emailIcon}
              size={30}
              color={colors.PrimaryBackground}
            />
            <View>
              <TextInput
                style={styles.textInputTypingArea}
                inputMode="email"
                onChangeText={(text) => {
                  setEmail(text);
                }}
                placeholder="Email"
                placeholderTextColor={colors.placeholder}
              />
              <View style={styles.blackLine} />
            </View>
          </View>

          <View /* password */ style={styles.textInputView}>
            <Icon
              name={icons.keyIcon}
              size={30}
              color={colors.PrimaryBackground}
            />
            <View>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                onChangeText={(text) => {
                  setPassword(text);
                }}
                placeholder="Password"
                placeholderTextColor={colors.placeholder}
              />
              <View style={styles.blackLine} />
            </View>
          </View>

          <View /* re-enter password */ style={styles.textInputView}>
            <Icon
              name={icons.addKeyIcon}
              size={30}
              color={colors.PrimaryBackground}
            />
            <View>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                onChangeText={(text) => {
                  setRePassword(text);
                }}
                placeholder="Re-enter Password"
                placeholderTextColor={colors.placeholder}
              />
              <View style={styles.blackLine} />
            </View>
          </View>

          <CommonButton
            onPress={handleRegister}
            title={"Đăng Ký".toUpperCase()}
          />

          <TouchableOpacity
            onPress={() => {
              navigate("Login");
            }}
            style={styles.loginNavigate}
          >
            <Text style={styles.loginNavigateText}>Về màn hình Đăng Nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PrimaryContainer,
    flex: 1,
  },
  partitionTop: {
    flex: 1,
  },
  partitionMiddle: {
    flex: 9,
    width: "100%",
  },
  /*   partitionBottom: {
    flex: 2,
  }, */
  welcomeView: {
    flex: 3,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
  imageUIT: {
    width: 200,
    height: 200,
  },
  mainView: {
    flex: 7,
    width: "99%",
    paddingTop: 40,
    borderColor: colors.transparentWhite,
    borderWidth: 2,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: colors.transparentWhite,
    alignSelf: "center",
  },
  textInputView: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 40,
    alignItems: "center",
  },
  textInputTypingArea: {
    width: 300,
    height: 45,
  },
  blackLine: {
    height: 1,
    backgroundColor: "black",
  },
  loginNavigate: {
    marginHorizontal: 55,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginNavigateText: {
    padding: 10,
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: "blue",
  },
});
