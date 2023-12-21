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


const ShowNotification = (props) => {
  let { header, content, notifycationType, dateSent, notifycationID } = props.route.params.notification;

  const date = new Date(dateSent)
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/getNameGroupByNotificationID?notificationID=" + notifycationID);
        setGroupName(response.data);        

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
        title={'Thông báo'}
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
        <Text style={styles.titleTextInput}>Nhóm: {groupName}</Text>
        <Text style={styles.titleTextInput}>Thời gian gửi: {date.getHours()}:{date.getMinutes()} {date.getDate()}/{date.getMonth() + 1}</Text>
        <Text style={styles.titleTextInput}>Loại thông báo: {notifycationType == "user" ? "trưởng nhóm" : "hệ thống"}</Text>
        <Text style={styles.contentTextInput}>Tiêu đề: {header}</Text>
        <Text style={styles.contentTextInput}>Nội dung: </Text>
        <Text style={styles.contentTextInput}>- {content}</Text>

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
  titleTextInputTitle: {
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
    fontSize: fontSizes.h5,
    fontWeight: '500',
  },
});
