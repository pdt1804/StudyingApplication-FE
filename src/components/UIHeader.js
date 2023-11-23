import React from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { colors, fontSizes } from "../constants";

function UIHeader(props) {
  const {
    title,
    leftIconName,
    rightIconName,
    onPressLeftIcon,
    onPressRightIcon,
  } = props;

  return (
    <View style={styles.fullView}>
      <View style={styles.safeAreaView} />
      <View style={styles.mainView}>
        {leftIconName != undefined ? (
          <TouchableOpacity
            style={styles.iconClickable}
            onPress={onPressLeftIcon}
          >
            <Image source={leftIconName} style={styles.iconDisplayedLeft} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBlank} />
        )}
        <Text style={styles.textDisplayed}>{title}</Text>
        {rightIconName != undefined ? (
          <TouchableOpacity
            style={styles.iconClickable}
            onPress={onPressRightIcon}
          >
            <Image source={rightIconName} style={styles.iconDisplayedRight} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBlank} />
        )}
      </View>
    </View>
  );
}
export default UIHeader;

const styles = StyleSheet.create({
  fullView: { backgroundColor: colors.active },
  safeAreaView: { height: 25 },
  mainView: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconClickable: {
    width: 50,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBlank: {
    width: 50,
    height: 50,
  },
  iconDisplayedLeft: {
    width: 35,
    height: 35,
    marginStart: 10,
    tintColor: colors.UIHeaderTextAndIcon,
  },
  iconDisplayedRight: {
    width: 35,
    height: 35,
    marginEnd: 10,
    tintColor: colors.UIHeaderTextAndIcon,
  },
  textDisplayed: {
    fontWeight: "bold",
    fontSize: fontSizes.h2,
    alignSelf: "center",
    lineHeight: 45,
    color: colors.UIHeaderTextAndIcon,
  },
});
