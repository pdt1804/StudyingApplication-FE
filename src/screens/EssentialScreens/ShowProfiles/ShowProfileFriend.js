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
import { images, icons, colors, fontSizes } from "../../../constants";
import {
  UIHeader,
  RowSectionTitle,
  SubInfoHorizontal,
  FloatingButtonSingle,
  FloatingButtonDouble,
} from "../../../components";
import { randomGenerateColor } from "../../../utilities";
import { information_GetUser, friendship_deleteFriend } from "../../../api";

export default ShowProfileFriend = (props) => {
  let { friendUsername } = props.route.params;

  //navigation
  const { navigate, goBack } = props.navigation;

  const [image, setImage] = useState(images.blankAvatarForRegistration);
  const [fulName, setFulName] = useState("Tên người dùng");
  const [description, setDescription] = useState("Hãy mô tả về bạn...");
  const [yearOfBirth, setYearOfBirth] = useState("0000");
  const [gender, setGender] = useState("Không xác định");
  //const [topics, setTopics] = useState([]);
  const [topicNames, setTopicNames] = useState([]);

  const fetchData = async () => {
    try {
      const responseData = await information_GetUser(friendUsername);
      const userInfo = responseData.information;
      setImage(userInfo.image);
      setFulName(userInfo.fulName);
      setDescription(userInfo.description);
      setYearOfBirth(userInfo.yearOfBirth);
      setGender(userInfo.gender);
      //setTopics(userInfo.topics)
      setTopicNames(userInfo.topics.map((item) => item.topicName));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.userName]);

  //handle button here
  const handleDeleteFriend = async () => {
    const response = friendship_deleteFriend(friendUsername);
    if (response.status) {
      alert("Xoá bạn thành công");
      navigate("MainBottomTab", { tabName: "Friends" });
    }
  };

  const handleShowPicture = () => {
    alert("tính năng không khả dụng");
    //navigate("ShowPicture", {file: image})
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.colorView} />
        <View style={styles.mainView}>
          <View style={styles.profileView}>
            <TouchableOpacity onPress={handleShowPicture}>
              <Image source={{ uri: image }} style={styles.profileImage} />
            </TouchableOpacity>
            <Text style={styles.profileUsername}>{fulName}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.userInfoContainer}>
              <SubInfoHorizontal
                icon={icons.genderEqualityIcon}
                title={"Giới tính"}
                text={gender}
              />
              <SubInfoHorizontal
                icon={icons.birthdayCakeIcon}
                title={"Năm sinh"}
                text={yearOfBirth}
              />
            </View>

            <RowSectionTitle
              text={"Chủ đề yêu thích"}
              styles={{ marginTop: 20 }}
            />

            <View style={styles.topics_container}>
              {topicNames.map((topicName, index) => (
                <View
                  style={[
                    styles.eachTopicBox,
                    { borderColor: randomGenerateColor() },
                  ]}
                  key={index}
                >
                  <Text style={styles.eachTopicBoxText}>{topicName}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <FloatingButtonSingle
        icon={icons.trashCanIcon}
        text={"Hủy kết bạn"}
        onPress={handleDeleteFriend}
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryContainer,
  },
  //
  UIHeaderMainStyle: {
    top: 0,
    position: "absolute",
    backgroundColor: null,
  },
  UIHeaderIconStyle: { tintColor: colors.inactive },
  //
  colorView: {
    height: 275,
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: randomGenerateColor(),
  },
  mainView: {
    marginTop: 190,
  },
  profileView: {
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    borderRadius: 75,
    borderWidth: 5,
    borderColor: colors.PrimaryContainer,
  },
  profileUsername: {
    color: colors.PrimaryOnContainerAndFixed,
    fontSize: fontSizes.h4,
    fontWeight: "bold",
  },
  //
  userInfoContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  description: {
    color: colors.PrimaryOnContainerAndFixed,
    fontSize: fontSizes.h7,
    marginVertical: 10,
  },
  //
  topics_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  eachTopicBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginHorizontal: 2,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.GrayObjects,
  },
  eachTopicBoxText: {
    color: colors.GrayOnContainerAndFixed,
    textAlign: "center",
    fontSize: fontSizes.h7,
  },
});
