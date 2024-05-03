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
