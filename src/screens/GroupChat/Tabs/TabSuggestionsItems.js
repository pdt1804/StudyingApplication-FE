import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../api/DomainAPI";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

function TabSuggestionsItems(props) {
  let { nameGroup, imageGroup, groupID, passWord } = props.group;

  const [nameTask, setNameTask] = useState('Tham gia');

  const [editPassword, setEditPassword] = useState('');

  const { onPress } = props;
 
  const showTextInputAlert = () => {
    Alert.prompt(
      'Xác thực mật khẩu',
      'Nhập mật khẩu nhóm:',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async (text) => {
            if (text === passWord) {
              const response = await axios.post(
                API_BASE_URL +
                  '/api/v1/groupStudying/joinInGroup?groupID=' +
                  groupID, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
                    },
                  }
              );
              if (response.status === 200) {
                setNameTask('Đã tham gia');
              }
            } else {
              alert('Nhập sai mật khẩu nhóm');
            }
          },
        },
      ],
      'plain-text',
      '',
      'default'
    );
  };
  

  const handleJoinGroup = async () => {
    
    if (passWord == "")
    {
      if (nameTask == "Tham gia")
      {
        const response = await axios.post(API_BASE_URL + "/api/v1/groupStudying/joinInGroup", { groupID: groupID },{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })
        if (response.status == 200)
        {
          setNameTask('Đã tham gia')
        }
      }
    }
    else
    {
      if (nameTask == "Tham gia")
      {
        showTextInputAlert();
      }
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image /** Avatar */
        style={[styles.avatarImage, {borderColor: generateColor()}]}
        source={{
          uri: imageGroup,
        }}
      />
      <View style={styles.rightArea}>
        <Text /** Name */ style={styles.nameText} numberOfLines={1}>
          {nameGroup}
        </Text>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={handleJoinGroup}
            style={[styles.buttons, styles.addFriend]}
          >
            <Text
              style={[styles.buttonsText, styles.addFriend]}
            >
              {nameTask}
            </Text>
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
