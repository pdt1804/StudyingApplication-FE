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
import { images, colors, icons, fontSizes } from "../../../constants";

function TabNotificationItems(props) {
    let {title} = props.notification;
    const {onPress} = props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}>
        <Image
          style={styles.img}
          source={images.personIcon}
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
  export default TabNotificationItems;
  
  
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
    },
    textView: {
      flex: 1,
      marginRight: 10,
    },
    text: {
      color: 'black',
      fontSize: fontSizes.h5,
      fontWeight: 'bold',
    },
  })