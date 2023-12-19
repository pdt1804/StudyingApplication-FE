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
    mainStyle,
    iconStyle,
    iconLeftStyle,
    iconRightStyle,
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
            <Image
              source={leftIconName}
              style={[styles.iconDisplayedLeft, iconStyle, iconLeftStyle]}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBlank} />
        )}

        <Text style={styles.textDisplayed} numberOfLines={1}>
          {title}
        </Text>

        {rightIconName != undefined ? (
          <TouchableOpacity
            style={styles.iconClickable}
            onPress={onPressRightIcon}
          >
            <Image
              source={rightIconName}
              style={[styles.iconDisplayedRight, iconStyle, iconRightStyle]}
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
  fullView: { backgroundColor: colors.active },
  safeAreaView: { height: 25 },
  mainView: {
    height: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    //backgroundColor: 'pink'
  },
  iconDisplayedLeft: {
    top: 10,
    width: 30,
    height: 30,
    marginStart: 10,
    tintColor: colors.UIHeaderTextAndIcon,
  },
  iconDisplayedRight: {
    top: 10,
    width: 30,
    height: 30,
    marginEnd: 10,
    tintColor: colors.UIHeaderTextAndIcon,
  },
  textDisplayed: {
    top: 10,
    width: "60%",
    fontWeight: "bold",
    fontSize: fontSizes.h2 * 0.9,
    textAlign: 'center',
    alignSelf: "center",
    color: colors.UIHeaderTextAndIcon,
    //backgroundColor: 'pink'
  },
});
