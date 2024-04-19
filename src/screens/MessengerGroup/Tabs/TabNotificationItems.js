import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import { Icon } from "../../../components";

function TabNotificationItems(props) {
  const { header, content, dateSent } = props.notification;
  const { onPress } = props;

  const date = new Date(dateSent);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon
        name={icons.personCircleIcon}
        size={33}
        color={colors.PrimaryBackground}
        style={styles.icon}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {header}
        </Text>
        <Text style={styles.contentText} numberOfLines={2}>
          {content}
        </Text>
      </View>
      <Text style={styles.timeText}>
        {date.getHours()}:{date.getMinutes()} {date.getDate()}/
        {date.getMonth() + 1}
      </Text>
    </TouchableOpacity>
  );
}
export default TabNotificationItems;

const styles = StyleSheet.create({
  container: {
    height: 63,
    marginBottom: 15,
    flexDirection: "row",
  },
  icon: {
    marginTop: 6,
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
  timeText: {
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
