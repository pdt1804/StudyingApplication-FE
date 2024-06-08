import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { Icon } from "../../../components";
import { randomGenerateColor } from "../../../utilities";
import { group_checkNewMessage } from "../../../api";

export default function TabYourGroupsItems(props) {
  let { nameGroup, imageGroup, groupID } = props.group;
  const { onPress } = props;

  const [isNewNotification, setIsNewNotification] = useState(false);

  const checkNewNotification = async () => {
    const response = await group_checkNewMessage(groupID);
    setIsNewNotification(response.data === true);
  };

  useEffect(() => {
    checkNewNotification();
  }, [groupID]);

  const handlePress = () => {
    setIsNewNotification(false);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.leftContainer}>
        <Icon
          name={{
            uri: imageGroup,
          }}
          size={60}
          color={null}
          style={[styles.avatarImage, { borderColor: randomGenerateColor() }]}
        />
        <Text
          numberOfLines={2}
          style={[
            styles.textNameGroup,
            isNewNotification ? styles.newNotification : null,
          ]}
        >
          {nameGroup}
        </Text>
      </View>
      <Icon
        name={icons.menuIcon}
        size={36}
        color={colors.GrayBackground}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginVertical: "2%",
    marginHorizontal: "4%",
    paddingRight: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.inactive,
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 3,
  },
  textNameGroup: {
    width: "60%",
    color: colors.PrimaryOnContainerAndFixed,
    fontSize: fontSizes.h5,
  },
  newNotification: {
    fontWeight: "bold",
  },
});
