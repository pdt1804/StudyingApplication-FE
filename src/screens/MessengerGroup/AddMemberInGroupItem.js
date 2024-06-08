import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";

function AddMemberInGroupItem(props) {
  let { image, fulName } = props.invitation.information;
  let { userName } = props.invitation;

  const { onPress, onPressButtonLeft, onPressButtonRight } = props;
  
  const [myUsername, setMyUsername] = useState("")
  const [friendUsername, setFriendUsername] = useState(userName)


  const [isAlreadyAddedInGroup, setIsAlreadyAddedInGroup] = useState(false);


  const handleAddInGroup = async () => {
    
    var form = new FormData();
    form.append("friendUserName", userName)
    form.append("groupID", await AsyncStorage.getItem('groupID'))

    const response = await axios.post(API_BASE_URL + "/api/v1/groupStudying/addFriendInGroup", form, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    if (response.status == 200)
    {
        alert('Thêm thành công')
        setIsAlreadyAddedFriend(true);
    }

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
            <TouchableOpacity
              onPress={handleAddInGroup}
              style={[
                styles.buttons,
                styles.buttonSingle,
                {
                  backgroundColor: isAlreadyAddedInGroup
                    ? colors.GrayBackground
                    : colors.PrimaryBackground,
                },
              ]}
            >
              <Text style={styles.buttonsText}>
                {isAlreadyAddedInGroup
                  ? "Đã thêm vào nhóm"
                  : "Thêm vào nhóm"}
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default AddMemberInGroupItem;

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
