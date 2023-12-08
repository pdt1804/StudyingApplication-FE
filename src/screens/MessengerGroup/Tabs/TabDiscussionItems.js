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

function TabDiscussionItems(props) {
  let { name } = props.topic;
  const { onPress } = props;

  let fontSizeName = fontSizes.h5;
  if (name.length > 22) {
    fontSizeName = fontSizes.h6;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.mainContainer}>
        <View>
          <Image /** Avatar */
            style={styles.blogIcon}
            source={images.blogSearchIcon}
          />
        </View>

        <View style={styles.textView}>
          <Text /** Name */
            style={{
              color: "black",
              fontSize: fontSizeName,
            }}
          >
            {name}
          </Text>
        </View>
      </View>
      <View style={styles.bottomLine} />
    </TouchableOpacity>
  );
}
export default TabDiscussionItems;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "column",
  },
  mainContainer: {
    paddingTop: 15,
    paddingStart: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  blogIcon: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 90,
    marginRight: 15,
    alignSelf: "center",
    tintColor: colors.blogIcon,
  },
  textView: {
    flexDirection: "column",
    flex: 4,
    marginRight: 10,
  },
  bottomLine: {
    backgroundColor: colors.inactive,
    height: 1,
    marginTop: 5,
  },
});
