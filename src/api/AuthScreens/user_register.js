import axios from "axios";
import { API_BASE_URL } from "../DomainAPI";

export const user_register = async (username, password, email, rePassword) => {
  let newUser = {
    userName: username,
    passWord: password,
    Email: email,
  };

  if (!email.endsWith("@gmail.com")) {
    if (!email.endsWith("@gm.uit.edu.vn")) {
      alert("Định dạng email không đúng");
      return;
    }
  }

  if (username.length > 8 && password.length > 8) {
    const checkUsername = await axios.get(
      API_BASE_URL + "/api/v1/user/checkUserName?userName=" + username
    );

    if (checkUsername.data == true) {
      alert("Đã tồn tại username này");
      return;
    }

    const checkEmail = await axios.get(
      API_BASE_URL + "/api/v1/user/checkEmail?email=" + email
    );

    if (checkEmail.data == true) {
      alert("Đã tồn tại email này");
      return;
    }

    try {
      if (password === rePassword) {
        const apiGetAuthCode = await axios.get(
          API_BASE_URL + "/api/v1/user/GetAuthenticationCode?email=" + email
        );

        return { newUser, otp: apiGetAuthCode.data };
      } else {
        alert("mật khẩu và nhập lại mật khẩu không giống");
      }
    } catch (catchError) {
      console.error(catchError.message);
    }
  } else {
    alert("Tài khoản và mật khẩu phải có tối thiểu 9 kí tự");
  }
};
