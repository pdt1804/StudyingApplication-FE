import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";

export default function ReplyItems(props) {
  const { navigate } = props;
  const { userReplied, dateReplied, content, files } = props.reply;

  const MAXWidth = 245;
  const getWidth = (baseWidth) => {
    return baseWidth > MAXWidth ? MAXWidth : baseWidth
  }
  const getHeight = (baseWidth, baseHeight) => {
    return baseWidth > MAXWidth ? baseHeight / (baseWidth / MAXWidth) : baseHeight

  }

  const getTime = () => {
    const date = new Date(dateReplied);
    return `${date.getHours()}:${date.getMinutes()} \n ${date.getDate()}/${
      date.getMonth() + 1
    }`;
  };

  const ShowProfile = async () => {
    navigate("ShowProfile", { userReplied: userReplied });
  };

  const handleShowPicture = () => {
    navigate("ShowPicture", { files: files });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={ShowProfile}>
      <Image
        style={styles.img}
        source={{
          uri: userReplied.information.image,
        }}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {userReplied.information.fulName}
        </Text>
        <Text style={styles.contentText}>{content}</Text>
        <View>
          {files.map((eachImage, index) => (
                <TouchableOpacity key={index} onPress={() => handleShowPicture()}>
                  <Image
                    source={{ uri: eachImage.url }}
                    style={[
                      styles.image,
                      {
                        width: getWidth(eachImage.width),
                        height: getHeight(eachImage.width, eachImage.height),
                      }
                    ]}
                  />
                </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.rightSideView}>
        <Text style={styles.rightSideText}>{getTime()}</Text>
      </View>
    </TouchableOpacity>
  );
}

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
    marginTop: 10,
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
    marginTop: 10,
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
  image: {
    maxWidth: 245,
    resizeMode: "contain",
    marginVertical:2,
    borderRadius: 5,
    //borderWidth: 3,
    //borderColor: colors.GrayBackground,
  },
});
