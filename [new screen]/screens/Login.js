import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import { images, colors, fontSizes } from "../constants/index";
import { CommonButton } from "../components";
import { API_BASE_URL } from "../../DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = (props) => {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //Login component and function, use for api
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      if (username != null && password != null) {
        const response = await axios.get(
          API_BASE_URL +
            "/api/v1/user/Authenticate?userName=" +
            username +
            "&passWord=" +
            password
        );

        if (response.data == username) {
          await AsyncStorage.setItem("username", username);
          navigate("UITab");
        } else {
          alert("Username or password aren't correct");
        }
      } else {
        alert("Username or password aren't correct");
      }
    } catch (error) {
      console.error(error.message);
      console.error(error.name);
      alert("Username or password aren't correct");
    }
  };

  //turn off unimportant things when typing
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsShown(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsShown(false);
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.partitionTop} />

      <View style={styles.partitionMiddle}>
        <View style={styles.welcomeView}>
          <Image source={images.uitLogo} style={styles.imageUIT} />
        </View>

        <View style={styles.mainView}>
          <View /* username */ style={styles.textInputView}>
            <Image source={images.personIcon} style={styles.textInputImage} />
            <View>
              <TextInput
                style={styles.textInputTypingArea}
                inputMode="text"
                onChangeText={(text) => {
                  setUsername(text);
                }}
                placeholder="Username"
                placeholderTextColor={colors.placeholderTextColor}
              />
              <View style={styles.blackLine} />
            </View>
          </View>

          <View /* password */ style={styles.textInputView}>
            <Image source={images.keyIcon} style={styles.textInputImage} />
            <View>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                onChangeText={(text) => {
                  setPassword(text);
                }}
                placeholder="Password"
                placeholderTextColor={colors.placeholderTextColor}
              />
              <View style={styles.blackLine} />
            </View>
          </View>

          <View style={styles.navigateTextView}>
            <TouchableOpacity
              onPress={() => {
                navigate("ForgetPassword");
              }}
              style={styles.forgetPassword}
            >
              <Text style={styles.navigateTextText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate("Registration");
              }}
              style={styles.register}
            >
              <Text style={styles.navigateTextText}>Đăng ký</Text>
            </TouchableOpacity>
          </View>

          <CommonButton
            onPress={handleLogin}
            title={"Đăng nhập".toUpperCase()}
          />
        </View>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBackground,
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
  textInputImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: 10,
    tintColor: colors.blueIcon,
  },
  textInputTypingArea: {
    width: 300,
    height: 55,
  },
  blackLine: {
    height: 1,
    backgroundColor: "black",
  },
  navigateTextView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingEnd: 10,
  },
  navigateTextText: {
    padding: 1,
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: "blue",
  },
  forgetPassword: {
    marginHorizontal: 5,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  register: {
    marginHorizontal: 5,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
