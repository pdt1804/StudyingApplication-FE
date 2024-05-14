import axios from "axios";
import { API_BASE_URL } from "../DomainAPI";


export const profile_getUser = async (username) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/user/GetUser`,
    {
      headers: {
        Authorization: `Bearer ${username}`,
      },
    }
  );
  return response;
};

export const profile_getAvatar = async (username) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/information/getAvatar?`,
    {
      headers: {
        Authorization: `Bearer ${username}`,
      },
    }
  );
  return response;
};

export const profile_uploadImage = async (uri, username) => {
  const formData = new FormData();
    formData.append("image", {
      uri,
      name: "image.jpg",
      type: "image/jpg",
    });

    try {
      const response = await axios.post(
        API_BASE_URL + "/api/v1/information/changeAvatarCloud",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + username,
          },
        }
      );

      if (response.status == 200) {
        const imageURL = await response.json();
        console.log("URL của ảnh:", imageURL);
        alert("Đổi thành công");
        // Tiếp tục xử lý URL của ảnh ở đây
      } else {
        console.log("Lỗi khi tải lên ảnh");
      }
    } catch (error) {
      console.log("Lỗi:", error);
    }
  //return response;
};
