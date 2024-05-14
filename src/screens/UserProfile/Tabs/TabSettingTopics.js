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
import { CommonButton, TextInputMediumIcon } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  user_getUser,
  information_getAllFavoriteTopics,
  information_getAllTopics,
} from "../../../api";

const FavTopicBox = ({ title }) => (
  <View style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </View>
);

export default function TabSettingTopics(props) {
  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const [favTopics, setFavTopics] = useState(null);
  const [unFavTopics, setUnFavTopics] = useState(null);

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
        const topicNames = responseFavTopics.map((item) => item.topicName);
        setFavTopics(topicNames);

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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainView}>
          <ScrollView contentContainerStyle={styles.test_container}>
            {favTopics.map((topic, index) => (
              <FavTopicBox key={index} title={topic} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    marginHorizontal:3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.GrayContainer,
    backgroundColor: colors.GrayObjects,
  },
  buttonText: {
    color: colors.GrayOnContainerAndFixed,
    textAlign: "center",
  },
});
