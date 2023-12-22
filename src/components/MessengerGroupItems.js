import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../DomainAPI";

function MessengerGroupItems(props) {
  let { content, dateSent, id } = props.item;

  const [image, setImage] = useState(null);

  const [username, setUsername] = useState("")
  const [sentUsername, setSentUsername] = useState("")

  const [response, setResponse] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {

        setUsername(await AsyncStorage.getItem('username'));
        const response = await axios.get(API_BASE_URL + "/api/v1/messagegroup/getSentUserInGroup?messID=" + id);
        setResponse(response.data);
        setImage(response.data.information.image);
        setSentUsername(response.data.userName);
           
        // alert("id message: " + id)
        // alert("username: " + username)
        // alert("sentUsername: " + sentUsername)

      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  const CheckIsSender = () => {

    if(username == sentUsername)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  return CheckIsSender() == false ? (
    <View /** isSender = false --> avatar > message */ style={styles.container}>
      <Image style={styles.avatar} source={{ uri: image }} />

      <View style={styles.leftView}>
        <Text style={styles.message}>{content}</Text>
      </View>
    </View>
  ) : (
    <View /** isSender = true --> message > avatar */ style={styles.container}>
      <View style={styles.rightView}>
        <Text style={styles.message}>{content}</Text>
      </View>

      <Image style={styles.avatar} source={{ uri: image }} />
    </View>
  );
}
export default MessengerGroupItems;

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    minHeight: 90,
    paddingTop: 20,
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    resizeMode: "cover",
    borderRadius: 30,
    marginTop: 9,
    marginRight: 15,
    alignSelf: 'flex-start',
  },
  message: {
    color: "black",
    fontSize: fontSizes.h6,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: colors.message,
    borderRadius: 10,
  },
  leftView: {
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
    justifyContent: "flex-start",
  },
  rightView: {
    flexDirection: "row",
    flex: 1,
    marginRight: 10,
    justifyContent: "flex-end",
  },
});