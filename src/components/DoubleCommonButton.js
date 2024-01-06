import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, fontSizes } from "../constants/index";

function DoubleCommonButton(props) {
  const { onPressLeft, titleLeft, onPressRight, titleRight } = props;
  const { styleLeft, styleRight } = props;

  let fontSizeTitleLeft = fontSizes.h4;
  let fontSizeTitleRight = fontSizes.h4;

  if (titleLeft.length > 6) {
    fontSizeTitleLeft = fontSizes.h6;
  }
  if (titleRight.length > 6) {
    fontSizeTitleRight = fontSizes.h6;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressLeft} style={[styles.buttons, styleLeft]}>
        <Text
          style={{
            padding: 11,
            fontSize: fontSizeTitleLeft,
            fontWeight: "bold",
            color: colors.PrimaryObjects,
          }}
        >
          {titleLeft}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressRight} style={[styles.buttons, styleRight]}>
        <Text
          style={{
            padding: 11,
            fontSize: fontSizeTitleRight,
            fontWeight: "bold",
            color: colors.PrimaryObjects,
          }}
        >
          {titleRight}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default DoubleCommonButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  buttons: {
    width: '45%',
    paddingHorizontal: 5,

    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 1,
    borderRadius: 30,

    backgroundColor: colors.PrimaryBackground,

    justifyContent: "center",
    alignItems: "center",
  },
});
