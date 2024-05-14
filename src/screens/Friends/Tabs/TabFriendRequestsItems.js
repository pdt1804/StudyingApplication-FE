import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { friend_acceptInvitation, friend_refuseInvitation } from "../../../api";

function TabFriendRequestsItems(props) {
  let { image, fulName } = props.invitation.information;
  let { userName } = props.invitation;
  const { onPress } = props;

  const handleAddFriend = async () => {
    const response = await friend_acceptInvitation(userName);
  };

  const handleCancel = async () => {
    const response = await friend_refuseInvitation(userName);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image /** Avatar */
        style={styles.avatarImage}
        source={{
          uri: image,
        }}
      />
      <View style={styles.rightArea}>
        <Text /** Name */ style={styles.nameText} numberOfLines={1}>
          {fulName}
        </Text>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={handleAddFriend}
            style={[styles.buttons, styles.addFriend]}
          >
            <Text style={[styles.buttonsText, styles.addFriend]}>
              Chấp nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={styles.buttons}>
            <Text style={styles.buttonsText}>Từ chối</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default TabFriendRequestsItems;

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
    paddingHorizontal: 10,
    color: "white",
    backgroundColor: "blue",
  },
  buttonsText: {
    padding: 7,
    paddingVertical: 7,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
    color: "black",
  },
});
