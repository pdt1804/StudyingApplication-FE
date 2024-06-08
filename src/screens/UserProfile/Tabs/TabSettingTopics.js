import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { SearchBarAndButton, Icon } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  user_getUser,
  information_getAllFavoriteTopics,
  information_getAllUnfavourateTopics,
  information_AddTopic,
  information_RemoveTopic,
} from "../../../api";

export default function TabSettingTopics(props) {
  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  const [favTopics, setFavTopics] = useState([]);
  const [unFavTopics, setUnFavTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [infoID, setInfoID] = useState()

  const handlePressTopic = (topic) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  const handleAddTopics = async (selectedTopics) => {
    const response = await information_AddTopic(selectedTopics, infoID)
    if (response.status == 200)
    {
      alert('Đã thêm chủ đề yêu thích')

      const responseFavTopics = await information_getAllFavoriteTopics(
        infoID
      );
      const responseUnFavTopics = await information_getAllUnfavourateTopics(
        infoID
      );

      setFavTopics(responseFavTopics);
      setUnFavTopics(responseUnFavTopics);
    }
    else
    {
      alert('Có lỗi xảy ra, vui lòng thử lại')
    }
  };

  const handleRemoveTopic = async (topic) => {
    Alert.alert(
      "Xác nhận xoá",
      "Bạn có chắc chắn muốn xoá?",
      [
        {
          text: "Huỷ",
          style: "cancel",
        },
        {
          text: "Xoá",
          style: "destructive",
          onPress: async () => {
            const response = await information_RemoveTopic(topic.topicID, infoID)
            if (response.status != 200) {
              alert("Xoá không thành công, kiểm tra lại mạng");
            }
            else
            {
              const responseFavTopics = await information_getAllFavoriteTopics(
                infoID
              );
              const responseUnFavTopics = await information_getAllUnfavourateTopics(
                infoID
              );
      
              setFavTopics(responseFavTopics);
              setUnFavTopics(responseUnFavTopics);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await user_getUser();
        setInfoID(responseUser.information.infoID)

        const responseFavTopics = await information_getAllFavoriteTopics(
          responseUser.information.infoID
        );
        const responseUnFavTopics = await information_getAllUnfavourateTopics(
          responseUser.information.infoID
        );

        setFavTopics(responseFavTopics);
        setUnFavTopics(responseUnFavTopics);

        console.log(favTopics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.userName]);

  return (
    <View style={styles.container}>
      <View style={[styles.mainView, styles.mainView_Top]}>
        <Text style={styles.header}>Chủ đề bạn đã chọn</Text>
        <ScrollView>
          <View style={styles.topicsView}>
            {favTopics.map((topic) => (
              <View key={topic.topicID} style={styles.eachFavTopic}>
                <View style={styles.favTopicBox}>
                  <Text style={styles.favTopicBoxText}>{topic.topicName}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                  onPress={() => handleRemoveTopic(topic)}
                >
                  <Icon
                    name={icons.cancelCircleIcon}
                    size={20}
                    color={colors.RedLightBackground}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Thêm chủ đề"}
        buttonOnPress={() => handleAddTopics(selectedTopics)}
        buttonLength={"100%"}
      />

      <View style={[styles.mainView, styles.mainView_Bottom]}>
        <Text style={styles.header}>Chủ đề bạn chưa chọn</Text>
        <ScrollView>
          <View style={styles.topicsView}>
            {unFavTopics
              .filter((eachTopic) =>
                eachTopic.topicName
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )
              .map((topic) => (
                <TouchableOpacity
                  key={topic.topicID}
                  style={styles.eachTopic}
                  onPress={() => handlePressTopic(topic.topicID)}
                >
                  <Image
                    source={{ uri: topic.image }}
                    style={styles.topicImg}
                  />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
  },
  header: {
    marginBottom: 11,
    fontSize: fontSizes.h3,
    fontWeight: "bold",
  },
  mainView: {
    width: "90%",
    padding: 15,
    marginTop: "5%",
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 2,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  mainView_Top: {
    height: "26%",
  },
  mainView_Bottom: {
    height: "55%",
  },
  //
  scrollViewFavTopics: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  eachFavTopic: {
    marginBottom: 5,
    marginHorizontal: 1,
    paddingBottom: 7,
    paddingRight: 17,
  },
  favTopicBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
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
