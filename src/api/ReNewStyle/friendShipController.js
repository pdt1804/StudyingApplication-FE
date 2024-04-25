import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const friendship_getAllFriendList = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/getAllFriendList`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const friendship_getAllSentInvitationList = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/getAllSentInvitationList`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const friendship_getAllInvitationFriendList = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/getAllInvitationFriendList`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const friendship_refuseInvitation = async (sentUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/refuseInvitation`,
    { sentUserName: sentUserName },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const friendship_acceptInvitation = async (sentUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/acceptInvitation`,
    { sentUserName: sentUserName },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const friendship_addFriend = async (receivedUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/addFriend`,
    { receivedUserName: receivedUserName },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const friendship_undoInvitationFriend = async (receivedUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/undoInvitationFriend`,
    { receivedUserName: receivedUserName },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const friendship_deleteFriend = async (userName) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/friendship/deleteFriend/${userName}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const friendship_checkNewMessage = async (fromUserName) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/friendship/checkNewMessage`,
    { fromUserName: fromUserName },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const friendship_findAllFriendByInputName = async (input) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/findAllFriendByInputName?input=${input}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const friendship_findAllFriendByUserName = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/friendship/findAllFriendByUserName`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};
