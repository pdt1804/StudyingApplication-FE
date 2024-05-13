import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../DomainAPI';

export const user_checkUserName = async (userName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/user/checkUserName?userName=${userName}`
  );
  return response.data;
};

export const user_checkEmail = async (email) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/user/checkEmail?email=${email}`
  );
  return response.data;
};

export const user_authenticate = async (userName, passWord) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/user/Authenticate?userName=${userName}&passWord=${passWord}`
  );
  return response.data;
};

export const user_createAccount = async (userName, passWord, email, image) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/user/CreateAccount`,
    null,
    {
      params: {
        userName: userName,
        passWord: passWord,
        email: email,
        image: image,
      },
    }
  );
  return response.data;
};

export const user_changePasswordAfterOTP = async (userName, passWord) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/user/ChangePasswordAfterOTP`,
    null,
    {
      params: {
        userName: userName,
        passWord: passWord,
      },
    }
  );
  return response.data;
};

export const user_getRecoveryCode = async (userName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/user/GetRecoveryCode?userName=${userName}`
  );
  return response.data;
};

export const user_getUser = async () => {
  const token = await AsyncStorage.getItem('username');
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/user/GetUser`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const user_getAuthenticationCode = async (email) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/user/GetAuthenticationCode?email=${email}`
  );
  return response.data;
};
