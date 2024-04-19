import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import Icon from "./MyIcon";

export function SubjectBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.containerSubjectBox}>
      <Icon name={icon} size={25} color={'black'} style={styles.icon} />
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.SubjectBoxContent}>{content}</Text>
    </View>
  );
}

export function ContentBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.containerContentBox}>
      <View style={styles.ContentBoxTopView}>
        <Icon
          name={icon}
          size={25}
          color={'black'}
          style={styles.icon}
        />
        <Text style={styles.title} onPress={props.OnPressContent}>
          {title}:{" "}
        </Text>
      </View>
      <Text style={styles.ContentBoxContent}>{content}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  containerSubjectBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
  },
  SubjectBoxContent: {
    marginTop: 2,
    color: colors.noImportantText,
    fontSize: fontSizes.h5 * 0.9,
    fontWeight: "700",
  },
  containerContentBox: {
    flexDirection: "column",
    paddingStart: 15,
    padding: 10,
  },
  ContentBoxTopView: {
    flexDirection: "row",
    alignItems: "center",
  },
  ContentBoxContent: {
    padding: 15,
    marginTop: 5,
    color: "black",
    fontSize: fontSizes.h6,
  },
  icon: {
    marginTop: 7,
  },
  title: {
    color: "black",
    fontSize: fontSizes.h5,
    fontWeight: "500",
  },
})