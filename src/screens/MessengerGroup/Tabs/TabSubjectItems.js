import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import { Icon } from "../../../components";
import { group_getNumberOfBlogBySubject } from "../../../api";

export default function TabSubjectItems(props) {
  const { nameSubject, subjectID } = props.type;
  const { onPress } = props;

  const [numberOfBlogBySubject, setNumberOfBlogBySubject] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await group_getNumberOfBlogBySubject(subjectID);
      setNumberOfBlogBySubject(response.data);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, [props.userName]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.topView}>
        <Icon
          name={icons.activeChatMessageIcon}
          size={30}
          color={colors.PrimaryBackground}
          style={styles.icon}
        />
        <Text style={styles.text}>{nameSubject}</Text>
      </View>
      <Text style={styles.content} numberOfLines={5}>
        Số bài đăng: {numberOfBlogBySubject}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    margin: 10,
    paddingStart: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: colors.ShadowedItems,
  },
  topView: {
    flexDirection: "row",
  },
  text: {
    marginTop: 5,
    marginLeft: 5,
    color: "black",
    fontSize: fontSizes.h6,
  },
  content: {
    marginLeft: 7,
    marginRight: 10,
    color: colors.active,
    fontSize: fontSizes.h7,
  },
});
