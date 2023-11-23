import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { images, colors, fontSizes } from "../constants/index";

function CommonButton(props) {
  const { onPress, title } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginHorizontal: 55,
        marginTop: 20,
        marginBottom: 5,

        borderColor: colors.CommonButtonBorder,
        borderWidth: 2,
        borderRadius: 30,

        backgroundColor: colors.CommonButton,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          padding: 11,
          fontSize: fontSizes.h3,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CommonButton;
