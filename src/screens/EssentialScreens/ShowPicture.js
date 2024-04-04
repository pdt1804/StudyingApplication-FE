import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../api/DomainAPI";
import { decode } from "base-64";
import PdfReader from "rn-pdf-reader-js";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ShowPicture = (props) => {
  let { file } = props.route.params;

  const [content, setContent] = useState("");

  const [username, setUsername] = useState("")

  const [group, setGroup] = useState("")

  //navigation
  const { navigate, goBack } = props.navigation;
  return (
    <View style={styles.container}>
      <UIHeader
        title={"Ảnh"}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
      />
      <PdfReader source={{ uri: file}}>

      </PdfReader>
    </View>
  );
};
export default ShowPicture;

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
  titleTextInputTitle: {
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
    fontSize: fontSizes.h5,
    fontWeight: '500',
  },
});
