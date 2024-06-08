import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import {
  friendship_addFriend,
  friend_undoInvitationFriend,
  friend_acceptInvitation,
  friend_refuseInvitation,
} from "../../../api";

export default function TabSuggestAndRequestItems(props) {
  let { image, fulName } = props.invitation.information;
  let { userName } = props.invitation;
  const { kind, onPress } = props;
  //kind: requested | sent | suggest

  if (image == null) {
    image = images.blankAvatarForRegistration;
  }

  const [isAlreadyAddedFriend, setIsAlreadyAddedFriend] = useState(false);
  const handleAddFriend = async () => {
    if (isAlreadyAddedFriend) {
      alert("Đã gửi lời mời kết bạn");
    } else {
      const response = await friendship_addFriend(userName);
      setIsAlreadyAddedFriend(true);
    }
  };

  const handleUndoInvitationFriend = async () => {
    const response = await friend_undoInvitationFriend(userName);
  };

  const handleAcceptInvitation = async () => {
    const response = await friend_acceptInvitation(userName);
  };

  const handleRefuseInvitation = async () => {
    const response = await friend_refuseInvitation(userName);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.avatarImage}
        source={{
          uri: image,
        }}
      />
      <View style={styles.rightArea}>
        <Text style={styles.nameText} numberOfLines={1}>
          {fulName}
        </Text>
        <View style={styles.buttonsView}>
          {kind === "requested" ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={handleAcceptInvitation}
                style={[
                  styles.buttons,
                  styles.buttonDouble,
                  {
                    backgroundColor: colors.PrimaryBackground,
                  },
                ]}
              >
                <Text style={[styles.buttonsText, styles.addFriend]}>
                  Chấp nhận
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRefuseInvitation}
                style={[
                  styles.buttons,
                  styles.buttonDouble,
                  {
                    backgroundColor: colors.GrayBackground,
                  },
                ]}
              >
                <Text style={styles.buttonsText}>Từ chối</Text>
              </TouchableOpacity>
            </View>
          ) : kind === "sent" ? (
            <TouchableOpacity
              onPress={handleUndoInvitationFriend}
              style={[
                styles.buttons,
                styles.buttonSingle,
                {
                  backgroundColor: colors.GrayBackground,
                },
              ]}
            >
              <Text style={styles.buttonsText}>Thu hồi</Text>
            </TouchableOpacity>
          ) : kind === "suggest" ? (
            <TouchableOpacity
              onPress={handleAddFriend}
              style={[
                styles.buttons,
                styles.buttonSingle,
                {
                  backgroundColor: isAlreadyAddedFriend
                    ? colors.GrayBackground
                    : colors.PrimaryBackground,
                },
              ]}
            >
              <Text style={styles.buttonsText}>
                {isAlreadyAddedFriend
                  ? "Đã gửi lời mời kết bạn"
                  : "Thêm bạn bè"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

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
  },
  //
  buttons: {
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonSingle: {
    width: "99%",
  },
  buttonDouble: {
    width: "45%",
  },
  //
  buttonsText: {
    padding: 7,
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: colors.PrimaryObjects,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
});
