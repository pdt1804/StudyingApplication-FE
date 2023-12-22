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
  
  let { blogID, content, dateCreated, comments } = props.route.params.topic;
  let { userName } = props.route.params.topic.userCreated;
  let { fulName } = props.route.params.topic.userCreated.information;

  const date = new Date(dateCreated)

  //navigation
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thảo luận"}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        //mainStyle={{ backgroundColor: colors.backgroundWhite }}
        //iconStyle={{ tintColor: colors.active }}
      />

      <ScrollView /* content */>
        <Text style={styles.contentText}>Người tạo thảo luận: {fulName}</Text>
        <Text style={styles.contentText}>Thời gian tạo: {date.getHours()}:{date.getMinutes()}   {date.getDate()}/{date.getMonth() + 1}</Text>

        <Text style={styles.contentText}>Nội dung: {content}</Text>
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
