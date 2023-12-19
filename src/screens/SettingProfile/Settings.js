import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { API_BASE_URL } from "../../../DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

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

function Settings(props) {
  const [fulName, setFulName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /* //example for api
  const [profile, setProfile] = useState({
    userName: "Dù sớ nèm (👍゜▽゜)👍",
    imageUrl: "https://i.pravatar.cc/100"
    phoneNumber: "190010 không thấy",
    email: "aaakm331@gmail.com",
  }); */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        setUsername(username);

        const response = await axios.get(
          API_BASE_URL + "/api/v1/user/GetUser?userName=" + username
        );

        setFulName(response.data.information.fulName);
        setEmail(response.data.email);
        setPhoneNumber(response.data.information.phoneNumber);

        const responseAvatar = await axios.get(
          API_BASE_URL + "/api/v1/information/getAvatar?userName=" + username
        );

        setImage(responseAvatar.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const Logout = async () => {
    try {
      await AsyncStorage.removeItem("username");
      navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);

      try {
        const username = await AsyncStorage.getItem("username");

        var imagePath = result.uri.toString();

        const formData = new FormData();
        formData.append("image", imagePath);
        formData.append("userName", username);

        const response = await axios.post(
          API_BASE_URL + "/api/v1/information/changeAvatar",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status == 200) {
          console.log(imagePath);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  return (
    <SafeAreaView style={styles.container}>
      <UIHeader title={"Tài khoản"} />

      <ScrollView>
        <View /* Profile picture */ style={styles.profileView}>
          <Image source={{ uri: image }} style={styles.profileImage} />
          <Text style={styles.profileUsername}>{fulName}</Text>
        </View>

        <GroupOption text={"Thông tin tài khoản"} />

        <EachOptionViewOnly icon={images.phoneIcon} text={phoneNumber} />
        <EachOptionViewOnly icon={images.emailIcon} text={email} />

        <GroupOption text={"Tùy chỉnh tài khoản"} />

        <EachOptionNavigate
          icon={images.personIcon}
          text={"Đổi thông tin cá nhân"}
          onPress={() => navigate("SettingProfile")}
        />

        <EachOptionNavigate
          icon={images.keyIcon}
          text={"Đổi mật khẩu"}
          onPress={() => navigate('ResetPasswordInSetting')}
        />
        <EachOptionNavigate
          icon={images.exportIcon}
          text={"Đăng xuất"}
          onPress={Logout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  profileView: {
    height: 200,
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
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
