import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { group_checkNewMessage } from "../../../api";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

function TabYourGroupsItems(props) {
  let { nameGroup, imageGroup, newestMessage, status, groupID } = props.group;

  const { onPress } = props;

  let fontSizeName = fontSizes.h5;
  if (nameGroup.length > 22) {
    fontSizeName = fontSizes.h6;
  }

  const [isNewNotification, setIsNewNotification] = useState(false);

  useEffect(() => {
    const checkNewNotification = async () => {
      const response = await group_checkNewMessage(groupID);
      setIsNewNotification(response.data === true);
    };

    checkNewNotification();
    const intervalId = setInterval(checkNewNotification, 1000);
    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);
  }, [groupID]);

  const handlePress = () => {
    setIsNewNotification(false);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image /** Avatar */
        style={[styles.avatarImage, { borderColor: generateColor() }]}
        source={{
          uri: imageGroup,
        }}
      />
      <Text /** Name */
          numberOfLines={2}
        style={
          isNewNotification
            ? styles.textNameGroupWithOutSeen
            : styles.textNameGroup
        }
      >
        {nameGroup}
      </Text>
    </TouchableOpacity>
  );
}
export default TabYourGroupsItems;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginVertical: "2%",
    marginHorizontal: "4%",
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth: 1,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: colors.ShadowedItems,
  },
  avatarImage: {
    width: 65,
    height: 65,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 15,
    alignSelf: "center",
    borderWidth: 3,
  },
  textNameGroupWithOutSeen: {
    width: "80%",
    paddingRight: 15,
    color: colors.active,
    fontSize: 16,
    fontWeight: "bold",
  },
  textNameGroup: {
    width: "80%",
    paddingRight: 15,
    color: "black",
    fontSize: 16,
  },
});
