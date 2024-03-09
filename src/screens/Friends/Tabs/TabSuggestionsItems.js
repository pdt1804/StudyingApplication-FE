import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../DomainAPI";

function TabSuggestionsItems(props) {
  let { image, fulName } = props.invitation.information;
  let { userName } = props.invitation;

  if (image == null)
  {
    image = "https://static.vecteezy.com/system/resources/previews/019/243/593/original/illustration-realistic-cute-blue-person-icon-3d-creative-isolated-on-background-vector.jpg";
  }

  const { onPress } = props;
  
  const [myUsername, setMyUsername] = useState("")
  const [buttonName, setButtonName] = useState("Thêm bạn bè")

  const [friendUsername, setFriendUsername] = useState(userName)


  const handleAddFriend = async () => {

    if (buttonName == "Thêm bạn bè")
    {
      const response = await axios.post(API_BASE_URL + "/api/v1/friendship/addFriend", { receivedUserName: userName } ,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      })
      setButtonName("Đã gửi lời mời kết bạn")
    }
  }

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
          <TouchableOpacity onPress={handleAddFriend} style={styles.buttons}>
            <Text style={styles.buttonsText}>{buttonName}</Text>
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
    borderColor: 'black',
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
    flex:1,
    paddingHorizontal: 20,
    marginVertical: 5,

    borderRadius: 8,
    backgroundColor: "blue",

    justifyContent: "center",
    alignItems: "center",
  },
  addFriend: {
  },
  buttonsText: {
    padding: 7,
    paddingVertical:7,
    paddingHorizontal:10,
    color: "white",
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
});
