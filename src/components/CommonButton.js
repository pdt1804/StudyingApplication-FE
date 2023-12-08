import React, { Component } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, fontSizes } from "../constants/index";

function CommonButton(props) {
  const { onPress, title } = props;

  let fontSizeTitle = fontSizes.h4;
  if (title.length > 10) {
    fontSizeTitle = fontSizes.h6;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <Text
        style={{
          padding: 11,
          fontSize: fontSizeTitle,
          fontWeight: "bold",
          color: colors.CommonButtonText,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CommonButton;


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 55,
    marginTop: 20,
    marginBottom: 5,

    borderColor: colors.CommonButtonBorder,
    borderWidth: 1,
    borderRadius: 30,

    backgroundColor: colors.CommonButton,

    justifyContent: "center",
    alignItems: "center",
  },
})