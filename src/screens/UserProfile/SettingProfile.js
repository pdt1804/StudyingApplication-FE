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
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { CommonButton, TextInputMediumIcon } from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";
import axios from "axios";
import { user_getUser } from "../../api";

function SettingProfile(props) {
  const [newUsername, setNewUsername] = useState("");
  const [infoID, setInfoID] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const handleSettings = async () => {
    console.log(await AsyncStorage.getItem("username"));

    let updateInformation = {
      infoID: infoID,
      fulName: newUsername,
      phoneNumber: newPhoneNumber,
      yearOfBirth: newDateOfBirth,
      gender: gender,
    };

    const responseUpdate = await axios.post(
      API_BASE_URL + "/api/v1/information/updateInformation",
      updateInformation,
      {
        headers: {
          Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          "Content-Type": "application/json",
        },
      }
    );

    if (responseUpdate.status == 200) {
      navigate("MainBottomTab", { tabName: "Settings" });
    } else {
      alert("Error!");
    }
  };

  const handleCancel = async () => {
    navigate("Settings");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await user_getUser();

        console.log(response.information.infoID)

        setInfoID(response.information.infoID);
        setNewUsername(response.information.fulName);
        setNewEmail(response.email);
        setNewPhoneNumber(response.information.phoneNumber.toString());
        setNewDateOfBirth(response.information.yearOfBirth.toString());
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
      <UIHeader
        title={"Tùy chỉnh"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {}}
      />
      <ScrollView>
        <View style={styles.noHeaderContainer}>
          <View style={styles.partitionMiddle}>
            <View style={styles.yourInformationView}>
              <Text style={styles.yourInformationText}>Thông tin của bạn</Text>
            </View>

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
                inputMode="numeric"
                value={newPhoneNumber}
                name={"Số điện thoại"}
                icon={icons.phoneRingCircleIcon}
                placeholder={"Nhập số điện thoại mới"}
                onChangeText={(p) => setNewPhoneNumber(p)}
              />
              <TextInputMediumIcon
                inputMode="text"
                name={"Giới tính"}
                value={gender}
                icon={icons.genderEqualityIcon}
                placeholder={"Nhập giới tính của bạn"}
                onChangeText={(p) => setGender(p)}
              />
              <TextInputMediumIcon
                inputMode="numeric"
                name={"Năm sinh"}
                value={newDateOfBirth}
                icon={icons.birthdayCakeIcon}
                placeholder={"Nhập năm sinh của bạn"}
                onChangeText={(p) => setNewDateOfBirth(p)}
              />

              <CommonButton
                onPress={handleSettings}
                title={"Lưu thay đổi".toUpperCase()}
              />
            </View>
          </View>

          <Image
            source={images.decorStuff01}
            style={styles.decorStuffBottomLeft}
          />
          <Image
            source={images.decorStuff02}
            style={styles.decorStuffBottomRight}
          />
        </View>
      </ScrollView>
    </View>
  );
}
export default SettingProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
  },
  noHeaderContainer: {
    height: 850,
    justifyContent: "center",
    alignItems: "center",
  },
  partitionMiddle: {
    width: "100%",
  },
  yourInformationView: {
    width: "90%",
    marginVertical: 10,
    alignSelf: "center",
  },
  yourInformationText: {
    color: colors.PrimaryOnContainerAndFixed,
    fontSize: fontSizes.h2 * 0.9,
    fontWeight: "bold",
    alignSelf: "center",
  },
  mainView: {
    width: "90%",
    height: 520,
    padding: 15,
    marginBottom: "50%",
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputView: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  textInputImageNoTitle: {
    width: 45,
    height: 45,
    marginRight: 10,
    tintColor: colors.PrimaryBackground,
  },
  textInputImage: {
    width: 55,
    height: 55,
    marginRight: 10,
    marginTop: 25,
    tintColor: colors.PrimaryBackground,
  },
  textInputTypingArea: {
    width: 250,
    height: 55,
    marginTop: 5,
    paddingLeft: 20,
    borderColor: colors.noImportantText,
    borderWidth: 2,
    borderRadius: 20,
  },
  decorStuffBottomRight: {
    width: 250,
    height: 120,
    opacity: 0.5,
    resizeMode: "stretch",
    bottom: "5%",
    right: 0,
    position: "absolute",
  },
  decorStuffBottomLeft: {
    width: 250,
    height: 120,
    opacity: 0.5,
    resizeMode: "stretch",
    bottom: "10%",
    left: 0,
    position: "absolute",
  },
});
