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

function TabDiscussionItems(props) {
  let { type, content } = props.topic;
  const { onPress } = props;

  const _getIcon = () => {
    let iconName = null;
    type == "Tin tức"
      ? (iconName = images.activeBlogSearchIcon)
      : type == "Hỏi đáp"
      ? (iconName = images.questionMarkIcon)
      : type == "Đánh giá"
      ? (iconName = images.checkMarkIcon)
      : type == "Thảo Luận"
      ? (iconName = images.activeChatMessageIcon)
      : (iconName = images.warningShieldIcon);
    return <Image source={iconName} style={styles.icon} />;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.topView}>
        {_getIcon()}
        <Text /** Name */ style={styles.text}>{type}</Text>
      </View>
      <Text style={styles.content} numberOfLines={5} >{content}</Text>
    </TouchableOpacity>
  );
}
export default TabDiscussionItems;

const styles = StyleSheet.create({
  container: {
    height: 160,
    margin: 10,
    paddingTop: 15,
    paddingStart: 10,
    flexDirection: 'column',
    borderRadius: 10,
    elevation: 8,
    backgroundColor: colors.ShadowedItems,
  },
  topView: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
    resizeMode: "stretch",
    tintColor: colors.postIcon,
  },
  text: {
    marginTop: 5,
    marginLeft: 5,
    color: "black",
    fontSize: fontSizes.h5,
  },
  content: {
    marginLeft: 7,
    marginRight: 10,
    color: "black",
    fontSize: fontSizes.h7,
  }
});
