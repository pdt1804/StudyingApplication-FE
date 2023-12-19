import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../constants";

function MessengerItems(props) {
  let { imageUrl, isSender, message, timestamp } = props.item;

  return isSender == false ? (
    <View /** isSender = false --> avatar > message */ style={styles.container}>
      <Image style={styles.avatar} source={{ uri: imageUrl }} />

      <View style={styles.leftView}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  ) : (
    <View /** isSender = true --> message > avatar */ style={styles.container}>
      <View style={styles.rightView}>
        <Text style={styles.message}>{message}</Text>
      </View>

      <Image style={styles.avatar} source={{ uri: imageUrl }} />
    </View>
  );
}
export default MessengerItems;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    minHeight: 90,
    paddingTop: 20,
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    resizeMode: "cover",
    borderRadius: 30,
    marginTop: 9,
    marginRight: 15,
    alignSelf: 'flex-start',
  },
  message: {
    color: "black",
    fontSize: fontSizes.h6,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: colors.message,
    borderRadius: 10,
  },
  leftView: {
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
    justifyContent: "flex-start",
  },
  rightView: {
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
    justifyContent: "flex-end",
  },
});
