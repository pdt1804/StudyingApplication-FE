import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../DomainAPI';

export const notification_createNotification = async (
  groupID,
  header,
  content,
  files
) => {
  const formData = new FormData();
  formData.append('groupID', groupID);
  formData.append('header', header);
  formData.append('content', content);
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  const token = await AsyncStorage.getItem('username');
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/notification/create`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const notification_insertImage = async (notificationID, image) => {
  const formData = new FormData();
  formData.append('notificationID', notificationID);
  formData.append('image', image);

  const token = await AsyncStorage.getItem('username');
  await axios.post(
    `${API_BASE_URL}/api/v1/notification/insertImage`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const notification_getAllByGroupID = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/notification/getAllByGroupID?groupID=${groupID}`
  );
  return response.data;
};

export const notification_getAllByUserName = async () => {
  const token = await AsyncStorage.getItem('username');
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/notification/getAllByUserName`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const notification_checkNewNotification = async (notificationID) => {
  const token = await AsyncStorage.getItem('username');
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/notification/checkNewNotification?notificationID=${notificationID}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const notification_loadNotification = async (notificationID) => {
  const token = await AsyncStorage.getItem('username');
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/notification/loadNotification?notificationID=${notificationID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const notification_deleteForAllMembers = async (
  notificationID,
  groupID
) => {
  const token = await AsyncStorage.getItem('username');
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/notification/deleteForAllMembers?notificationID=${notificationID}&groupID=${groupID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const notification_deleteForMyAccount = async (
  notificationID,
  groupID
) => {
  const token = await AsyncStorage.getItem('username');
  await axios.delete(
    `${API_BASE_URL}/api/v1/notification/deleteForMyAccount?notificationID=${notificationID}&groupID=${groupID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
