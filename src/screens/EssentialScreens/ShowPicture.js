import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,FlatList,Dimensions,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../api/DomainAPI";
import { decode } from "base-64";
import PdfReader from "rn-pdf-reader-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShowPicture = (props) => {
  const { navigate, goBack } = props.navigation;
  let { file, files } = props.route.params;

  const { width, height } = Dimensions.get('window');
  const MAXWidth = width-10;
  const getWidth = (baseWidth) => {
    if(baseWidth == 0) {
      return MAXWidth
    }
    return baseWidth > MAXWidth ? MAXWidth : baseWidth;
  };
  const getHeight = (baseWidth, baseHeight) => {
    if(baseHeight == 0) {
      return MAXWidth
    }
    return baseWidth > MAXWidth
      ? baseHeight / (baseWidth / MAXWidth)
      : baseHeight;
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Ảnh"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
      />
      {console.log(files)}
      
      <FlatList
          data={files}
          renderItem={({item}) => {
            return (
              <Image
            source={{ uri: item.url }}
            style={[
              styles.image,
              {
                width: getWidth(item.width),
                height: getHeight(item.width, item.height),
                maxWidth: MAXWidth,
              },
            ]}
          />
            );
          }}
          keyExtractor={item => item.publicId}
          style={{flex: 1}}/>
      {/* <ScrollView style={styles.scrollViewContainer}>
        {files.map((eachImage, index) => (
          <Image
            key={index}
            source={{ uri: eachImage.url }}
            style={[
              styles.image,
              {
                width: getWidth(eachImage.width),
                height: getHeight(eachImage.width, eachImage.height),
              },
            ]}
          />
        ))}
      </ScrollView> */}
      {/* <PdfReader source={{ uri: file}}>

      </PdfReader> */}
    </View>
  );
};
export default ShowPicture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  scrollViewContainer: {
    alignItems: "center",
  },
  //
  image: {
    resizeMode: "contain",
    marginVertical: 2,
    borderRadius: 5,
    alignSelf: 'center',
  },
});
