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

function MessengerGroupItems(props) {
  let {imageUrl, isSender, message, timestamp} = props.item;
  const {onPress} = props;

  return isSender == false ? (
    <View
      style={styles.container}>
      <Image /** Avatar */
        style={styles.avatarImg}
        source={{
          uri: imageUrl,
        }}
      />

      <View
        style={styles.messageViewLeft}>
        <Text /** Message */
          style={styles.messageText}>
          {message}
        </Text>
      </View>
    </View>
  ) : (
    <View /** isSender = true */
      style={styles.container}>
      <View
        style={styles.messageViewRight}>
        <Text /** Message */
          style={styles.messageText}>
          {message}
        </Text>
      </View>

      <Image /** Avatar */
        style={styles.avatarImg}
        source={{
          uri: imageUrl,
        }}
      />
    </View>
  );
}
export default MessengerGroupItems;


const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingTop: 20,
    paddingStart: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImg: {
    width: 55,
    height: 55,
    resizeMode: 'cover',
    borderRadius: 90,
    marginRight: 15,
    alignSelf: 'center',
  },
  messageViewLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
    justifyContent: 'flex-start',
  },
  messageViewRight: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
    justifyContent: 'flex-end',
  },
  messageText: {
    color: 'black',
    fontSize: fontSizes.h6,
    paddingVertical: 7,
    paddingHorizontal: 7,
    backgroundColor: colors.message,
    borderRadius: 10,
  },
})