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
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";
import { decode } from "base-64";


const ShowDocument = (props) => {
  let { file } = props.route.params.notification;

  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
     

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  //navigation
  const { navigate, goBack } = props.navigation;
  return (
    <View style={styles.container}>
      <UIHeader
        title={'Nội dung file'}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={{
          //backgroundColor: colors.backgroundWhite,
          paddingBottom: 20,
        }}
        //iconStyle={{ tintColor: colors.active }}
        //textStyle={{ color: colors.active }}
      />

      <ScrollView style={{marginTop: 20}}>

        <Text style={styles.contentTextInput}>{content}</Text>

      </ScrollView>
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
