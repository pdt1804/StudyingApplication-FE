import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";

function TabNotificationItems(props) {
  let { title } = props.notification;
  const { onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.mainContainer}>
        <Image style={styles.img} source={images.personCircleIcon} />
        <View style={styles.textView}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
      <View style={styles.bottomLine} />
    </TouchableOpacity>
  );
}
export default TabNotificationItems;

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: "column",
  },
  mainContainer: {
    paddingTop: 15,
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    borderRadius: 90,
    marginRight: 15,
    tintColor: colors.blogIcon,
  },
  textView: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    color: "black",
    fontSize: fontSizes.h5,
  },
  bottomLine: {
    backgroundColor: colors.inactive,
    height: 1,
    marginTop: 11,
  },
});
