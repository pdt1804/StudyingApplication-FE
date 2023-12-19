import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { images, colors, fontSizes } from "../../constants/index";
import { CommonButton } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";

const ResetPasswordInSetting = (props) => {

  const { navigate, goBack } = props.navigation;

  const [password, setPassword] = useState('none');
  const [rePassword, setRePassword] = useState('none');

  //use for api
  const handleResetPassword = async () => {
    try
    {
      if (password == rePassword && password.length > 5)
      {
        
        const response = await axios.post(API_BASE_URL + "/api/v1/user/ChangePasswordAfterOTP?userName=" + userName + "&passWord=" + password)
        
        if (response.data == true)
        {
          alert('Change password successfully');
          navigate("Login");
        }
        else
        {
          alert('Network Error !');
        }
      }
      else
      {
        alert('New password and re-enter password are not same and the password must have at least 5 characters');
      }
    }
    catch (Error)
    {
      console.error(Error.message);
    }
  };

  return (
    <View style={styles.container}>
        <Image source={images.decorStuff01} style={styles.decorStuffTop} />

      <View style={styles.partitionMiddle}>
        <View style={styles.forgetPasswordView}>
          <Text style={styles.forgetPasswordText}>Đặt lại mật khẩu!</Text>
        </View>

        <View style={styles.mainView}>
          <View /* Password */ style={styles.textInputView}>
            <Image
              source={images.typePasswordIcon}
              style={styles.textInputImage}
            />
            <View>
              <Text>Mật khẩu hiện tại:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                placeholder="Nhập mật khẩu hiện tại"
                placeholderTextColor={colors.noImportantText}
                onChangeText={p => setPassword(p)}
              />
            </View>
          </View>
          <View /* Password */ style={styles.textInputView}>
            <Image
              source={images.typePasswordIcon}
              style={styles.textInputImage}
            />
            <View>
              <Text>Mật khẩu mới:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                placeholder="Nhập mật khẩu mới"
                placeholderTextColor={colors.noImportantText}
                onChangeText={p => setPassword(p)}
              />
            </View>
          </View>
          <View /* Retype password */ style={styles.textInputView}>
            <Image
              source={images.reTypePasswordIcon}
              style={styles.textInputImage}
            />
            <View>
              <Text>Nhập lại mật khẩu:</Text>
              <TextInput
                style={styles.textInputTypingArea}
                secureTextEntry={true} // * the password
                inputMode="text"
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor={colors.noImportantText}
                onChangeText={p => setRePassword(p)}
              />
            </View>
          </View>

          <CommonButton
            onPress={handleResetPassword}
            title={"tiếp tục".toUpperCase()}
          />
        </View>
      </View>

        <Image source={images.decorStuff02} style={styles.decorStuffBottom} />
    </View>
  );
};
export default ResetPasswordInSetting;


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
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
    color: colors.titleScreen,
    fontSize: fontSizes.h1,
    fontWeight: "bold",
    alignSelf: 'center',
  },
  mainView: {
    width: "90%",
    height: 450,
    padding: 15,
    backgroundColor: colors.transparentWhite,
    borderColor: colors.borderedView,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: 'center', 
    alignItems: 'center',
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
    tintColor: colors.blueIcon,
  },
  textInputTypingArea: {
    width: 250,
    height: 55,
    marginTop:5,
    paddingLeft: 20,
    borderColor: colors.noImportantText,
    borderWidth: 2,
    borderRadius: 20,
  },
  decorStuffTop: {
    width: 250,
    height: 120,
    opacity: 0.5,
    resizeMode: 'stretch',
    top: '10%',
    left: 0,
    position: 'absolute',
  },
  decorStuffBottom: {
    width: 250,
    height: 120,
    opacity: 0.5,
    resizeMode: 'stretch',
    bottom: '10%',
    right: 0,
    position: 'absolute',
  },
});