import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";

export const FloatingButtonSingle = ({ icon, text, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.floatingButtonContainer, style]}
      onPress={onPress}
    >
      <Icon name={icon} size={25} color={colors.PrimaryBackground} />
      <Text style={styles.floatingButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const FloatingButtonDouble = ({
  iconFirst,
  textFirst,
  onPressFirst,
  iconSecond,
  textSecond,
  onPressSecond,
}) => {
  return (
    <View>
      <FloatingButtonSingle
        icon={iconFirst}
        text={textFirst}
        onPress={onPressFirst}
        style={{ bottom: 80 }}
      />

      <FloatingButtonSingle
        icon={iconSecond}
        text={textSecond}
        onPress={onPressSecond}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    flexDirection: "row",
    minWidth: 75,
    maxWidth: 175,
    position: "absolute",
    right: 20,
    bottom: 30,
    paddingVertical: 7,
    paddingRight: 15,
    alignItems: "center",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.PrimaryBackground,
    backgroundColor: colors.PrimaryObjects,
  },
  floatingButtonText: {
    fontSize: fontSizes.h7,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.PrimaryOnContainerAndFixed,
  },
});
