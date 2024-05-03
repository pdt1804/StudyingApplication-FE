import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import Icon from "./MyIcon";

export function SubjectBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.containerSubjectBox}>
      <Icon name={icon} size={25} color={"black"} style={styles.icon} />
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.SubjectBoxContent}>{content}</Text>
    </View>
  );
}

export function ContentBox(props) {
  const {
    icon,
    title,
    content,
    OnPressContent,
    isLikeAble,
    likeStatus,
    onPressLikeIcon,
  } = props;

  return (
    <View style={styles.containerContentBox}>
      <View style={styles.ContentBoxTopView}>
        <TouchableOpacity
          style={styles.leftSideTopView}
          onPress={OnPressContent}
        >
          <Icon name={icon} size={25} color={"black"} style={styles.icon} />
          <Text style={styles.title}>{title}: </Text>
        </TouchableOpacity>

        {isLikeAble ? (
          <TouchableOpacity
            style={styles.rightSideTopView}
            onPress={onPressLikeIcon}
          >
            <Icon
              name={likeStatus ? icons.activeLikeIcon : icons.inactiveLikeIcon}
              size={30}
              color={likeStatus ? "gold" : "black"}
              style={styles.icon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <Text style={styles.ContentBoxContent}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  //s
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

  //c
  containerContentBox: {
    flexDirection: "column",
    paddingStart: 15,
    padding: 10,
  },
  ContentBoxTopView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSideTopView: { flexDirection: "row" },
  rightSideTopView: {},
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
});
