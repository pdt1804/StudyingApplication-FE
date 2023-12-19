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

const ShowPost = (props) => {
  let { content } = props.route.params.topic;

  //navigation
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={null}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={{ backgroundColor: colors.backgroundWhite }}
        iconStyle={{ tintColor: colors.active }}
      />

      <ScrollView /* content */>
        <Text style={styles.contentText}>{content}</Text>
      </ScrollView>
    </View>
  );
};
export default ShowPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  contentText: {
    padding: 10,
  },
});
