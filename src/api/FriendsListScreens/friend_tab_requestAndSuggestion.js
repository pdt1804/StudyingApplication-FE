import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

//-----------
//tab screens

export const friend_findAllFriendByInputName = async (input) => {

  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/findAllFriendByInputName?input=${input}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};

export const friend_getAllSentInvitationList = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/getAllSentInvitationList`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};

export const friend_getAllInvitationFriendList = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/getAllInvitationFriendList`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};


//-----------
// items

export const friend_undoInvitationFriend = async (receivedUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/undoInvitationFriend`,
    { receivedUserName: receivedUserName },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};

export const friend_acceptInvitation = async (sentUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/acceptInvitation`,
    { sentUserName: sentUserName },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};

export const friend_refuseInvitation = async (sentUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/refuseInvitation`,
    { sentUserName: sentUserName },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};
