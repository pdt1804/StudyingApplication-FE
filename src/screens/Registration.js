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
import axios from "axios";
import CryptoJS from "crypto-js";
import { API_BASE_URL } from "../../DomainAPI";

const Registration = (props) => {

  const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
  };

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //states for validating
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  //states to store email/password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");

  //use for api
  const handleRegister = async () => {
    let newUser = {
      userName: username,
      passWord: hashPassword(password),
      Email: email,
    };

    const checkUsername = await axios.get(API_BASE_URL + "/api/v1/user/checkUserName?userName=" + username)

    if (checkUsername.data == true)
    {
      alert('Đã tồn tại username này')
      return;
    }

    if (username.length > 8 && password.length > 8) {
      try {
        if (password === rePassword) {
          const response = await axios.get(API_BASE_URL + "/api/v1/user/GetAuthenticationCode?email=" + email)
          
          navigate("VerificationToRegistration", {newUser: newUser, otp: response.data})
          
        }
        else
        {
          alert("mật khẩu và nhập lại mật khẩu không giống")
        }
      } catch (catchError) {
        console.error(catchError.message);
      }
    } else {
      alert("Tài khoản và mật khẩu phải có tối thiểu 8 kí tự");
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
                placeholderTextColor={colors.placeholder}
              />
              <View style={styles.blackLine} />
            </View>
          </View>

          <View /* email */ style={styles.textInputView}>
            <Image source={images.emailIcon} style={styles.textInputImage} />
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
                placeholderTextColor={colors.placeholder}
              />
              <View style={styles.blackLine} />
            </View>
          </View>

          <View /* re-enter password */ style={styles.textInputView}>
            <Image source={images.addKeyIcon} style={styles.textInputImage} />
            <View>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                onChangeText={(text) => {
                  setrePassword(text);
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

      {keyboardIsShown == false && <View style={styles.partitionBottom} />}
    </View>
  );
};
export default Registration;

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
  textInputImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: 10,
    tintColor: colors.blueIcon,
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
