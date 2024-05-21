import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const messagegroup_sendMessage = async (messContent, groupID, files) => {
  const formData = new FormData();
  formData.append('messContent', messContent);
  formData.append('groupID', groupID);
  files.forEach(file => {
    formData.append('files', file);
  });
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/messagegroup/sendMessage`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response.data;
};

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const messagegroup_uploadMultipleImages = async (groupID, uri, name, type) => {
  const formData = new FormData();
  formData.append("file", {
    uri: uri,
    name: name,
    type: type,
  });
  formData.append("groupID", groupID);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/messagegroup/uploadImage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );

  return response.data;
};

export const messagegroup_loadMessageInGroup = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/messagegroup/loadMessageInGroup?groupID=${groupID}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response.data;
};

export const messagegroup_getSentUserInGroup = async (messID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/messagegroup/getSentUserInGroup?messID=${messID}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response.data;
};
