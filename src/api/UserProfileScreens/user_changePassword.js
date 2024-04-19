import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const user_profile_changePassword = async (currentPassword, newPassword) => {
  const formData = new FormData();
  formData.append("newPassWord", newPassword);
  formData.append("currentPassWord", currentPassword);
  const username = await AsyncStorage.getItem("username");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/information/changePassword`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${username}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    alert("Thông tin bạn nhập không đúng, vui lòng nhập lại");
  }
};
