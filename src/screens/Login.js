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

const Login = (props) => {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

 //Login component and function, use for api
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    navigate("UITab");
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
          <Text style={styles.welcomeText}>Welcome!!</Text>
        </View>

        <View style={styles.mainView}>
          <View /* username */ style={styles.textInputView}>
            <Image source={images.personIcon} style={styles.textInputImage} />
            <TextInput
              style={styles.textInputTypingArea}
              inputMode="text"
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
              style={styles.textInputTypingArea}
              secureTextEntry={true} // * the password
              inputMode="text"
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholder="Password"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.navigateTextView}>
            <TouchableOpacity
              onPress={() => {
                navigate("Registration");
              }}
              style={styles.register}
            >
              <Text style={styles.navigateTextText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigate("ForgetPassword");
              }}
              style={styles.forgetPassword}
            >
              <Text style={styles.navigateTextText}>Forget Password?</Text>
            </TouchableOpacity>
          </View>

          <CommonButton onPress={handleLogin} title={"Login".toUpperCase()} />
        </View>
      </View>

      {keyboardIsShown == false && <View style={styles.partitionBottom} />}
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
    flex: 3,
  },
  partitionMiddle: {
    flex: 8,
    width: "100%",
  },
  partitionBottom: {
    flex: 4,
  },
  welcomeView: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },
  welcomeText: {
    color: "black",
    fontSize: fontSizes.h1,
    fontWeight: "bold",
  },
  mainView: {
    flex: 4,
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
  textInputTypingArea: {
    width: 250,
    height: 35,
  },
  navigateTextView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navigateTextText: {
    padding: 1,
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: "blue",
  },
  forgetPassword: {
    marginHorizontal: 5,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  register: {
    marginHorizontal: 25,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
