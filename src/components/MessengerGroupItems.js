import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, colors, icons, fontSizes } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../DomainAPI";

function MessengerGroupItems(props) {
  let { content, dateSent, id, user } = props.item;

  const {navigate} = props;

  const date = new Date(dateSent);
  const timeSent = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
    date.getMonth() + 1
  }`;

  const [image, setImage] = useState(null);

  const [username, setUsername] = useState("");
  const [sentUsername, setSentUsername] = useState("");

  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUsername(await AsyncStorage.getItem("username"));
        const response = await axios.get(
          API_BASE_URL + "/api/v1/messagegroup/getSentUserInGroup?messID=" + id
        );
        setResponse(response.data);
        setImage(response.data.information.image);
        setSentUsername(response.data.userName);

      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  const CheckIsSender = () => {
    if (username == sentUsername) {
      return true;
    } else {
      return false;
    }
  };

  const ShowProfile = async () => {
    navigate("ShowProfile", { userReplied: user })
  }

  return CheckIsSender() == false ? (
    <TouchableOpacity /** isSender = false --> avatar > message */ style={styles.container} onPress={ShowProfile}>
      <Image style={styles.avatar} source={{ uri: image }} />

      <View style={styles.mainTextView}>
        <View style={styles.leftView}>
          <Text style={styles.subText}>{user.information.fulName} | {timeSent}</Text>
        </View>
        <View style={styles.leftView}>
          <Text style={styles.message}>{content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity /** isSender = true --> message > avatar */ style={styles.container} onPress={ShowProfile}>
      <View style={styles.mainTextView}>
        <View style={styles.rightView}>
          <Text style={styles.subText}>{timeSent}</Text>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.message}>{content}</Text>
        </View>
      </View>

      <Image style={styles.avatar} source={{ uri: image }} />
    </TouchableOpacity>
  );
}
export default MessengerGroupItems;

const styles = StyleSheet.create({
  container: {
    height: "auto",
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
    alignSelf: "flex-start",
  },
  message: {
    color: "black",
    fontSize: fontSizes.h6,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: colors.SecondaryContainer,
    borderRadius: 10,
  },
  leftView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },
  rightView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
  mainTextView: {
    flexDirection: "column",
    flex: 1,
    marginRight: 10,
  },
  subText: {
    marginBottom: 3,
    color: colors.active,
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "flex-end",
    textAlign: "right",
  },
});
