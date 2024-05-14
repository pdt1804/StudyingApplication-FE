import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";

function MemberToChangeRoleItems(props) {
  let { image, fulName } = props.invitation.information;
  let { userName } = props.invitation;

  const { onPress, onPressButtonLeft, onPressButtonRight } = props;
  
  const [myUsername, setMyUsername] = useState("")
  const [friendUsername, setFriendUsername] = useState(userName)


  const handleAddFriend = async () => {
    
    setMyUsername(await AsyncStorage.getItem('username'));
    
    const response = await axios.post(API_BASE_URL + "/api/v1/friendship/acceptInvitation?sentUserName=" + friendUsername + "&myUserName=" + await AsyncStorage.getItem('username'))
  
    {onPressButtonLeft}
  };

  const handleChangeLeader = async () => {

    const response = await axios.put(API_BASE_URL + "/api/v1/groupStudying/changeLeaderofGroup?currentUserName=" + await AsyncStorage.getItem('username') + "&newUserName=" + userName + "&groupID=" + await AsyncStorage.getItem('groupID'))

    if (response.status == 200)
    {
        alert('Đổi nhóm trưởng và rời khỏi nhóm thành công')
        navigate("MainBottomTab" , {tabName: "GroupChat"})
    }
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
          {/* <TouchableOpacity
            onPress={handleAddFriend}
            style={[styles.buttons, styles.addFriend]}
          >
            <Text style={[styles.buttonsText, styles.addFriend]}>Nhóm trưởng</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={handleChangeLeader} style={styles.buttons}>
            <Text style={styles.buttonsText}>Đổi nhóm trưởng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default MemberToChangeRoleItems;

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

    marginRight: 30,
    borderRadius: 8,
    backgroundColor: "blue",

    justifyContent: "center",
    alignItems: "center",
    width: 270,
  },
  addFriend: {
    paddingHorizontal:10,
    color: "white",
    backgroundColor: "blue",
  },
  buttonsText: {
    padding: 7,
    paddingVertical:7,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
    color: "white",
  },
});
