import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { Icon } from "../../components";
import { notifications_checkNewByNotifycationID } from "../../api";

function NotificationItems(props) {
  const { header, notifycationType, content, dateSent, notifycationID } =
    props.group;
  const dateSentNotification = new Date(dateSent);
  const { onPress } = props;

  const [isNewNotification, setIsNewNotification] = useState(false);
  useEffect(() => {
    const fetchNewNotification = async () => {
      const isNew = await notifications_checkNewByNotifycationID(
        notifycationID
      );
      setIsNewNotification(isNew);
    };

    fetchNewNotification();
  }, [notifycationID]);

  const handlePress = () => {
    setIsNewNotification(false);
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Icon
        name={
          notifycationType === "admin"
            ? icons.globeIcon
            : icons.personCircleIcon
        }
        size={33}
        color={colors.active}
        style={styles.img}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {header}
        </Text>
        <Text
          style={
            isNewNotification ? styles.activeContentText : styles.contentText
          }
          numberOfLines={2}
        >
          {content}
        </Text>
      </View>
      <Text style={isNewNotification ? styles.activeTimeText : styles.timeText}>
        {dateSentNotification.getHours()}:{dateSentNotification.getMinutes()}{" "}
        {dateSentNotification.getDate()}/{dateSentNotification.getMonth() + 1}
      </Text>
    </TouchableOpacity>
  );
}

export default NotificationItems;

const styles = StyleSheet.create({
  container: {
    height: 63,
    marginBottom: 15,
    flexDirection: "row",
  },
  img: {
    resizeMode: "stretch",
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
  activeContentText: {
    color: "black",
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
  timeText: {
    width: 60,
    padding: 10,
    paddingLeft: 0,
    color: "black",
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "right",
    color: colors.inactive,
    marginBottom: 15,
    marginTop: -10,
  },
  activeTimeText: {
    width: 60,
    padding: 10,
    paddingLeft: 0,
    color: "black",
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "right",
    color: colors.active,
    marginBottom: 15,
    marginTop: -10,
  },
});
