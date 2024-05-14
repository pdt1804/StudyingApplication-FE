import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const information_getAllFavoriteTopics = async (infoID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/getAllFavoriteTopics?infoID=${infoID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_getAllTopics = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/getAllTopics`
  );
  return response.data;
};

export const information_getAllUnfavourateTopics = async (infoID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/getAllUnfavourateTopics?infoID=${infoID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_updateInformation = async (information) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/information/updateInformation`,
    information,
    {
      headers: {
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const information_initialize = async (
  yearOfBirth,
  gender,
  description,
  phoneNumber,
  topics,
  infoID
) => {
  var form = new FormData();
  form.append("yearOfBirth", yearOfBirth);
  form.append("gender", gender);
  form.append("description", description);
  form.append("phoneNumber", phoneNumber);
  form.append("topics", topics);
  form.append("infoID", infoID);

  console.log(topics);
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/information/initialize`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const information_AddTopic = async (topics, infoID) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/information/AddTopic?topics=${topics}&infoID=${infoID}`,
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const information_RemoveTopic = async (topics, infoID) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/information/RemoveTopic?topics=${topics}&infoID=${infoID}`,
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
};

export const information_getInformation = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/getInformation`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_getAvatar = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/getAvatar`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_changePassword = async (
  newPassWord,
  currentPassWord
) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/information/changePassword?newPassWord=${newPassWord}&currentPassWord=${currentPassWord}`,
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_changeAvatar = async (image) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/information/changeAvatar?image=${image}`,
    {},
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_changeAvatarCloud = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/information/changeAvatarCloud`,
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

export const information_ExtractBearerToken = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/ExtractBearerToken`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_GetUser = async (userName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/GetUser?userName=${userName}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_getAllUpside = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/getAllUpside`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const information_getAllDownside = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/getAllDownside`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};
