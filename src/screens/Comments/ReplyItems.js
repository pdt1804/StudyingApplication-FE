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
import { images, colors, icons, fontSizes } from "../../constants";

function ReplyItems(props) {
  let { avatar, fulname, content, dateSent } = props.comment;

  //const date = new Date(dateSent)

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: avatar,
        }}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {fulname}
        </Text>
        <Text style={styles.contentText}>
          {content}
        </Text>
      </View>
      {/* <Text style={styles.timeText}>{date.getHours()}:{date.getMinutes()} {date.getDate()}/{date.getMonth() + 1}</Text> */}
      <View style={styles.rightSideView}>
      <Text style={styles.rightSideText}>{dateSent}</Text>
      </View>
    </View>
  );
}
export default ReplyItems;

const styles = StyleSheet.create({
  container: {
    minHeight: 65,
    marginLeft: 33,
    marginBottom: 15,
    flexDirection: "row",
  },
  img: {
    width: 55,
    height: 55,
    resizeMode: "stretch",
    borderRadius: 15,
    marginTop: 11,
    marginHorizontal: 10,
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
  rightSideView: {
    flexDirection: 'column',
    paddingTop: 10,
  },
  rightSideText: {
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
