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
import { API_BASE_URL } from "../../../DomainAPI";
import { decode } from "base-64";
import PdfReader from "rn-pdf-reader-js";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ShowDocument = (props) => {
  let { file, documentID } = props.route.params.notification;

  const [content, setContent] = useState("");

  const [username, setUsername] = useState("")

  const [group, setGroup] = useState("")


  useEffect(() => {
    const fetchData = async () => {
      try {
     
        setUsername(await AsyncStorage.getItem('username'))

        const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/getGroupByDocumentID?documentID=" + documentID)

        setGroup(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  const deleteDocument = () => {

    if (username != group.leaderOfGroup.userName)
    {
      alert('Bạn không phải nhóm trưởng')
    }
    else
    {
      Alert.alert(
        'Xác nhận xoá',
        'Bạn có chắc chắn muốn xoá?',
        [
          {
            text: 'Huỷ',
            style: 'cancel',
          },
          {
            text: 'Xoá',
            style: 'destructive',
            onPress: async () => {

              const response = await axios.delete(API_BASE_URL + "/api/v1/document/deleteDocument?groupID=" + group.groupID + "&documentID=" + documentID)

              if (response.status == 200)
              {
                goBack();
              }
              else
              {
                alert('Kiểm tra lại mạng, xoá không thành công')
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  }

  //navigation
  const { navigate, goBack } = props.navigation;
  return (
    <View style={styles.container}>
      <UIHeader
        title={'Nội dung file'}
        rightIconName={images.errorIcon}
        leftIconName={images.backIcon}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => deleteDocument()}
        mainStyle={{
          //backgroundColor: colors.backgroundWhite,
          paddingBottom: 20,
        }}
        //iconStyle={{ tintColor: colors.active }}
        //textStyle={{ color: colors.active }}
      />

      <PdfReader source={{ uri: file}}>

      </PdfReader>
    </View>
  );
};
export default ShowDocument;

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
