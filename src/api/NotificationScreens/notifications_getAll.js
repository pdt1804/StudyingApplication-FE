import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../DomainAPI";

export const notifications_getAllByUserName = async (userName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/notifycation/getAllNotifycationbyUserName`,
    {
      headers: {
        'Authorization': 'Bearer ' + userName,
      },
    }
  );
  return response;
};

export const notifications_checkNewByNotifycationID = async (notifycationID) => {
  var form = new FormData();
  form.append("notifycationID", notifycationID)

  const response = await axios.post(API_BASE_URL + "/api/v1/notifycation/checkNewNotifycation", form, {
    headers: {
      'Authorization': 'Bearer ' + await AsyncStorage.getItem("username"),
    },
  });

  return response.data === true;
}