import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import {
  CommonButton,
  TextInputMediumIcon,
  SearchBarAndButton,
  Icon,
} from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  user_getUser,
  information_getAllFavoriteTopics,
  information_getAllUnfavourateTopics,
  information_getAllTopics,
} from "../../../api";

const FavTopicBox = ({ title }) => (
  <View style={styles.favTopicBox}>
    <Text style={styles.favTopicBoxText}>{title}</Text>
  </View>
);

export default function TabSettingTopics(props) {
  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const [favTopics, setFavTopics] = useState([]);
  const [unFavTopics, setUnFavTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handlePressTopic = (topic) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  const handleSettings = async () => {
    navigate("MainBottomTab", { tabName: "UserProfile" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await user_getUser();
        const responseFavTopics = await information_getAllFavoriteTopics(
          responseUser.information.infoID
        );
        const responseUnFavTopics = await information_getAllUnfavourateTopics(
          responseUser.information.infoID
        );

        const FavTopicNames = responseFavTopics.map((item) => item.topicName);
        setFavTopics(FavTopicNames);
        setUnFavTopics(responseUnFavTopics);

        console.log(favTopics);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.header}>Chủ đề bạn đã chọn</Text>
        <ScrollView contentContainerStyle={styles.test_container}>
          {favTopics.map((topicName, index) => (
            <View style={styles.favTopicBox} key={index}>
              <Text style={styles.favTopicBoxText}>{topicName}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Thêm chủ đề yêu thích"}
        buttonOnPress={() => {
          setModalVisible(true);
        }}
        buttonLength={"100%"}
      />

      <View style={styles.mainView02}>
        <ScrollView style={styles.sub_ScrollView}>
          <View style={styles.topicsView}>
            {unFavTopics.map((topic) => (
              <TouchableOpacity
                key={topic.topicID}
                style={styles.eachTopic}
                onPress={() => handlePressTopic(topic.topicID)}
              >
                <Image source={{ uri: topic.image }} style={styles.topicImg} />

                {selectedTopics.includes(topic.topicID) && (
                  <View style={styles.blackCover} />
                )}

                <Text style={styles.topicNameText}>{topic.topicName}</Text>
                {selectedTopics.includes(topic.topicID) && (
                  <Icon
                    name={icons.checkMarkIcon}
                    size={24}
                    color={colors.PrimaryContainer}
                    style={{
                      top: 0,
                      right: 0,
                      position: "absolute",
                    }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
  },
  header: {
    marginBottom: 20,
    fontSize: fontSizes.h3,
    fontWeight: "bold",
  },
  mainView: {
    width: "90%",
    padding: 15,
    marginVertical: "5%",
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 2,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  mainView02: {
    maxHeight: 370,
    width: "90%",
    padding: 15,
    marginVertical: "5%",
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 2,
    borderRadius: 30,
    alignSelf: "center",
  },
  //
  Topic: {
    marginHorizontal: 5,
    padding: 2,
    borderWidth: 1,
    borderRadius: 5,
  },
  //
  test_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  favTopicBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
    marginHorizontal: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.GrayObjects,
  },
  favTopicBoxText: {
    color: colors.GrayOnContainerAndFixed,
    textAlign: "center",
    fontSize: fontSizes.h7,
  },
  //
  topicsView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  eachTopic: {
    width: "48%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  topicImg: {
    flex: 1,
    width: "100%",
    resizeMode: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  blackCover: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    backgroundColor: "black",
    opacity: 0.5,
  },
  topicNameText: {
    left: 5,
    bottom: 0,
    position: "absolute",
    color: "white",
    fontSize: fontSizes.h7,
    fontWeight: "900",
  },
});
