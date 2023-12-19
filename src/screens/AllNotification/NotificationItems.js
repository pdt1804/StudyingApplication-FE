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
  let {title, type, content, status} = props.group;
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}>
      <Image
        style={styles.img}
        source={type == 'hệ thống' ?
          images.globeIcon : images.personCircleIcon}
      />
      <View style={styles.textView}>
        <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
        <Text style={styles.contentText} numberOfLines={2}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
}
export default NotificationItems;



const styles = StyleSheet.create({
  container: {
    height: 63,
    marginBottom:15,
    flexDirection: "row",
  },
  img: {
    width: 33,
    height: 33,
    resizeMode: 'stretch',
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
    fontWeight: '400',
  },
  contentText: {
    color: "black",
    fontSize: fontSizes.h7,
    fontWeight: '300',
  },
});
