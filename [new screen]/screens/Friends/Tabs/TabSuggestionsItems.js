import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";

function TabSuggestionsItems(props) {
  let { name, imageUrl } = props.group;
  const { onPress } = props;

  const handleAddFriend = async () => {
    alert("Bạn đã đồng ý");
  };

  const handleCancel = async () => {
    alert("Từ chối kết bạn");
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image /** Avatar */
        style={styles.avatarImage}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={styles.rightArea}>
        <Text /** Name */ style={styles.nameText} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={handleAddFriend}
            style={[styles.buttons, styles.addFriend]}
          >
            <Text style={[styles.buttonsText, styles.addFriend]}>Kết Bạn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={styles.buttons}>
            <Text style={styles.buttonsText}>Từ chối</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default TabSuggestionsItems;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginVertical: "2%",
    marginHorizontal: "4%",
    paddingStart: 10,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth: 1,
    elevation: 5,
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
  nameText: {
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: fontSizes.h5,
  },
  rightArea: {
    flex: 1,
    flexDirection: "column",
  },
  buttonsView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    paddingHorizontal: 20,
    marginVertical: 5,

    borderRadius: 8,
    backgroundColor: "lightgray",

    justifyContent: "center",
    alignItems: "center",
  },
  addFriend: {
    color: "white",
    backgroundColor: "blue",
  },
  buttonsText: {
    padding: 5,
    fontSize: fontSizes.h6,
    fontWeight: "bold",
    color: "black",
  },
});
