import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { images, colors } from "../constants/index";
import { CommonButton } from "../components/index";

const Welcome = (props) => {
  //navigation
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <View style={styles.partitionTop} />

      <View style={styles.partitionMiddle}>
        <Image source={images.uitLogo} style={styles.imageUIT} />
      </View>

      <View style={styles.partitionBottom}>
        <CommonButton
          onPress={() => {
            navigate("Login");
          }}
          title={"Login".toUpperCase()}
        ></CommonButton>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBackground,
    flex: 1,
  },
  partitionTop: {
    flex: 1,
    width: "100%",
  },
  partitionMiddle: {
    flex: 2,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
  partitionBottom: {
    flex: 2,
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
  imageUIT: {
    width: 200,
    height: 200,
  },
});
