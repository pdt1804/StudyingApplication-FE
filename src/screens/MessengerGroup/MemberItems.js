import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";

function MemberItems(props) {
  let { image, fulName } = props.invitation.information;
  let { userName } = props.invitation;

  const { onPress, onPressButtonLeft, onPressButtonRight } = props;
  
  const [myUsername, setMyUsername] = useState("")
  const [friendUsername, setFriendUsername] = useState(userName)
  const [buttonName, setButtonName] = useState("Xoá khỏi nhóm")

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const extractToken = await axios.get(API_BASE_URL + "/api/v1/information/ExtractBearerToken", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setMyUsername(extractToken.data)

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    

  }, [props.userName]);


  const handleAddFriend = async () => {
    
    setMyUsername(await AsyncStorage.getItem('username'));
    
    const response = await axios.post(API_BASE_URL + "/api/v1/friendship/acceptInvitation?sentUserName=" + friendUsername + "&myUserName=" + await AsyncStorage.getItem('username'))
  
    {onPressButtonLeft}
  };

  const handleLeaveGroup = async () => {

    if (buttonName == "Xoá khỏi nhóm")
    {
      if (userName != myUsername)
      {
        const response = await axios.delete(API_BASE_URL + "/api/v1/groupStudying/deleteUser?userName=" + userName + "&groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        if (response.status == 200)
        {
          setButtonName('Đã xoá khỏi nhóm') 
          alert('Xoá thành công')
        }
      }
      else
      {
        alert("Bạn không thể tự xoá bạn")
      }
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
          <TouchableOpacity onPress={handleLeaveGroup} style={styles.buttons}>
            <Text style={styles.buttonsText}>{buttonName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default MemberItems;

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
    backgroundColor: "red",

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
