import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../constants";
import { API_BASE_URL } from "../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";


function NotificationItems(props) {
  const { header, notifycationType, content, dateSent, notifycationID } = props.group;
  const dateSentNotification = new Date(dateSent);
  const { onPress } = props;

  const [isNewNotification, setIsNewNotification] = useState(false);

  useEffect(() => {
    const checkNewNotification = async () => {
      const response = await axios.post(API_BASE_URL + "/api/v1/notifycation/checkNewNotifycation?myUserName=" + await AsyncStorage.getItem('username') + "&notifycationID=" + notifycationID);
      
      setIsNewNotification(response.data === true);
    };

    checkNewNotification();

  }, [notifycationID]);

  const handlePress = () => {
    
    setIsNewNotification(false)
    onPress();

  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Image
        style={styles.img}
        source={notifycationType === 'admin' ? images.globeIcon : images.personCircleIcon}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>{header}</Text>
        <Text style={styles.contentText} numberOfLines={2}>{content}</Text>
      </View>
      <Text style={isNewNotification ? styles.activeTimeText : styles.timeText}>
        {dateSentNotification.getHours()}:{dateSentNotification.getMinutes()} {dateSentNotification.getDate()}/{dateSentNotification.getMonth() + 1}
      </Text>
    </TouchableOpacity>
  );
}

export default NotificationItems;

const styles = StyleSheet.create({
  container: {
    height: 63,
    marginBottom: 15,
    flexDirection: "row",
  },
  img: {
    width: 33,
    height: 33,
    resizeMode: "stretch",
    marginTop: 11,
    marginHorizontal: 10,
    tintColor: colors.active,
  },
  textView: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: colors.active,
    fontSize: fontSizes.h6,
    fontWeight: "400",
  },
  contentText: {
    color: "black",
    fontSize: fontSizes.h7,
    fontWeight: "300",
  },
  timeText: {
    width: 60,
    padding: 10,
    paddingLeft: 0,
    color: "black",
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "right",
    color: colors.inactive,
    marginBottom: 15,
    marginTop: -10,
  },
  activeTimeText: {
    width: 60,
    padding: 10,
    paddingLeft: 0,
    color: "black",
    fontSize: fontSizes.h8,
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "right",
    color: colors.active,
    marginBottom: 15,
    marginTop: -10,
  },
});
