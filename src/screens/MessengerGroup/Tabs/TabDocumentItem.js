import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import { Icon } from "../../../components";

function TabDocumentItem(props) {
  let { header, type, dateUploaded, documentID } = props.doc;
  const { onPress } = props;

  const date = new Date(dateUploaded);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon
        name={icons.documentIcon}
        size={33}
        color={colors.PrimaryBackground}
        style={styles.icon}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>
          {header}
        </Text>
        <Text style={styles.contentText} numberOfLines={2}>
          {type.toString().toUpperCase()}
        </Text>
      </View>
      <Text style={styles.timeText}>
        {date.getHours()}:{date.getMinutes()} {date.getDate()}/
        {date.getMonth() + 1}
      </Text>
    </TouchableOpacity>
  );
}
export default TabDocumentItem;

const styles = StyleSheet.create({
  container: {
    height: 63,
    marginVertical: 8,
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
