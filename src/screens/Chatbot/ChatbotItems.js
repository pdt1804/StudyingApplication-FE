import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { Icon } from "../../components";
import {} from "../../api";

export default function ChatbotItems(props) {
  const { fulName, image } = props.chatbot.information;
  const { onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={{ uri: image }} size={125} style={styles.avatarImage} />
      <Text style={styles.name}>{fulName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth: 3,
  },
  name: {
    color: "black",
    fontSize: fontSizes.h5,
    marginTop: 5,
  },
});
