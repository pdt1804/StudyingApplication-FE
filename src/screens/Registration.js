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

const Registration = (props) => {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

/*   //use for api
  const handleRegister = async () => {
    navigate("Login");
  }; */

  //states for validating
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  //states to store email/password
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setrePassword] = useState('');

  const handleRegister = async () => {  
  var newUser = {
    userName: username,
    passWord: password,
    Email: email,
  }

  try {
    if (password === rePassword)
    {
      const response = await axios.post('http://localhost:8080/api/v1/user/CreateAccount', newUser);

      if (response.status == 200)
      {
        //successful
        console.log(response.data)
      }
      else
      {
        //unsuccessful
        console.log(response.data)
      }
    }
  }
  catch {

  }
}

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
        <View style={styles.registerView}>
          <Text style={styles.registerText}>SIGN UP</Text>
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

          <View /* email */ style={styles.textInputView}>
            <Image source={images.emailIcon} style={styles.textInputImage} />
            <TextInput
              style={styles.textInputTypingArea}
              inputMode="email"
              onChangeText={(text) => {
                setEmail(text);
              }}
              placeholder="Email"
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

          <View /* re-enter password */ style={styles.textInputView}>
            <Image source={images.keyIcon} style={styles.textInputImage} />
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
          </View>

          <CommonButton
            onPress={handleRegister}
            title={"Register".toUpperCase()}
          />

          <TouchableOpacity
            onPress={() => {
              navigate("Login");
            }}
            style={styles.loginNavigate}
          >
            <Text style={styles.loginNavigateText}>
              Already have a Account? Login
            </Text>
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
    backgroundColor: colors.mainBackground,
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
  },
  registerView: {
    flex: 10,
    width: "90%",
    alignSelf: "center",
  },
  registerText: {
    color: "black",
    fontSize: fontSizes.h1,
    fontWeight: "bold",
  },
  mainView: {
    flex: 80,
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
  loginNavigate: {
    marginHorizontal: 55,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginNavigateText: {
    padding: 11,
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: "blue",
  },
});
