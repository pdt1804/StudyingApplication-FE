import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const group_getAllGroupofUser = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/getAllGroupofUser`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const group_checkNewMessage = async (groupID) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/groupStudying/checkNewMessage`,
    { groupID: groupID },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};
