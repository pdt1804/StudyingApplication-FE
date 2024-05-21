import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const messageuser_loadMessageforUser = async (toUserName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/messageUser/loadMessageforUser?toUserName=${toUserName}`,
    {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const messageuser_getFriendID = async (toUserName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/messageUser/getFriendID?toUserName=${toUserName}`,
    {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const messageuser_getSentUser = async (messID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/messageUser/getSentUser?messID=${messID}`,
    {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const messageuser_checkSender = async (userName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/messageUser/checkSender?userName=${userName}`,
    {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const messageuser_sendMessageForUser = async (
  messContent,
  toUserName
) => {
  const formData = new FormData();
  formData.append("messContent", messContent);
  formData.append("toUserName", toUserName);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/messageUser/sendMessageForUser`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

//single image
export const messageuser_uploadImage = async (toUserName, uri) => {
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: "image.jpg",
    type: "image/jpg",
  });
  formData.append("toUserName", toUserName);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/messageUser/uploadImage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );

  return response.data;
};

//multiple image
export const messageuser_uploadMultipleImages = async (toUserName, uriList) => {
  const imageList = uriList.map((uri) => {
    return {
      uri,
      name: "image.jpg",
      type: "image/jpg",
    };
  });
  const formData = new FormData();
  formData.append("files", imageList);
  formData.append("toUserName", toUserName);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/messageUser/uploadImages`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );

  return response.data;
};

//chatbot
export const messageuser_saveChatbotMessage = async (messContent) => {
  const formData = new FormData();
  formData.append("messContent", messContent);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/messageUser/saveChatbotMessage`,
    formData,
    {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};
