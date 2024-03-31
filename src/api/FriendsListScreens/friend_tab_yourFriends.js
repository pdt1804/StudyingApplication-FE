import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const friend_getAllFriendList = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/getAllFriendList`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};

export const friend_checkNewMessage = async (fromUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/checkNewMessage`,
    { fromUserName: fromUserName },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};
