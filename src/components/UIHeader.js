import React from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import Icon from "./MyIcon";

function UIHeader(props) {
  const {
    title,
    leftIconName,
    rightIconName,
    onPressLeftIcon,
    onPressRightIcon,
    mainStyle,
    iconStyle,
    iconLeftStyle,
    iconRightStyle,
    textStyle,
    onPressTitle,
  } = props;

  return (
    <View style={[styles.fullView, mainStyle]}>
      <View style={styles.safeAreaView} />

      <View style={styles.mainView}>
        {leftIconName != undefined ? (
          <TouchableOpacity
            style={[styles.iconClickable, iconStyle]}
            onPress={onPressLeftIcon}
          >
            <Icon
              name={leftIconName}
              size={30}
              color={colors.PrimaryObjects}
              style={[styles.iconDisplayed, iconStyle, iconLeftStyle]}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBlank} />
        )}

        <Text
          style={[styles.textDisplayed, textStyle]}
          numberOfLines={1}
          onPress={onPressTitle}
        >
          {title}
        </Text>

        {rightIconName != undefined ? (
          <TouchableOpacity
            style={styles.iconClickable}
            onPress={onPressRightIcon}
          >
            <Icon
              name={rightIconName}
              size={30}
              color={colors.PrimaryObjects}
              style={[styles.iconDisplayed, iconStyle, iconRightStyle]}
            />
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
  fullView: { backgroundColor: colors.PrimaryBackground },
  safeAreaView: { height: 25 },
  mainView: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: '3%',
  },
  iconClickable: {
    width: 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBlank: {
    width: 40,
    height: 40,
  },
  iconDisplayed: {
    top: 10,
  },
  textDisplayed: {
    top: 10,
    width: "60%",
    fontWeight: "bold",
    fontSize: fontSizes.h2 * 0.9,
    textAlign: "center",
    alignSelf: "center",
    color: colors.PrimaryObjects,
  },
});
