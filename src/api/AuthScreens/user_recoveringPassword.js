import axios from "axios";
import { API_BASE_URL } from "../DomainAPI";

export const auth_getRecoveryCode = async (username) => {
  const apiPath = API_BASE_URL + "/api/v1/user/GetRecoveryCode?userName=" + username;
  return apiPath;
};

export const auth_getAuthOTP = async (api) => {
  const getAuthOTP = await axios.get(api);
  return getAuthOTP.data;
};

export const auth_changePasswordAfterOTP = async (userName, password) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/user/ChangePasswordAfterOTP?userName=${userName}&passWord=${password}`
  );
  return response;
};