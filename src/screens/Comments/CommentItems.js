import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";

function CommentItems(props) {
  const { onPress } = props;
  const { commentID, dateComment, userComment, content, replies, images } =
    props.comment;

  const replyImages = [];

  if (images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const parts = images[i].toString().split("-");
      replyImages.push(parts[0]);
    }
  }

  const getTime = () => {
    const date = new Date(dateComment);
    return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
      date.getMonth() + 1
    }`;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: userComment.information.image,
        }}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {userComment.information.fulName}
        </Text>
        <Text style={styles.contentText} numberOfLines={4}>
          {content}
        </Text>
        <View style={{flexDirection: 'row'}}>
          {replyImages.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
          <Image source={icons.activeBellAlarm} style={{margin: 10,width: 35, height: 35, alignSelf: 'center'}} />
        </View>
      </View>
      <View style={styles.rightSideView}>
        <Text style={styles.rightSideText}>{getTime()}</Text>
        <Text style={styles.rightSideText}>{replies.length} phản hồi</Text>
      </View>
    </TouchableOpacity>
  );
}
export default CommentItems;

const styles = StyleSheet.create({
  container: {
    minHeight: 65,
    //maxHeight: 150,
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
    marginTop: 15,
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
    flexDirection: "column",
    paddingTop: 10,
  },
  rightSideText: {
    width: 100,
    padding: 10,
    paddingLeft: 0,
    color: "black",
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "right",
    color: colors.inactive,
    marginTop: -10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginTop: 10,
    borderRadius: 5,
    //borderWidth: 3,
    //borderColor: colors.PrimaryBackground,
  },
});
