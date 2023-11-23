import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import { images, colors, fontSizes } from "../constants/index";
import { CommonButton } from "../components";

const Login = (props) => {
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);

  //function of navigation to/back
  const { navigate, goBack } = props.navigation;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    navigate("UITab");
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsShown(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsShown(false);
    });
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.fullView}
    >
      <View style={styles.partitionTop} />

      <View style={styles.partitionMiddle}>
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeText}>Welcome!!</Text>
        </View>

        <View style={styles.mainView}>
          <View /* username */ style={styles.textInputView}>
            <Image source={images.personIcon} style={styles.textInputImage} />
            <TextInput
              onChangeText={(text) => {
                setUsername(text);
              }}
              placeholder="Username"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View /* password */ style={styles.textInputView}>
            <Image source={images.keyIcon} style={styles.textInputImage} />
            <TextInput
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          {keyboardIsShown == false && (
            <TouchableOpacity /* forget password */
              onPress={() => {
                navigate("ForgetPassword");
              }}
              style={styles.forgetPassword}
            >
              <Text style={styles.forgetPasswordText}>Forget Password?</Text>
            </TouchableOpacity>
          )}

          {keyboardIsShown == false && (
            <CommonButton onPress={handleLogin} title={"Login".toUpperCase()} />
          )}

          {keyboardIsShown == false && (
            <TouchableOpacity
              onPress={() => {
                navigate("Registration");
              }}
              style={styles.registerNavigate}
            >
              <Text style={styles.registerNavigateText}>
                Don't have a Account? Register
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.partitionBottom}></View>
    </KeyboardAvoidingView>
  );
};
export default Login;

const styles = StyleSheet.create({
  fullView: {
    backgroundColor: "#D7FFFD",
    flex: 1,
  },
  partitionTop: {
    flex: 15,
  },
  partitionMiddle: {
    flex: 60,
    width: "100%",
  },
  partitionBottom: {
    flex: 15,
    backgroundColor: null,
  },
  welcomeView: {
    flex: 20,
    width: "95%",
    alignSelf: "center",
  },
  welcomeText: {
    color: "black",
    fontSize: fontSizes.h1,
    fontWeight: "bold",
  },
  mainView: {
    flex: 80,
    width: "90%",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "rgba(250,250,250,0.8)",
    alignSelf: "center",
  },
  textInputView: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 40,
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
  forgetPassword: {
    marginHorizontal: 5,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  forgetPasswordText: {
    padding: 1,
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: "blue",
  },
  registerNavigate: {
    marginHorizontal: 55,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  registerNavigateText: {
    padding: 11,
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: "orange",
  },
});
