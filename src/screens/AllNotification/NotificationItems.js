import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {images, colors, icons, fontSizes} from '../../constants';

function NotificationItems(props) {
  let {title, type} = props.group;
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <Image
        style={styles.img}
        source={type == 'hệ thống' ?
          images.globeIcon : images.personIcon}
      />
      <View
        style={styles.textView}>
        <Text
          style={styles.text}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default NotificationItems;


const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingTop: 20,
    paddingStart: 10,
    flexDirection: 'row',
  },
  img: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderRadius: 90,
    marginRight: 15,
    tintColor: colors.notificationIcon,
  },
  textView: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontSize: fontSizes.h7,
  },
})