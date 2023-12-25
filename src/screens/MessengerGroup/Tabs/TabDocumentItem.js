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
//import { openDoc, isDoc, filePath } from 'react-native-doc-viewer';


function TabDocumentItem(props) {
  let { header, type, dateUploaded, documentID } = props.doc;

  const date = new Date(dateUploaded)

  const { onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.img} source={images.personCircleIcon} />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {header}
        </Text>
        <Text style={styles.contentText} numberOfLines={2}>
          {type.toString().toUp}
        </Text>
      </View>
      <Text style={styles.timeText}>{date.getHours()}:{date.getMinutes()} {date.getDate()}/{date.getMonth() + 1}</Text>
    </TouchableOpacity>
  );
}
export default TabDocumentItem;

const styles = StyleSheet.create({
  container: {
    height: 63,
    marginBottom: 15,
    flexDirection: "row",
  },
  img: {
    width: 33,
    height: 33,
    resizeMode: "stretch",
    marginTop: 11,
    marginHorizontal: 10,
    tintColor: colors.active,
  },
  textView: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: colors.active,
    fontSize: fontSizes.h6,
    fontWeight: "400",
  },
  contentText: {
    color: "black",
    fontSize: fontSizes.h7,
    fontWeight: "300",
  },
  timeText: {
    width: 70,
    padding: 10,
    paddingLeft: 0,
    color: "black",
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "right",
    color: colors.inactive,
    marginTop: -15,
  },
});
