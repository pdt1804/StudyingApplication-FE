import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
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
  user_getUser,
  information_getAllFavoriteTopics,
} from "../../api";

function UserProfile(props) {
  const [username, setUsername] = useState(null);
  const [fulname, setFulName] = useState(null);
  const [image, setImage] = useState(null);

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [description, setDescription] = useState(null);
  const [yearOfBirth, setYearOfBirth] = useState(null);
  const [gender, setGender] = useState(null);

  const [topics, setTopics] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setEverything = (
    username,
    fulname,
    email,
    phoneNumber,
    description,
    yearOfBirth,
    gender,
    topics
  ) => {
    setUsername(username);
    setFulName(fulname);
    setTopics(topics);

    if (phoneNumber == 0) {
      setPhoneNumber("Chưa cập nhật");
    } else {
      setPhoneNumber("0" + phoneNumber);
    }

    if (email == null) {
      setEmail("Chưa cập nhật");
    } else {
      setEmail(email);
    }

    if (description == 0) {
      setDescription("Chưa cập nhật");
    } else {
      setDescription(description);
    }

    if (yearOfBirth == 0) {
      setYearOfBirth("Chưa cập nhật");
    } else {
      setYearOfBirth(yearOfBirth);
    }

    if (gender == 0) {
      setGender("Chưa cập nhật");
    } else {
      setGender(gender);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const responseUser = await user_getUser();
        const responseFavTopics = await information_getAllFavoriteTopics(
          responseUser.information.infoID
        );

        let topicNames = responseFavTopics.map((item) => item.topicName);
        //console.log(topicNames);

        setEverything(
          username,
          responseUser.information.fulName,
          responseUser.email,
          responseUser.information.phoneNumber,
          responseUser.information.description,
          responseUser.information.yearOfBirth,
          responseUser.information.gender,
          topicNames
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
  }, [props.userName, loading]);

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
        <View>
        <View style={styles.profileView}>
          <View>
            <TouchableOpacity onPress={ShowPicture}>
              <Image source={{ uri: image }} style={styles.profileImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={selectImage} style={styles.button}>
              <Text style={styles.buttonText}>Thay đổi ảnh</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.profileUsername}>{fulname}</Text>
            <Text style={styles.profileDescription} numberOfLines={4}>
              {description}
            </Text>
          </View>
        </View>
        <FlatList
        horizontal={true}
          data={topics}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={styles.Topic}>{item}</Text>}
        /></View>

        <RowSectionTitle
          text={"Thông tin tài khoản"}
          styles={{ marginTop: 20 }}
        />

        <RowSectionDisplay icon={icons.phoneIcon} text={phoneNumber} />
        <RowSectionDisplay icon={icons.emailIcon} text={email} />
        <RowSectionDisplay icon={icons.birthdayCakeIcon} text={yearOfBirth} />
        <RowSectionDisplay icon={icons.genderEqualityIcon} text={gender} />

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
    marginLeft: "5%",
    marginVertical: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 90,
    borderColor: colors.PrimaryBackground,
    borderWidth: 2,
  },
  profileUsername: {
    color: "black",
    fontSize: fontSizes.h5,
    fontWeight: "900",
  },
  profileDescription: {
    Height: 70,
    maxWidth: 220,
    color: "gray",
    fontSize: fontSizes.h7,
  },
  button: {
    backgroundColor: colors.PrimaryBackground,
    padding: 3,
    borderRadius: 10,
    width: 90,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: fontSizes.h8,
  },
  //
  Topic: {
    marginHorizontal: 5,
    padding: 2,
    borderWidth: 1,
    borderRadius:5,
  },
});
