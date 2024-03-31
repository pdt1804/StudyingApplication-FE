import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { friend_checkNewMessage } from "../../../api";

function TabYourFriendsItems(props) {
  let { fulName, image } = props.friend.information;
  let { userName } = props.friend;
  const { onPress } = props;

  const [isNewNotification, setIsNewNotification] = useState(false);

  useEffect(() => {
    const checkNewNotification = async () => {
      const response = await friend_checkNewMessage(userName);
      setIsNewNotification(response.data === true);
    };
    checkNewNotification();

    const intervalId = setInterval(checkNewNotification, 1000);
    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);
  }, []);

  const ToMessage = async () => {
    try {
      setIsNewNotification(false);
      onPress(await AsyncStorage.getItem("username"), userName);
    } catch (exception) {
      console.error(exception.message);
    }
  };

  return (
    <TouchableOpacity onPress={ToMessage} style={styles.container}>
      <Image
        style={[
          styles.avatarImage,
          isNewNotification ? styles.activeAvatarImage : {},
        ]}
        source={{
          uri: image,
        }}
      />
      <Text style={[styles.name, isNewNotification ? styles.activeName : {}]}>
        {fulName}
      </Text>
    </TouchableOpacity>
  );
}
export default TabYourFriendsItems;

const styles = StyleSheet.create({
  container: {
    width: "33%",
    height: 150,
    paddingStart: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 75,
    height: 75,
    resizeMode: "cover",
    borderRadius: 90,
    borderColor: colors.inactive,
    borderWidth: 2,
    marginRight: 15,
  },
  activeAvatarImage: {
    borderColor: colors.active,
    borderWidth: 5,
  },
  name: {
    color: "black",
    fontSize: fontSizes.h6,
    marginTop: 5,
    marginRight: 15,
  },
  activeName: {
    fontWeight: "900",
  },
});
