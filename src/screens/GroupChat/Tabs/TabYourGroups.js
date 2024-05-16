import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import TabYourGroupsItems from "./TabYourGroupsItems";
import {
  SearchBarAndButton,
  CommonButton,
  TextInputMediumIcon,
  WhiteSlideBottomUp,
} from "../../../components";
import { images, icons, colors, fontSizes } from "../../../constants";
import { Icon } from "../../../components";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  groupStudying_getAllGroupofUser,
  groupStudying_createGroup,
  information_getAllTopics,
} from "../../../api";

export default function TabYourGroups(props) {
  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //initialization
  const [groups, setGroups] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupPassword, setNewGroupPassword] = useState("");
  const [newGroupSelectedTopics, setNewGroupSelectedTopics] = useState([]);

  const [activeStep, setActiveStep] = useState(0);
  const [listTopics, setListTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await groupStudying_getAllGroupofUser();
        setGroups(response);
        setListTopics(await information_getAllTopics());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // // Tạo interval --> Hủy interval khi component bị unmounted
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [props.userName]);

  const handlePressTopic = (topic) => {
    setNewGroupSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  const handleSelectedGroup = async (eachGroup) => {
    try {
      await AsyncStorage.removeItem("groupID");
      await AsyncStorage.setItem("groupID", eachGroup.groupID.toString());
      await AsyncStorage.setItem("group", "chat");
      navigate("MessengerGroup", { group: eachGroup });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (newGroupName.length > 8) {
      if (newGroupSelectedTopics.length < 4) {
        const response = await groupStudying_createGroup(
          newGroupName,
          newGroupPassword,
          newGroupSelectedTopics
        );
        if (response.status == 200) {
          alert(
            "Tạo nhóm thành công, vui lòng vào nhóm mới để thêm thành viên"
          );
          setModalVisible(false);
        }
      } else {
        alert("Chỉ được chọn tối đa 3 chủ đề");
      }
    } else {
      alert("Nhập tối thiểu 9 ký tự cho tên nhóm");
    }
  };

  //style of ProgressSteps
  const ProgressStepsStyle = {
    borderWidth: 9,
    activeStepIconBorderColor: colors.PrimaryBackground,
    activeStepIconColor: colors.PrimaryContainer,
    activeStepNumColor: colors.PrimaryOnContainerAndFixed,

    completedProgressBarColor: colors.PrimaryBackground,
    progressBarColor: colors.PrimaryContainer,

    completedStepIconColor: colors.PrimaryBackground,
    completedCheckColor: "white",

    disabledStepIconColor: colors.PrimaryContainer,
    disabledStepNumColor: colors.PrimaryContainer,

    labelColor: null,
    labelFontSize: 0,
    activeLabelColor: null,
    activeLabelFontSize: 0,

    activeStep: activeStep,
    //activeStep: 0,

    topOffset: 10,
    marginBottom: 15,
  };

  //style of Step_1
  const Step_1_BasicInfo = {
    nextBtnText: "Tiếp theo",
    previousBtnText: null,
    nextBtnStyle: styles.nextBtn,
    nextBtnTextStyle: styles.nextBtnText,
    previousBtnDisabled: true,
  };

  //style of Step_2
  const Step_2_Topics = {
    label: "Chọn topic (chủ đề) học tập",
    onSubmit: async () => {
      handleCreateGroup();
    },
    previousBtnText: "Quay Lại",
    finishBtnText: "Xong",
    nextBtnStyle: styles.nextBtn,
    nextBtnTextStyle: styles.nextBtnText,
    previousBtnStyle: styles.previousBtn,
    previousBtnTextStyle: styles.previousBtnText,
  };

  const renderContentCreateGroup = () => {
    return (
      <ProgressSteps {...ProgressStepsStyle}>
        <ProgressStep {...Step_1_BasicInfo}>
          <View style={styles.stepAdditionalInfoView}>
            <TextInputMediumIcon
              inputMode={"text"}
              name={"Tên nhóm"}
              icon={icons.personCircleIcon}
              placeholder={"Nhập tên nhóm mới"}
              isPassword={false}
              onChangeText={(text) => setNewGroupName(text)}
            />
            <TextInputMediumIcon
              inputMode={"text"}
              name={"Mật khẩu gia nhập nhóm"}
              icon={icons.phoneRingCircleIcon}
              placeholder={"Nhập mật khẩu mới"}
              isPassword={true}
              onChangeText={(text) => setNewGroupPassword(text)}
            />
          </View>
        </ProgressStep>
        <ProgressStep {...Step_2_Topics}>
          <Text style={styles.stepAdditionalInfoTitle}>
            Bạn quan tâm đến những gì?
          </Text>
          <View style={styles.listTopicsView}>
            {listTopics.map((topic) => (
              <TouchableOpacity
                key={topic.topicID}
                style={styles.eachTopicsView}
                onPress={() => handlePressTopic(topic.topicID)}
              >
                <Image
                  source={{ uri: topic.image }}
                  style={styles.eachTopicsImage}
                />

                {newGroupSelectedTopics.includes(topic.topicID) && (
                  <View style={styles.eachTopicsSelected} />
                )}

                <Text style={styles.eachTopicsText}>{topic.topicName}</Text>
                {newGroupSelectedTopics.includes(topic.topicID) && (
                  <Icon
                    name={icons.checkMarkIcon}
                    size={24}
                    color={colors.PrimaryContainer}
                    style={styles.eachTopicsSelectedIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ProgressStep>
      </ProgressSteps>
    );
  };

  return (
    <View style={styles.container}>
      <WhiteSlideBottomUp
        title={"Tạo nhóm mới"}
        renderContent={renderContentCreateGroup}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Tạo nhóm học tập"}
        buttonOnPress={() => {
          setNewGroupName("");
          setNewGroupPassword("");
          setNewGroupSelectedTopics([]);
          setModalVisible(true);
        }}
        buttonLength={"100%"}
      />

      <View style={styles.blackLine} />

      <ScrollView>
        {groups
          .filter((eachGroup) =>
            eachGroup.nameGroup.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachGroup) => (
            <TabYourGroupsItems
              group={eachGroup}
              key={eachGroup.groupID}
              onPress={() => {
                handleSelectedGroup(eachGroup);
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  blackLine: {
    backgroundColor: colors.inactive,
    height: 1,
    width: "95%",
    alignSelf: "center",
  },
  //steps
  stepAdditionalInfoView: {
    alignItems: "center",
  },
  stepAdditionalInfoTitle: {
    textAlign: "center",
    fontSize: fontSizes.h4,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
  },
  //listTopics
  listTopicsView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  eachTopicsView: {
    width: "48%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  eachTopicsImage: {
    flex: 1,
    width: "100%",
    resizeMode: "stretch",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  eachTopicsText: {
    left: 5,
    bottom: 0,
    position: "absolute",
    color: "white",
    fontSize: fontSizes.h7,
    fontWeight: "900",
  },
  eachTopicsSelected: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
    backgroundColor: "black",
    opacity: 0.5,
  },
  eachTopicsSelectedIcon: {
    top: 0,
    right: 0,
    position: "absolute",
  },
  //Buttons
  nextBtn: {
    width: 115,
    borderColor: colors.RedOnContainerAndFixed,
    borderWidth: 1,
    borderBottomRightRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.RedLightBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtnText: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
    color: colors.RedObjects,
  },
  previousBtn: {
    width: 115,
    borderColor: colors.GrayOnContainerAndFixed,
    borderWidth: 1,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: colors.GrayBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  previousBtnText: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
    color: colors.GrayObjects,
  },
});
