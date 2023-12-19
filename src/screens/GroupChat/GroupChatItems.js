import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../constants";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

function GroupChatItems(props) {
  let { nameGroup, imageGroup, groupID } = props.group;
  const { onPress } = props;

  let fontSizeName = fontSizes.h5;
  if (true) {
    fontSizeName = fontSizes.h6;
  }

  const SelectedGroup = async () => {
    alert(groupID);
  }

  return (
    <TouchableOpacity  style={styles.container}  onPress={SelectedGroup}>
      <Image /** Avatar */
        style={[styles.avatarImage, {borderColor: generateColor()}]}
        source={{
          uri: imageGroup,
        }}
      />
      <Text /** Name */
        style={{
          width: '80%',
          color: "black",
          fontSize: fontSizeName,
        }}
      >
        {nameGroup}
      </Text>
    </TouchableOpacity>
  );
}
export default GroupChatItems;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginVertical:'2%',
    marginHorizontal: '4%',
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth:1,
    backgroundColor: colors.transparentWhite,
  },
  avatarImage: {
    width: 65,
    height: 65,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 15,
    alignSelf: "center",
    borderWidth:3,
  },
});
