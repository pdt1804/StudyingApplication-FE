import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import { UIHeader, CommonButton } from "../../../components";
import axios from "axios";
import { API_BASE_URL } from "../../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

function GroupOption(props) {
  const { text } = props;

  return (
    <View style={styles.groupOptionsView}>
      <Text style={styles.groupOptionsText}>{text}</Text>
    </View>
  );
}

function EachOptionViewOnly(props) {
  const { icon, text } = props;

  return (
    <View style={styles.eachOptionView}>
      <Image source={icon} style={styles.eachOptionIcon} />
      <Text style={styles.eachOptionText}>{text}</Text>
    </View>
  );
}

function EachOptionNavigate(props) {
  const { icon, text, onPress } = props;

  return (
    <TouchableOpacity style={styles.eachOptionView} onPress={onPress}>
      <Image source={icon} style={styles.eachOptionIcon} />
      <Text style={styles.eachOptionText}>{text}</Text>
      <View style={{ flex: 1 }} />
      <Image source={images.chevronRightIcon} style={styles.eachOptionIcon} />
    </TouchableOpacity>
  );
}

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const ShowProfileFriend = (props) => {
  let { friendUsername } = props.route.params;

  //navigation
  const { navigate, goBack } = props.navigation;

  const [fulName, setFulName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const [yearOfBirth, setYearOfBirth] = useState("")
  const [image, setImage] = useState(null)



  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/user/GetUser?userName=" + friendUsername);

        setFulName(response.data.information.fulName);
        setEmail(response.data.email);
        setPhoneNumber(response.data.information.phoneNumber);
        setImage(response.data.information.image)
        setYearOfBirth(response.data.information.yearOfBirth)
        setGender(response.data.information.gender)
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);


  //handle button here  
  const DeleteFriend = async () => {

    const response = await axios.delete(API_BASE_URL + "/api/v1/friendship/deleteFriend?sentUserName=" + friendUsername + "&receivedUserName=" + await AsyncStorage.getItem('username'))
    

  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View /* the top color */ style={styles.colorView} />
        <View style={styles.mainView}>
          <View /* Profile picture */ style={styles.profileView}>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <Text style={styles.profileUsername}>{fulName}</Text>
          </View>

          <GroupOption text={"Thông tin tài khoản"} />

          <EachOptionViewOnly icon={images.phoneIcon} text={"Phone number: " + phoneNumber} />
          <EachOptionViewOnly icon={images.emailIcon} text={"Email: " + email} />
          <EachOptionViewOnly icon={images.personIcon} text={"Gender: " + gender} />
          <EachOptionViewOnly icon={images.documentBlackIcon} text={"Year Of Birth: " + yearOfBirth} />

          <CommonButton
            onPress={DeleteFriend}
            title={"Huỷ kết bạn".toUpperCase()}
          />
        </View>
      </ScrollView>

      <UIHeader
        title={null}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={styles.UIHeaderMainStyle}
        iconStyle={styles.UIHeaderIconStyle}
      />
    </View>
  );
};
export default ShowProfileFriend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  UIHeaderMainStyle: {
    top: 0,
    position: "absolute",
    backgroundColor: null,
  },
  UIHeaderIconStyle: { tintColor: colors.inactive },
  mainView: {
    flex: 1,
    marginTop: 290,
  },
  colorView: {
    height: 400,
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: generateColor(),
  },
  profileView: {
    height: 200,
    alignItems: "center",
  },
  profileImage: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 90,
    borderColor: "white",
    borderWidth: 5,
  },
  profileUsername: {
    color: "black",
    fontSize: fontSizes.h6,
  },
  groupOptionsView: {
    height: 50,
    marginStart: 12,
    justifyContent: "center",
  },
  groupOptionsText: {
    fontSize: fontSizes.h7,
    color: colors.noImportantText,
    paddingStart: 10,
  },
  eachOptionView: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  eachOptionIcon: {
    width: 20,
    height: 20,
    marginStart: 10,
  },
  eachOptionText: {
    fontSize: fontSizes.h6,
    color: "black",
    paddingStart: 15,
  },
});
