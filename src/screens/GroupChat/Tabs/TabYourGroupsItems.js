import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { Icon } from "../../../components";
import { randomGenerateColor } from "../../../utilities";
import { group_checkNewMessage } from "../../../api";

export default function TabYourGroupsItems(props) {
  let { nameGroup, imageGroup, groupID } = props.group;
  const { onPress } = props;

  const [isNewNotification, setIsNewNotification] = useState(false);
  const [newestMessage, setNewestMessage] = useState('Tin nhắn mới nhất')

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

  const handleLeaveGroup = () => {
    Alert.alert(
      'Bạn muốn rời nhóm?',
      '',
      [
        {
          text: 'Hủy',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => Alert.alert('Oke Pressed'),
          style: 'default',
        },
      ],
    );
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container,isNewNotification ? styles.newNotificationContainer : null,]}>
      <View style={styles.leftContainer}>
        <Icon
          name={{
            uri: imageGroup,
          }}
          size={60}
          color={null}
          style={[styles.avatarImage, { borderColor: randomGenerateColor() }]}
        />
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={[
              styles.textNameGroup,
              isNewNotification ? styles.newNotification : null,
            ]}
          >
            {nameGroup}
          </Text>
          <Text numberOfLines={1} style={[styles.newestMessage,isNewNotification ? styles.newNotification : null,]}>
            {newestMessage}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleLeaveGroup} style={styles.menuIcon}>
      <Icon
        name={icons.exportIcon}
        size={36}
        color={colors.RedLightBackground}
      /></TouchableOpacity>
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
  newNotificationContainer:{
    borderWidth: 3,
    borderColor: colors.SecondaryBackground,
    backgroundColor: colors.SecondaryContainer,
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
  textContainer: {
    flex: 1,
    paddingRight: 50,
  },
  textNameGroup: {
    color: colors.PrimaryOnContainerAndFixed,
    fontSize: fontSizes.h5,
  },
  newNotification: {
    fontWeight: "bold",
    color: colors.PrimaryOnContainerAndFixed,
  },
  newestMessage: {
    color: colors.noImportantText,
    fontSize: fontSizes.h7,
  },
  menuIcon: {
    position: "absolute",
    right: 0,
  },
});
