import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import {
  UIHeader,
  RowSectionTitle,
  RowSectionDisplay,
  RowSectionNavigate,
  IconRating,
  ReviewItems,
  NewReviewInput,
  Icon,
} from "../../components";
import { API_BASE_URL } from "../../api/DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  information_ExtractBearerToken,
  groupStudying_findGroupbyId,
  groupStudying_deleteGroup,groupStudying_changeAvatarGroup,
  review_checkUserReview,
  review_getAllReviewOfGroup,
  review_createReview,
} from "../../api";

const SubInfo = ({ icon, text }) => {
  return (
    <View style={styles.subInfoContainer}>
      <Icon name={icon} size={35} color={colors.GrayOnContainerAndFixed} />
      <Text style={styles.subInfoText}>{text}</Text>
    </View>
  );
};

function GroupInfo(props) {
  //navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const [group, setGroup] = useState("");
  const [username, setUsername] = useState(null);
  const [extractToken, setExtractToken] = useState(null);
  const [topics, setTopics] = useState([]);

  const [groupID, setGroupID] = useState(null);
  const [image, setImage] = useState(null);
  const [nameGroup, setNameGroup] = useState(null);
  const [leaderOfGroup, setLeaderOfGroup] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState(null);
  const [dateCreated, setDateCreated] = useState("");

  const [reviews, setReviews] = useState([]);
  const [checkReviewed, setCheckReviewed] = useState(true);

  useEffect(() => {
    fetchData();
    requestMediaLibraryPermissions;
  }, []);

  const fetchData = async () => {
    try {
      const responseDataGroup = await groupStudying_findGroupbyId(
        await AsyncStorage.getItem("groupID")
      );
      setGroup(responseDataGroup);
      setUsername(responseDataGroup.leaderOfGroup.userName);
      setExtractToken(await information_ExtractBearerToken());

      setGroupID(responseDataGroup.groupID);
      setImage(responseDataGroup.image);
      setNameGroup(responseDataGroup.nameGroup);
      setLeaderOfGroup(responseDataGroup.leaderOfGroup.fulName);
      setNumberOfMembers(responseDataGroup.numberOfMembers);

      const date = new Date(responseDataGroup.dateCreated);
      setDateCreated(
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
      );

      const responseDataReviews = await review_getAllReviewOfGroup(
        await AsyncStorage.getItem("groupID")
      );
      setReviews(responseDataReviews);

      setCheckReviewed(
        await review_checkUserReview(await AsyncStorage.getItem("groupID"))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const isCurrentUserLeader = username === extractToken;
      if (isCurrentUserLeader && numberOfMembers > 1) {
        alert("Vui lòng đổi nhóm trưởng trước khi rời nhóm");
        return; // Exit function early if leader needs to change
      }
      const response = await groupStudying_deleteGroup(group.groupID);
      if (response.status === 200) {
        //await AsyncStorage.removeItem('groupID');
        navigate("MainBottomTab", { tabName: "GroupChat" });
      }
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  const handelSelectImage = async () => {
    if (username == extractToken) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri.toString());
        try {
          var imagePath = result.assets[0].uri.toString();
          handleUploadImage(imagePath);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    } else {
      alert("Bạn không phải trưởng nhóm.");
    }
  };

  const handleUploadImage = async (uri) => {
    groupStudying_changeAvatarGroup(uri, groupID)
  };

  const handleChangeInformationGroup = async () => {
    if (username == extractToken) {
      navigate("GroupInformationDetail", { group: group });
    } else {
      alert("Bạn không phải trưởng nhóm.");
    }
  };

  const handleMembersInGroup = async () => {
    if (username == extractToken) {
      navigate("MembersInGroup");
    } else {
      alert("Bạn không phải trưởng nhóm.");
    }
  };

  const handleAddMembers = async () => {
    if (username == extractToken) {
      navigate("AddMember");
    } else {
      alert("Bạn không phải trưởng nhóm.");
    }
  };

  const handleShowPicture = () => {
    navigate("ShowPicture", { file: image });
  };

  const handleSubmitNewReview = (newReviewContent, newStarRatingPoint) => {
    checkReviewed
      ? alert("bạn đã review rồi")
      : (alert("review thành công"),
        review_createReview(groupID, newStarRatingPoint, newReviewContent));
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thiết lập"}
        leftIconName={icons.backIcon}
        onPressLeftIcon={() => {
          goBack();
        }}
      />

      <View>
        <View style={styles.profileView}>
          <View>
            <TouchableOpacity onPress={handleShowPicture}>
              <Image source={{ uri: image }} style={styles.profileImage} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handelSelectImage} style={styles.button}>
              <Text style={styles.buttonText}>Thay đổi ảnh</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.profileUsername}>{nameGroup}</Text>
            <View style={styles.profileDescription}>
              <SubInfo icon={icons.leaderIcon} text={leaderOfGroup} />
              <SubInfo icon={icons.groupIcon} text={numberOfMembers} />
              <SubInfo icon={icons.calendarIcon} text={dateCreated} />
            </View>
          </View>
        </View>
      </View>

      <NewReviewInput onSubmit={handleSubmitNewReview} />

      <View style={styles.listReviewContainer}>
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItems {...item} />}
          keyExtractor={(item) => item}
        />
      </View>

      {/*
        <RowSectionTitle text={"Tùy chỉnh tài khoản"} />

        <RowSectionNavigate
          icon={icons.personIcon}
          text={"Đổi thông tin nhóm"}
          onPress={ChangeInformationGroup}
        />

        <RowSectionNavigate
          icon={icons.keyIcon}
          text={"Thêm thành viên"}
          onPress={AddMembers}
        />

        <RowSectionNavigate
          icon={icons.keyIcon}
          text={"Danh sách thành viên"}
          onPress={MembersInGroup}
        />
        <RowSectionNavigate
          icon={icons.exportIcon}
          text={"Rời nhóm"}
          onPress={LeaveGroup}
        /> */}
    </View>
  );
}
export default GroupInfo;

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
    flexDirection: "row",
    marginTop: 5,
    //height: 90,
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
    color: colors.PrimaryObjects,
    fontSize: fontSizes.h8,
  },
  //
  listReviewContainer: { flex: 1 },
  newReviewInputContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  //
  subInfoContainer: {
    minWidth: 60,
    maxWidth: 100,
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginRight: 5,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 13,
    borderEndColor: colors.PrimaryContainer,
  },
  subInfoText: { fontSize: fontSizes.h7, textAlign: "center" },
});
