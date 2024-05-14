import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { CommonButton, TextInputMediumIcon } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user_getUser, information_updateInformation } from "../../../api";

export default function TabSettingBasicInfo(props) {
  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const [infoID, setInfoID] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newYearOfBirth, setNewYearOfBirth] = useState("");
  const [gender, setGender] = useState("");

  const handleSettings = async () => {
    //console.log(await AsyncStorage.getItem("username"));
    let updateInformation = {
      infoID: infoID,
      fulName: newUsername,
      description: newDescription,
      phoneNumber: newPhoneNumber,
      email: newEmail,
      yearOfBirth: newYearOfBirth,
      gender: gender,
    };
    const responseUpdate = information_updateInformation(updateInformation);
    //console.log(responseUpdate);
    navigate("MainBottomTab", { tabName: "UserProfile" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await user_getUser();
        //console.log(response.information.infoID);
        setInfoID(response.information.infoID);
        setNewUsername(response.information.fulName);
        setNewDescription(response.information.description);
        setNewPhoneNumber(response.information.phoneNumber.toString());
        setNewEmail(response.email);
        setNewYearOfBirth(response.information.yearOfBirth.toString());
        setGender(response.information.gender);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainView}>
          <TextInputMediumIcon
            inputMode="text"
            name={"Họ và tên"}
            icon={icons.personCircleIcon}
            value={newUsername}
            placeholder={"Nhập tên người dùng mới"}
            onChangeText={(p) => setNewUsername(p)}
          />
          <TextInputMediumIcon
            inputMode="text"
            name={"Mô tả bản thân"}
            icon={icons.documentBlackIcon}
            value={newDescription}
            placeholder={"Nhập mô tả của bạn"}
            onChangeText={(p) => setNewDescription(p)}
          />
          <TextInputMediumIcon
            inputMode="numeric"
            name={"Số điện thoại"}
            icon={icons.phoneRingCircleIcon}
            value={newPhoneNumber}
            placeholder={"Nhập số điện thoại mới"}
            onChangeText={(p) => setNewPhoneNumber(p)}
          />
          <TextInputMediumIcon
            inputMode="email"
            name={"Email"}
            icon={icons.emailCheckMarkIcon}
            value={newEmail}
            placeholder={"Nhập email của bạn"}
            onChangeText={(p) => setNewEmail(p)}
          />
          <TextInputMediumIcon
            inputMode="numeric"
            name={"Năm sinh"}
            icon={icons.birthdayCakeIcon}
            value={newYearOfBirth}
            placeholder={"Nhập năm sinh của bạn"}
            onChangeText={(p) => setNewYearOfBirth(p)}
          />
          <TextInputMediumIcon
            inputMode="text"
            name={"Giới tính"}
            icon={icons.genderEqualityIcon}
            value={gender}
            placeholder={"Nhập giới tính của bạn"}
            onChangeText={(p) => setGender(p)}
          />

          <CommonButton
            onPress={handleSettings}
            title={"Lưu thay đổi".toUpperCase()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
  },
  mainView: {
    width: "90%",
    padding: 15,
    marginVertical: "5%",
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
