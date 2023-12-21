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

function _getColorFromStatus(status) {
  if (status.toLowerCase().trim() == 'online') {
    return colors.Online;
  } else return colors.Offline;
}

function TabYourFriendsItems(props) {
  let {fulName, image} = props.friend; //fake data
  //let {fulName, yearOfBirth, image} = props.friend.information;
  let {userName} = props.friend;
  const {onPress} = props;
  
  let fontSizeName = fontSizes.h5;
  if (true) {
    fontSizeName = fontSizes.h6;
  }

  const ToMessage = async () => {
    
    try
    {
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
        style={styles.avatarImage}
        source={{
          uri: image,
        }}
      />
        <Text
          style={{
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
});