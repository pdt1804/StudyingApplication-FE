import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";

export const RowSectionTitle = (props) => {
  const { text } = props;
  return (
    <View style={styles.containerTitle}>
      <Text style={styles.titleText}>{text}</Text>
    </View>
  );
};

export const RowSectionDisplay = (props) => {
  const { icon, text } = props;
  return (
    <View style={styles.containerDisplay}>
      <Icon
        name={icon}
        size={20}
        color={colors.PrimaryBackground}
        style={{ marginRight: 0 }}
      />
      <Text style={styles.displayText}>{text}</Text>
    </View>
  );
};

export const RowSectionNavigate = (props) => {
  const { icon, text, onPress } = props;
  return (
    <TouchableOpacity style={styles.containerDisplay} onPress={onPress}>
      <Icon
        name={icon}
        size={20}
        color={colors.PrimaryBackground}
        style={{ marginRight: 0 }}
      />
      <Text style={styles.displayText}>{text}</Text>
      <View style={{ flex: 1 }} />
      <Icon
        name={icons.chevronRightIcon}
        size={20}
        color={colors.PrimaryBackground}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerTitle: {
    height: 50,
    marginStart: 12,
    justifyContent: "center",
  },
  titleText: {
    fontSize: fontSizes.h7,
    color: colors.noImportantText,
    paddingStart: 10,
  },
  containerDisplay: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  displayText: {
    fontSize: fontSizes.h6,
    color: "black",
    paddingStart: 15,
  },
});
