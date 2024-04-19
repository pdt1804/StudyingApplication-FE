import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import {
  UIHeader,
  RowSectionTitle,
  RowSectionDisplay,
  RowSectionNavigate,
} from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  profile_getUser,
  profile_getAvatar,
  profile_uploadImage,
} from "../../api";

function UserProfile(props) {
  const [username, setUsername] = useState(null);
  const [fulname, setFulName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setEverything = (username, fulname, email, phoneNumber) => {
    setUsername(username);
    setFulName(fulname);

    if (email == null) {
      setEmail("Chưa cập nhật");
    } else {
      setEmail(email);
    }

    if (phoneNumber == 0) {
      setPhoneNumber("Chưa cập nhật");
    } else {
      setPhoneNumber("0" + phoneNumber);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        //console.log(username);
        const responseUser = await profile_getUser(username);

        setEverything(
          username,
          responseUser.data.information.fulName,
          responseUser.data.email,
          responseUser.data.information.phoneNumber
        );

        const responseAvatar = await profile_getAvatar(username);
        if (responseAvatar.data != null) {
          setImage(responseAvatar.data.toString());
        }
        console.log(image);
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

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      try {
        var imagePath = result.assets[0].uri.toString();
        await profile_uploadImage(imagePath, username);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const ShowPicture = () => {
    navigate("ShowPicture", { file: image });
  };

  //function of navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader title={"Hồ sơ"} />

      <ScrollView>
        <View /* Profile picture */ style={styles.profileView}>
          <TouchableOpacity onPress={ShowPicture}>
            <Image source={{ uri: image }} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.profileUsername}>{fulname}</Text>
          <TouchableOpacity onPress={selectImage} style={styles.button}>
            <Text style={styles.buttonText}>Thay đổi ảnh</Text>
          </TouchableOpacity>
        </View>

        <RowSectionTitle
          text={"Thông tin tài khoản"}
          styles={{ marginTop: 20 }}
        />

        <RowSectionDisplay icon={icons.phoneIcon} text={phoneNumber} />
        <RowSectionDisplay icon={icons.emailIcon} text={email} />

        <RowSectionTitle text={"Tùy chỉnh tài khoản"} />

        <RowSectionNavigate
          icon={icons.personIcon}
          text={"Đổi thông tin cá nhân"}
          onPress={() => navigate("SettingProfile")}
        />

        <RowSectionNavigate
          icon={icons.keyIcon}
          text={"Đổi mật khẩu"}
          onPress={() => navigate("ResetPasswordInSetting")}
        />
        <RowSectionNavigate
          icon={icons.exportIcon}
          text={"Đăng xuất"}
          onPress={Logout}
        />
      </ScrollView>
    </View>
  );
}
export default UserProfile;

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
  button: {
    backgroundColor: colors.PrimaryBackground,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    width: 150,
    height: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: fontSizes.h7,
  },
});
