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
import { API_BASE_URL } from "../../../api/DomainAPI";
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
      <Image source={icons.chevronRightIcon} style={styles.eachOptionIcon} />
    </TouchableOpacity>
  );
}

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const ShowProfileMember = (props) => {

  //navigation
  const { navigate, goBack } = props.navigation;

  let { userName, image, fulName, phoneNumber, yearOfBirth, gender, email } = props.route.params;

  const [group, setGroup] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })
        setGroup(response.data);

        const extractToken = await axios.get(API_BASE_URL + "/api/v1/information/ExtractBearerToken", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setUsername(extractToken.data);

                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);


  //handle button here  
  const ChangeLeader = async () => {

    if (group.leaderOfGroup.userName == userName)
    {
      alert("Bạn hiện tại đang là trưởng nhóm")
      return;
    }

    var form = new FormData()
    form.append('newUserName', userName)
    form.append('groupID', await AsyncStorage.getItem("groupID"))

    const response = await axios.put(API_BASE_URL + "/api/v1/groupStudying/changeLeaderofGroup", form, {
      headers: {
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    if (response.status == 200)
    {
        alert('Đổi nhóm trưởng thành công')
        navigate('MessengerGroup', {imageGroup: group.image, nameGroup: group.nameGroup, groupID: group.groupID})
    }

  }

  const ShowPicture = () => {
    navigate("ShowPicture", {file: image})
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View /* the top color */ style={styles.colorView} />
        <View style={styles.mainView}>
          <View /* Profile picture */ style={styles.profileView}>
            <TouchableOpacity style={styles.profileView} onPress={ShowPicture}>
              <Image source={{ uri: image }} style={styles.profileImage} />
              <Text style={styles.profileUsername}>{fulName}</Text>
            </TouchableOpacity>
          </View>

          <GroupOption text={"Thông tin tài khoản"} />

          <EachOptionViewOnly icon={icons.phoneIcon} text={"Số điện thoại: " + (phoneNumber == 0 ? "chưa cập nhật" : (0 + phoneNumber))} />
          <EachOptionViewOnly icon={icons.emailIcon} text={"Email: " + (email != null ? email : "chưa cập nhật")} />
          <EachOptionViewOnly icon={icons.personIcon} text={"Giới tính: " + (gender != null ? gender : "chưa cập nhật")} />
          <EachOptionViewOnly icon={icons.documentBlackIcon} text={"Năm sinh: " + (yearOfBirth == 0 ? "chưa cập nhật" : yearOfBirth)} />

          <CommonButton
            onPress={ChangeLeader}
            title={"Chuyển nhóm trưởng".toUpperCase()}
          />
        </View>
      </ScrollView>

      <UIHeader
        title={null}
        leftIconName={icons.backIcon}
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
export default ShowProfileMember;

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
