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
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { CommonButton } from "../../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../../../DomainAPI";
import axios from "axios";

function Settings(props) {
  
  const [newUsername, setNewUsername] = useState("");
  const [infoID, setInfoID] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDateOfBirth, setNewDateOfBirth] = useState("");
  const [gender, setGender] = useState("");


  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const handleSettings = async () => {
    
    console.log(await AsyncStorage.getItem('username'))

    let updateInformation = {
      infoID: infoID,
      fulName: newUsername,
      phoneNumber: newPhoneNumber,
      yearOfBirth: newDateOfBirth,
      gender: gender,
    }

    const responseUpdate = await axios.post(API_BASE_URL + "/api/v1/information/updateInformation", updateInformation, {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        'Content-Type': 'application/json',
      },
    });

    if (responseUpdate.status == 200)
    {
      navigate("UITab", {tabName: "Settings"});
    }
    else
    {
      alert("Error!");
    }

  };

  const handleCancel = async () => {
    navigate("Settings");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const username = await AsyncStorage.getItem('username');

        const response = await axios.get(API_BASE_URL + "/api/v1/user/GetUser", {
          headers: {
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });

        setInfoID(response.data.information.infoID)
        setNewUsername(response.data.information.fulName);
        setNewEmail(response.data.email)
        setNewPhoneNumber(response.data.information.phoneNumber.toString())
        setNewDateOfBirth(response.data.information.yearOfBirth.toString())
        setGender(response.data.information.gender);
        
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Tùy chỉnh"}
        leftIconName={images.backIcon}
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
              <View /* new Username */ style={styles.textInputView}>
                <Image
                  source={images.personCircleIcon}
                  style={styles.textInputImageNoTitle}
                />
                <View>
                  <Text>Họ và tên:</Text>
                  <TextInput
                    style={styles.textInputTypingArea}
                    inputMode="text"
                    onChangeText={p => setNewUsername(p)}
                    value={newUsername}
                    placeholder="Nhập tên người dùng mới"
                    placeholderTextColor={colors.noImportantText}
                  />
                </View>
              </View>
              <View /* new phone number */ style={styles.textInputView}>
                <Image
                  source={images.phoneRingCircleIcon}
                  style={styles.textInputImage}
                />
                <View>
                  <Text>Số điện thoại:</Text>
                  <TextInput
                    style={styles.textInputTypingArea}
                    inputMode="numeric"
                    onChangeText={p => setNewPhoneNumber(p)}
                    value={newPhoneNumber}
                    placeholder="Nhập số điện thoại mới"
                    placeholderTextColor={colors.noImportantText}
                  />
                </View>
              </View>
              <View /* new email */ style={styles.textInputView}>
                <Image
                  source={images.genderEqualityIcon}
                  style={styles.textInputImage}
                />
                <View>
                  <Text>Giới tính:</Text>
                  <TextInput
                    style={styles.textInputTypingArea}
                    inputMode="text"
                    onChangeText={p => setGender(p)}
                    value={gender}
                    placeholder="Nhập giới tính của bạn"
                    placeholderTextColor={colors.noImportantText}
                  />
                </View>
              </View>

              <View style={styles.textInputView}>
                <Image
                  source={images.birthdayCakeIcon}
                  style={styles.textInputImage}
                />
                <View>
                  <Text>Năm sinh:</Text>
                  <TextInput
                    style={styles.textInputTypingArea}
                    inputMode="numeric"
                    onChangeText={p => setNewDateOfBirth(p)}
                    value={newDateOfBirth}
                    placeholder="Nhập năm sinh của bạn"
                    placeholderTextColor={colors.noImportantText}
                  />
                </View>
              </View>

              <CommonButton
                onPress={handleSettings}
                title={"Lưu thay đổi".toUpperCase()}
              />
            </View>
          </View>

          <Image source={images.decorStuff01} style={styles.decorStuffBottomLeft} />
          <Image source={images.decorStuff02} style={styles.decorStuffBottomRight} />
        </View>
      </ScrollView>
    </View>
  );
}
export default Settings;

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
    fontSize: fontSizes.h2*0.9,
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