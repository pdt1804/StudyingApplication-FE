import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import {
  CommonButton,
  Icon,
  TextInputTransparent,
  TextInputMediumIcon,
} from "../components";
import { user_register, user_createAccountData } from "../api";
import CryptoJS from "crypto-js";
import { RadioButton } from "react-native-paper";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

const Registration = (props) => {
  const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword;
  };

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  //basic info
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  //newUser & OTP
  const [newUser, setNewUser] = useState("");
  const [systemOTP, setSystemOTP] = useState("");
  const [inputOTP, setInputOTP] = useState("");

  //additional info
  const [gender, setGender] = useState("Nam");
  const [phoneNumber, setPhoneNumber] = useState("0000000000");
  const [yearOfBirth, setYearOfBirth] = useState("yyyy");
  const topics = [
    { name: "Trí tuệ nhân tạo", image: images.topicAI },
    { name: "Sinh học tổng hợp", image: images.topicBio },
    { name: "Quản lý thông tin 5G", image: images.topic5G },
    { name: "Tương tác con người-máy", image: images.topicHumanAndMachine },
    { name: "Học máy trong cuộc sống", image: images.topicMachineLearning },
    { name: "Hệ thống thông tin phân tử", image: images.topicMicro },
    { name: "Quyền riêng tư và an ninh", image: images.topicPrivacy },
    { name: "Phát hiện đe dọa mạng", image: images.topicHacker },
    { name: "IoT trong giao thông", image: images.topicIoT },
    { name: "Thuật toán mạng xã hội", image: images.topicMedia },
  ];
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

  //use for api
  const handleRegister = async () => {
    const result = await user_register(username, password, email, rePassword);
    if (result) {
      setActiveStep(1);
      setNewUser(result.newUser);
      setSystemOTP(result.otp);
      //--------
      /* navigate("Verification", {
        newUser: result.newUser,
        otp: result.otp,
        actionType: "Registration",
      }); */
    }
  };

  //use for api: Registration
  const handleVerification_Registration = async () => {
    alert(
      `Registration: otp từ hệ thống: ${systemOTP}, từ màn hình: ${inputOTP},`
    );

    if (systemOTP == inputOTP) {
      const dataResponse = await user_createAccountData(newUser);
      if (dataResponse == newUser.userName) {
        //alert("Đăng ký thành công, hãy đăng nhập và trải nghiệm");
        //navigate("Login");
        setActiveStep(2);
      } else {
        //unsuccessful
        alert("Đã có lỗi xảy ra, vui lòng thử lại");
      }
    } else {
      //alert("OTP không đúng");
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
    topOffset: 10,
    marginBottom: 15,
  };

  //style of Step_BasicInfo
  const Step_BasicInfo = {
    label: "Thông tin tài khoản",
    removeBtnRow: true,
  };

  //style of Step_OTP
  const Step_OTP = {
    label: "Nhập OTP",
    removeBtnRow: true,
  };

  //style of Step_AdditionalInfo_1
  const Step_AdditionalInfo_1 = {
    nextBtnText: "Tiếp theo",
    previousBtnText: null,
    nextBtnStyle: styles.nextBtn,
    nextBtnTextStyle: styles.nextBtnText,
    previousBtnDisabled: true,
  };

  //style of Step_AdditionalInfo_2
  const Step_AdditionalInfo_2 = {
    onSubmit: null,
    nextBtnText: "Tiếp theo",
    previousBtnText: "Quay Lại",
    finishBtnText: "Xong",
    nextBtnStyle: styles.nextBtn,
    nextBtnTextStyle: styles.nextBtnText,
    previousBtnStyle: styles.previousBtn,
    previousBtnTextStyle: styles.previousBtnText,
    removeBtnRow: null,
  };

  return (
    <View style={styles.container}>
      <Image source={images.uitLogo} style={styles.imageUIT} />

      <View style={styles.whiteView}>
        <ProgressSteps {...ProgressStepsStyle}>
          <ProgressStep {...Step_BasicInfo}>
            <View style={{ alignItems: "center" }}>
              <TextInputTransparent
                inputMode={"text"}
                icon={icons.personIcon}
                placeholder={"Username"}
                onChangeText={(text) => {
                  setUsername(text);
                }}
              />

              <TextInputTransparent
                inputMode={"email"}
                icon={icons.emailIcon}
                placeholder={"Email"}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />

              <TextInputTransparent
                inputMode={"text"}
                icon={icons.keyIcon}
                placeholder={"Password"}
                isPassword={true}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />

              <TextInputTransparent
                inputMode={"text"}
                icon={icons.addKeyIcon}
                placeholder={"Re-enter Password"}
                isPassword={true}
                onChangeText={(text) => {
                  setRePassword(text);
                }}
              />

              <CommonButton
                onPress={handleRegister}
                title={"Đăng Ký".toUpperCase()}
              />

              <TouchableOpacity
                onPress={() => {
                  navigate("Login");
                }}
                style={styles.loginNavigate}
              >
                <Text style={styles.loginNavigateText}>
                  Về màn hình Đăng Nhập
                </Text>
              </TouchableOpacity>
            </View>
          </ProgressStep>

          <ProgressStep {...Step_OTP}>
            <View style={styles.container_OTP}>
              <View style={styles.mainView}>
                <TextInputMediumIcon
                  name={"Mã xác thực"}
                  icon={icons.emailCheckMarkIcon}
                  placeholder={"Nhập mã xác thực"}
                  onChangeText={(number) => setInputOTP(number)}
                />

                <CommonButton
                  onPress={handleVerification_Registration}
                  title={"tiếp tục".toUpperCase()}
                />
              </View>
            </View>
          </ProgressStep>

          <ProgressStep {...Step_AdditionalInfo_1} label="Giới tính">
            <View style={styles.stepAdditionalInfoView}>
              <Text style={styles.stepAdditionalInfoTitle}>
                Giới tính của bạn là gì?
              </Text>
              <RadioButton.Group
                onValueChange={(newGender) => setGender(newGender)}
                value={gender}
              >
                <View style={styles.eachRadioButtonView}>
                  <RadioButton value="Nam" />
                  <Text>Nam</Text>
                </View>
                <View style={styles.eachRadioButtonView}>
                  <RadioButton value="Nữ" />
                  <Text>Nữ</Text>
                </View>
                <View style={styles.eachRadioButtonView}>
                  <RadioButton value="Khác" />
                  <Text>Khác</Text>
                </View>
              </RadioButton.Group>
            </View>
          </ProgressStep>

          <ProgressStep {...Step_AdditionalInfo_2} label="Số điện thoại">
            <View style={styles.stepAdditionalInfoView}>
              <Text style={styles.stepAdditionalInfoTitle}>
                Số điện thoại của bạn là gì?
              </Text>

              <TextInputTransparent
                inputMode={"numeric"}
                icon={icons.phoneIcon}
                placeholder={"Nhập số điện thoại của bạn"}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                }}
              />
            </View>
          </ProgressStep>

          <ProgressStep {...Step_AdditionalInfo_2} label="Năm sinh">
            <View style={styles.stepAdditionalInfoView}>
              <Text style={styles.stepAdditionalInfoTitle}>
                Năm sinh của bạn là gì?
              </Text>

              <TextInputTransparent
                inputMode={"numeric"}
                icon={icons.birthdayCakeIcon}
                placeholder={"Nhập năm sinh của bạn"}
                onChangeText={(text) => {
                  setYearOfBirth(text);
                }}
              />
            </View>
          </ProgressStep>

          <ProgressStep
            {...Step_AdditionalInfo_2}
            label="Chọn topic (chủ đề) học tập"
          >
            <View style={styles.stepAdditionalInfoView}>
              <Text style={styles.stepAdditionalInfoTitle}>
                Bạn quan tâm đến những gì?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {topics.map((topic, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: "48%",
                      height: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 10,
                      position: "relative",
                    }}
                    onPress={() => handlePressTopic(topic.name)}
                  >
                    <Image
                      source={topic.image}
                      style={{
                        flex: 1,
                        width: "100%",
                        resizeMode: "stretch",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                      }}
                    />

                    {selectedTopics.includes(topic.name) && (
                      <View
                        style={{
                          ...StyleSheet.absoluteFillObject,
                          borderRadius: 15,
                          backgroundColor: "black",
                          opacity: 0.5,
                        }}
                      />
                    )}

                    <Text
                      style={{
                        left: 5,
                        bottom: 0,
                        position: "absolute",
                        color: "white",
                        fontSize: fontSizes.h7,
                        fontWeight: "900",
                      }}
                    >
                      {topic.name}
                    </Text>
                    {selectedTopics.includes(topic.name) && (
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
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </View>
  );
};
export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryContainer,
  },
  imageUIT: {
    width: 200,
    marginTop: "-50%",
    resizeMode: "contain",
    position: "absolute",
    alignSelf: "center",
  },
  whiteView: {
    flex: 7,
    width: "99%",
    marginTop: "60%",
    paddingHorizontal: "5%",
    borderColor: colors.transparentWhite,
    borderWidth: 2,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: colors.transparentWhite,
    alignSelf: "center",
  },
  loginNavigate: {
    marginHorizontal: "10%",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  loginNavigateText: {
    padding: 10,
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: "blue",
  },
  container_OTP: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  //Step_AdditionalInfo
  stepAdditionalInfoView: { alignItems: "center" },
  stepAdditionalInfoTitle: {
    alignSelf: "center",
    fontSize: fontSizes.h4,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 30,
  },
  eachRadioButtonView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "10%",
    marginVertical: 10,
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
