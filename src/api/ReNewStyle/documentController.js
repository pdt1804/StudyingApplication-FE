import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const document_getAllDocumentOfGroup = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/document/getAllDocumentOfGroup?groupID=${groupID}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response.data;
};

export const document_getDocumentById = async (documentID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/document/getDocumentById?documentID=${documentID}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response.data;
};

export const document_addDocument = async (file, groupID) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('groupID', groupID);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/document/addDocument`,
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

export const document_deleteDocument = async (groupID, documentID) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/document/deleteDocument?groupID=${groupID}&documentID=${documentID}`,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response.data;
};
