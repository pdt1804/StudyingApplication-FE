import React, { useState } from "react";
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
  //example for api
  const [profile, setProfile] = useState({
    userName: "Dù sớ nèm (👍゜▽゜)👍",
    imageUrl: "https://i.pravatar.cc/100" /* profile image */,
    phoneNumber: "190010 không thấy",
    email: "aaakm331@gmail.com",
  });

  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  return (
    <SafeAreaView style={styles.container}>
      <UIHeader
        title={"Tài khoản"}
      />

      <ScrollView>
        <View /* Profile picture */ style={styles.profileView}>
          <Image
            source={{ uri: profile.imageUrl }}
            style={styles.profileImage}
          />
          <Text style={styles.profileUsername}>{profile.userName}</Text>
        </View>

        <GroupOption text={"Thông tin tài khoản"} />

        <EachOptionViewOnly
          icon={images.phoneIcon}
          text={profile.phoneNumber}
        />
        <EachOptionViewOnly icon={images.emailIcon} text={profile.email} />

        <GroupOption text={"Tùy chỉnh tài khoản"} />

        <EachOptionNavigate
          icon={images.personIcon}
          text={"Đổi thông tin cá nhân"}
          onPress={() => navigate("SettingProfile")}
        />

        <EachOptionNavigate
          icon={images.keyIcon}
          text={"Đổi mật khẩu"}
          onPress={() => navigate("Verification")}
        />
        <EachOptionNavigate
          icon={images.exportIcon}
          text={"Đăng xuất"}
          onPress={() => navigate("Login")}
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
