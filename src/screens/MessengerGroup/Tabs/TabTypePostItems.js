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
import axios from "axios";
import { images, colors, icons, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../DomainAPI";

function TabTypePostItems(props) {
  let { nameSubject, subjectID } = props.type;

  const [numberOfBlogBySubject, setNumberOfBlogBySubject] = useState('')

  useEffect(() => {
    const fetchData = async () => {

        const response = await axios.get(API_BASE_URL + "/api/v1/blog/getNumberOfBlogBySubject?subjectID=" + subjectID + "&groupID=" + await AsyncStorage.getItem('groupID'));
              
        setNumberOfBlogBySubject(response.data)
    };

    fetchData(); // Gọi fetchData ngay sau khi component được mount

    // Sử dụng setInterval để gọi lại fetchData mỗi giây
       const intervalId = setInterval(fetchData, 15000);

      // // Hủy interval khi component bị unmounted
       return () => clearInterval(intervalId);
    }, [props.userName, ])

  const { onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.topView}>
      <Image source={images.activeChatMessageIcon} style={styles.icon} />
        <Text style={styles.text}>{nameSubject}</Text>
      </View>
      <Text style={styles.content} numberOfLines={5} >Số bài đăng: {numberOfBlogBySubject}</Text>
    </TouchableOpacity>
  );
}
export default TabTypePostItems;

const styles = StyleSheet.create({
  container: {
    height: 60,
    margin: 10,
    paddingStart: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: colors.ShadowedItems,
  },
  topView: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
    resizeMode: "stretch",
    tintColor: colors.postIcon,
  },
  text: {
    marginTop: 5,
    marginLeft: 5,
    color: "black",
    fontSize: fontSizes.h5,
  },
  content: {
    marginLeft: 7,
    marginRight: 10,
    color: "black",
    fontSize: fontSizes.h7,
  }
});
