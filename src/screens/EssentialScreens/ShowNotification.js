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

const ShowNotification = (props) => {
  let { title, content } = props.route.params.notification;

  //navigation
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={'Thông báo'}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={{
          backgroundColor: colors.backgroundWhite,
          paddingBottom: 20,
        }}
        iconStyle={{ tintColor: colors.active }}
        textStyle={{ color: colors.active }}
      />

      <ScrollView>
        <Text style={styles.titleTextInput}>{title}</Text>
        <Text style={styles.contentTextInput}>{content}</Text>
      </ScrollView>
    </View>
  );
};
export default ShowNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  contentTextInput: {
    paddingStart: 15,
    padding: 10,
    fontSize: fontSizes.h6,
  },
  titleTextInput: {
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
    fontSize: fontSizes.h5,
    fontWeight: '500',
  },
});
