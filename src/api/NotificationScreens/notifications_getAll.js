import axios from 'axios';
import { API_BASE_URL } from "../DomainAPI";

export const notifications_getAllByUserName = async (userName) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/notifycation/getAllNotifycationbyUserName`,
    {
      headers: {
        'Authorization': 'Bearer ' + userName,
      },
    }
  );
  return response;
};
