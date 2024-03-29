import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import Icon from "./MyIcon";

export function SearchBarAndButton(props) {
  const {
    searchBarOnChangeText,
    buttonTitle,
    buttonOnPress,
    buttonLength,
    buttonStyle,
  } = props;

  return (
      <View style={styles.searchBarAndButtonView}>
        <View style={styles.searchBarView}>
          <Icon name={icons.searchIcon} size={22} color={"black"} />
          <TextInput
            autoCorrect={false}
            inputMode="search"
            onChangeText={searchBarOnChangeText}
            style={styles.searchBarTypingArea}
          />
        </View>

        <TouchableOpacity
          style={[{ width: buttonLength }, styles.buttonContainer]}
          onPress={buttonOnPress}
        >
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  searchBarAndButtonView: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarView: {
    flex: 1,
    height: "65%",
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  searchBarTypingArea: {
    height: "75%",
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    width: "auto",
    height: "65%",

    marginRight: 10,
    marginTop: 12,

    borderRadius: 20,

    backgroundColor: colors.active,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    paddingHorizontal: 11,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
});
