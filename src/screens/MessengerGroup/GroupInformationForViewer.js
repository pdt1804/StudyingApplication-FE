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
  ReviewItems,
  NewReviewInput,
  ReviewFinalViewOnly,
  Icon,
  SubInfoVertical,
} from "../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import {
  information_ExtractBearerToken,
  groupStudying_findGroupbyId,
  groupStudying_deleteGroup,
  groupStudying_changeAvatarGroup,
  review_checkUserReview,
  review_getAllReviewOfGroup,
  review_createReview,
} from "../../api";

function GroupInfoForViewer(props) {
  //navigation to/back
  const { navigate, goBack, push } = props.navigation;
  const { id } = props.route.params;

  const [topics, setTopics] = useState([]);
  const [image, setImage] = useState(null);
  const [nameGroup, setNameGroup] = useState(null);
  const [leaderOfGroup, setLeaderOfGroup] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState(null);
  const [dateCreated, setDateCreated] = useState("");

  const [reviews, setReviews] = useState([]);
  const [points, setPoints] = useState(0)

  useEffect(() => {
    fetchData();
    requestMediaLibraryPermissions;
  }, []);

  const fetchData = async () => {
    try {
      const responseDataGroup = await groupStudying_findGroupbyId(id);
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
      await setReviews(responseDataReviews);
      //console.log(reviews)

      setTopics(responseDataGroup.topics.map((item) => item.topicName));

      var total = 0;
      for (let i = 0; i < responseDataReviews.length; i++)
      {
        total += responseDataReviews[i].rating;
      }
      setPoints(total / responseDataReviews.length);

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

  const handleShowPicture = () => {
    navigate("ShowPicture", { file: image });
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Xem nhóm"}
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
          </View>
          <View>
            <Text style={styles.profileUsername}>{nameGroup}</Text>
            <View style={styles.profileDescription}>
              <SubInfoVertical icon={icons.leaderIcon} text={leaderOfGroup} />
              <SubInfoVertical icon={icons.groupIcon} text={numberOfMembers} />
              <SubInfoVertical icon={icons.calendarIcon} text={dateCreated} />
            </View>
            <View style={styles.topics_container}>
              {topics.map((topicName, index) => (
                <View style={styles.eachTopicBox} key={index}>
                  <Text style={styles.eachTopicBoxText}>{topicName}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* điểm rating là ở dòng này nha, chỗ số 4.4 á */}
      <ReviewFinalViewOnly currentRatingPoint={points} />

      <View style={styles.listReviewContainer}>
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItems {...item} />}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}
export default GroupInfoForViewer;

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
  //list review
  listReviewContainer: {
    flex: 1,
    width: "96%",
    paddingTop: 10,
    borderColor: colors.SecondaryOnContainerAndFixed,
    borderWidth: 1,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    backgroundColor: colors.transparentWhite,
    alignSelf: "center",
  },
  //sub info
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
  //topics
  topics_container: {
    width: 235,
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  eachTopicBox: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 5,
    marginHorizontal: 3,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.GrayObjects,
  },
  eachTopicBoxText: {
    color: colors.GrayOnContainerAndFixed,
    textAlign: "center",
    fontSize: fontSizes.h8,
  },
});
