import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const groupStudying_getAllGroupofUser = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/getAllGroupofUser`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_checkNewMessage = async (groupID) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/groupStudying/checkNewMessage`,
    { groupID: groupID },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_findGroupbyId = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/findGroupbyId?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_getGroupByDocumentID = async (documentID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/getGroupByDocumentID?documentID=${documentID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_findGroupbyName = async (nameGroup) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/findGroupbyName?nameGroup=${nameGroup}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_createGroup = async (
  nameGroup,
  passWord,
  image,
  topics
) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/groupStudying/createGroup`,
    { nameGroup: nameGroup, passWord: passWord, image: image, topics: topics },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_deleteGroup = async (groupID) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/groupStudying/deleteGroup?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const groupStudying_getUserAddInGroup = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/getUserAddInGroup?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_getNameGroupByNotificationID = async (
  notificationID
) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/getNameGroupByNotificationID?notificationID=${notificationID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_updateGroup = async (group) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/groupStudying/updateGroup`,
    group,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_updateTopics = async (groupID, topics) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/groupStudying/updateTopics?groupID=${groupID}`,
    { topics: topics },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_deleteUser = async (userName, groupID) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/groupStudying/deleteUser?userName=${userName}&groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const groupStudying_changeAvatarGroup = async (image, groupID) => {
  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.put(
    `${API_BASE_URL}/api/v1/groupStudying/changeAvatarGroup?groupID=${groupID}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const groupStudying_changeLeaderofGroup = async (
  newUserName,
  groupID
) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/groupStudying/changeLeaderofGroup?newUserName=${newUserName}&groupID=${groupID}`,
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const groupStudying_joinInGroup = async (groupID) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/groupStudying/joinInGroup?groupID=${groupID}`,
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const groupStudying_addFriendInGroup = async (
  friendUserName,
  groupID
) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/groupStudying/addFriendInGroup?friendUserName=${friendUserName}&groupID=${groupID}`,
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const groupStudying_getAllUserInGroup = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/getAllUserInGroup?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_getAllGroupByTopics = async (topics) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/getAllGroupByTopics?topics=${topics}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const groupStudying_getAllRecommendedGroup = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/getAllRecommendedGroup`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};
