import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  push,
} from 'react-native';
import {images, colors, icons, fontSizes} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../../../../DomainAPI';

function TabYourFriendsItems(props) {
  
  let {fulName, yearOfBirth, image} = props.friend.information;
  let {userName} = props.friend;
  const {onPress} = props;
  
  let fontSizeName = fontSizes.h5;
  if (true) {
    fontSizeName = fontSizes.h6;
  }

  const [isNewNotification, setIsNewNotification] = useState(false);

  useEffect(() => {
    const checkNewNotification = async () => {
      const response = await axios.post(API_BASE_URL + "/api/v1/friendship/checkNewMessage?myUserName=" + await AsyncStorage.getItem('username') + "&fromUserName=" + userName);
      
      setIsNewNotification(response.data === true);
    };

    checkNewNotification();

    const intervalId = setInterval(checkNewNotification, 1000);

    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);

  }, []);

  const ToMessage = async () => {
    
    try
    {
      setIsNewNotification(false);
      onPress(await AsyncStorage.getItem('username'), userName);
    }
    catch (exception)
    {
      console.error(exception.message)
    }
  }

  return (
    <TouchableOpacity
      onPress={ToMessage}
      style={styles.container}>
      <Image
        style={isNewNotification ? styles.activeAvatarImage : styles.avatarImage}
        source={{
          uri: image,
        }}
      />
        <Text
          style={isNewNotification ? {
            color: 'black',
            fontSize: fontSizeName,
            marginTop: 5,
            marginRight: 15,
            fontWeight: 'bold',
          } : {
            color: 'black',
            fontSize: fontSizeName,
            marginTop: 5,
            marginRight: 15,
          }}>
          {fulName}
        </Text>
    </TouchableOpacity>
  );
}
export default TabYourFriendsItems;


const styles = StyleSheet.create({
  container: {
    width: '33%',
    height: 150,
    paddingStart: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 75,
    height: 75,
    resizeMode: 'cover',
    borderRadius: 90,
    borderColor: colors.inactive,
    borderWidth:2,
    marginRight: 15,
  },
  activeAvatarImage: {
    width: 75,
    height: 75,
    resizeMode: 'cover',
    borderRadius: 90,
    borderColor: colors.active,
    borderWidth:5,
    marginRight: 15,
  },
});