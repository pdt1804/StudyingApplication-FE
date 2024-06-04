import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";

export const SubInfoVertical = ({ icon, text }) => {
  return (
    <View style={styles.verticalContainer}>
      <Icon name={icon} size={25} color={colors.GrayOnContainerAndFixed} />
      <Text style={styles.verticalText}>{text}</Text>
    </View>
  );
};

export const SubInfoHorizontal = ({ icon, title, text }) => {
  return (
    <View style={styles.horizontalContainer}>
      <Icon name={icon} size={25} color={colors.GrayOnContainerAndFixed} />
      <Text style={styles.horizontalTitle}>{title}: </Text>
      <Text style={styles.horizontalText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  verticalContainer: {
    minWidth: 60,
    maxWidth: 100,
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginRight: 5,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 13,
    borderEndColor: colors.PrimaryContainer,
  },
  verticalText: { fontSize: fontSizes.h7, textAlign: "center" },
  //
  horizontalContainer: {
    flexDirection: 'row',
    minWidth: 75,
    maxWidth: 175,
    paddingVertical: 5,
    paddingRight: 15,
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: colors.PrimaryObjects,
  },
  horizontalTitle: { fontSize: fontSizes.h7, textAlign: "center" },
  horizontalText: { fontSize: fontSizes.h7, textAlign: "center", color: colors.noImportantText },
});
