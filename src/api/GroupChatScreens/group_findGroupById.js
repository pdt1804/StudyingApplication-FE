import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../DomainAPI";

export const group_findGroupById = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/findGroupbyId?groupID=${groupID}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};