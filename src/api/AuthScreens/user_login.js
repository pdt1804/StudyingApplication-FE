import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const user_login = async (username, password, action) => {
  try {
    if (username != null && password != null) {
      const response = await axios.get(
        API_BASE_URL +
          "/api/v1/user/Authenticate?userName=" +
          username +
          "&passWord=" +
          password
      );

      if (response.data != "Failed") {
        console.log(response.data)
        await AsyncStorage.setItem("username", response.data);
        action();
      } else {
        alert("Tài khoản hoặc mật khẩu không đúng");
      }
    } else {
      alert("Tài khoản hoặc mật khẩu không đúng");
    }
  } catch (error) {
    console.error(error.message);
    console.error(error.name);
    alert("Tài khoản hoặc mật khẩu không đúng");
  }
};
