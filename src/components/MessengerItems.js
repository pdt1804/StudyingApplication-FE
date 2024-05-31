import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { messenger_getSentUser, messenger_checkSender } from "../api";

function MessengerItems(props) {
  let { content, dateSent, id, status } = props.item;
  const files = props.files

  const date = new Date(dateSent);
  const timeSent = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
    date.getMonth() + 1
  }`;

  const [avatar, setAvatar] = useState(null);
  const [sender, setSender] = useState("");
  const [sentUsername, setSentUsername] = useState("");

  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [path, setPath] = useState(null);

  const MAXWidth = 245;
  const [imageWidth, setImageWidth] = useState(500);
  const [imageHeight, setImageHeight] = useState(500);

  /* const getImageSize = (uri) => {
    Image.getSize(uri, (width, height) => {
      const temp = width > MAXWidth ? width / MAXWidth : 1;
      setImageWidth(width);
      setImageHeight(height / temp);
    });
  }; */

  files.length > 0?   console.log(files[1].url) : console.log('null')
  //console.log(fakeData)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log(id)
        const response = await messenger_getSentUser(id);

        setAvatar(response.data.information.image);
        setSentUsername(response.data.userName);

        const checkSenderResponse = await messenger_checkSender(sentUsername);
        setSender(checkSenderResponse.data);

        props.item.content
          ? setIsImage(false)
          : (setIsImage(true),
          console.log(props.item)
            //setImage(props.item.files[0].url)//,
            //getImageSize(props.item.files[0].url)
          );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.userName]);

  const CheckIsSender = () => {
    return sender == sentUsername ? true : false;
  };

  return CheckIsSender() == false ? (
    <View /** isSender = false --> avatar > message */ style={styles.container}>
      <Image style={styles.avatar} source={{ uri: avatar }} />

      <View style={styles.mainTextView}>
        <View style={styles.leftView}>
          <Text style={styles.timeText}>{timeSent}</Text>
        </View>
        <View style={styles.leftView}>
          {files.length > 0 ? (
            files.map((file) => (
              <Image
                style={[
                  styles.image,
                  {
                    width: 50,
                    height: 50,
                    //width: file.width,
                    //height: file.height,
                  },
                ]}
                source={{ uri: file.url }}
              />
            ))
          ) : (
            <Text style={styles.message}>{content}</Text>
          )}
        </View>
      </View>
    </View>
  ) : (
    <View /** isSender = true --> message > avatar */ style={styles.container}>
      <View style={styles.mainTextView}>
        <View style={styles.rightView}>
          <Text style={styles.timeText}>{timeSent}</Text>
        </View>
        <View style={styles.rightView}>
          {files.length > 0 ? (
            files.map((file) => (
              <Image
                style={[
                  styles.image,
                  {
                    width: 50,
                    height: 50,
                    //width: file.width,
                    //height: file.height,
                  },
                ]}
                source={{ uri: file.url }}
              />
            ))
          ) : (
            <Text style={styles.message}>{content}</Text>
          )}
        </View>
      </View>

      <Image style={styles.avatar} source={{ uri: avatar }} />
    </View>
  );
}
export default MessengerItems;

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
    fontSize: fontSizes.h7,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: colors.GrayContainer,
    borderRadius: 10,
  },
  image: {
    resizeMode: "contain",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.PrimaryBackground,
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
  timeText: {
    marginBottom: 3,
    color: colors.active,
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "flex-end",
    textAlign: "right",
  },
});
