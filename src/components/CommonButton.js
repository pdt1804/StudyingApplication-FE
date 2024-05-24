import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";

export default function CommonButton(props) {
  const { onPress, title, styleContainer, styleText } = props;

  let fontSizeTitle = fontSizes.h4;
  if (title.length > 10) {
    fontSizeTitle = fontSizes.h6;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, styleContainer]}
    >
      <Text
        style={[
          {
            fontSize: fontSizeTitle,
          },
          styles.defaultText,
          styleText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 55,
    marginTop: 20,
    marginBottom: 5,

    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 1,
    borderRadius: 30,

    backgroundColor: colors.PrimaryBackground,

    justifyContent: "center",
    alignItems: "center",
  },
  defaultText: {
    padding: 11,
    fontWeight: "bold",
    color: colors.PrimaryObjects,
  },
});
