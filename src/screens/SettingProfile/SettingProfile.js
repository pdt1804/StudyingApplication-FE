import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { CommonButton } from "../../components";

function Settings(props) {
  const [text, setText] = useState("");

  //function of navigation to/back
  const { navigate, goBack } = props.navigation;

  return (
    <SafeAreaView style={styles.fullView}>
      <UIHeader
        title={"Tùy chỉnh"}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {}}
      />

      <ScrollView>
        <View /* username */ style={styles.textInputView}>
          <Image source={images.personIcon} style={styles.textInputImage} />
          <TextInput
            onChangeText={setText}
            value={text}
            placeholder="Your new Username"
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <View /* phone number */ style={styles.textInputView}>
          <Image source={images.phoneIcon} style={styles.textInputImage} />
          <TextInput
            onChangeText={setText}
            value={text}
            placeholder="Your new Phone number"
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <View /* email */ style={styles.textInputView}>
          <Image source={images.emailIcon} style={styles.textInputImage} />
          <TextInput
            onChangeText={setText}
            value={text}
            placeholder="Your new Email"
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <CommonButton onPress={()=>{alert('haha')}} title={"Thay mới".toUpperCase()} />
        <CommonButton onPress={()=>{alert('dismemay')}} title={"Hủy".toUpperCase()} />
      </ScrollView>
    </SafeAreaView>
  );
}
export default Settings;

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  textInputView: {
    flexDirection: "row",
    alignItems: "center",

    marginHorizontal: 15,
    marginTop: 40,
    padding: 5,

    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
  },
  textInputImage: {
    width: 25,
    height: 25,
    marginRight: 10,
    marginLeft: 10,
  },
});
