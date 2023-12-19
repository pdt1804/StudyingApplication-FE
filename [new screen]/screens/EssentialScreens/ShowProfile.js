import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader } from "../../components";

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${randomColor}`;
};

const ShowProfile = (props) => {
  let { name, imageUrl } = props.route.params.user;

  //navigation
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <View /* content */ style={styles.colorView} />
      <UIHeader
        title={null}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={{ backgroundColor: null }}
        iconStyle={{ tintColor: colors.active }}
      />

      <View /* Profile picture */ style={styles.profileView}>
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        <Text style={styles.profileUsername}>{name}</Text>
      </View>
    </View>
  );
};
export default ShowProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  colorView: {
    height: "33%",
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: generateColor(),
  },
  profileView: {
    height: 200,
    top: '11%',
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 90,
    borderColor: "white",
    borderWidth: 5,
  },
  profileUsername: {
    color: "black",
    fontSize: fontSizes.h6,
  },
});
