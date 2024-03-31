import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../DomainAPI";

export const messenger_loadMessageforUser = async (toUserName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/messageUser/loadMessageforUser?toUserName=${toUserName}`,
    {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const messenger_getFriendID = async (toUserName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/messageUser/getFriendID?toUserName=${toUserName}`,
    {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

//-------------------

export const messenger_getSentUser = async (id) => {
  const response = await axios.get(API_BASE_URL + "/api/v1/messageUser/getSentUser?messID=" + id, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
    },
  });
  return response;
}

export const messenger_checkSender = async (sentUsername) => {
  var form = new FormData()
  form.append("userName", sentUsername)

  const response = await axios.get(API_BASE_URL + "/api/v1/information/ExtractBearerToken", {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
    },
  });
  return response;
}


//-----------

export const messenger_sendMessageForUser = async (friendUsername, typedText) => {
  const response = await axios.post(
    API_BASE_URL + "/api/v1/messageUser/sendMessageForUser",
    { toUserName: friendUsername, messContent: typedText },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};
