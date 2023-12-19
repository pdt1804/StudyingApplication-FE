import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {images, colors, icons, fontSizes} from '../../../constants';

function _getColorFromStatus(status) {
  if (status.toLowerCase().trim() == 'online') {
    return colors.Online;
  } else return colors.Offline;
}

function TabYourFriendsItems(props) {
  let {name, imageUrl, status} = props.friend;
  const {onPress} = props;
  
  let fontSizeName = fontSizes.h5;
  if (name.length > 10) {
    fontSizeName = fontSizes.h6;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <Image
        style={styles.avatarImage}
        source={{
          uri: imageUrl,
        }}
      />
      {/* <Image
        style={styles.avatarBorder}
        source={images.avatarBorder}
      /> */}
        <Text
          style={{
            color: 'black',
            fontSize: fontSizeName,
          }}>
          {name}
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
  avatarBorder: {
    width: 110,
    height: 110,
    resizeMode: 'stretch',
    position: 'absolute',
    top: '5%',
  }
});