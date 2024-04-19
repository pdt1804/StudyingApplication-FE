import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const group_findGroupById = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/findGroupbyId?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const group_createGroup = async (newGroupName, newPassword) => {
  var form = new FormData();
  form.append("nameGroup", newGroupName);
  form.append("passWord", newPassword);
  form.append(
    "image",
    "https://www.iconbunny.com/icons/media/catalog/product/1/5/1563.8-team-ii-icon-iconbunny.jpg"
  );
  const response = await axios.post(
    API_BASE_URL + "/api/v1/groupStudying/createGroup",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const group_extractBearerToken = async () => {
  const response = await axios.get(
    API_BASE_URL + "/api/v1/information/ExtractBearerToken",
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};