import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../DomainAPI";

export const notifications_getNameGroupByNotifycationID = async (notifycationID) => {
  const response = await axios.get(
    API_BASE_URL +
      "/api/v1/groupStudying/getNameGroupByNotificationID?notificationID=" +
      notifycationID, {
        headers: {
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      }
  );
  return response.data;
}

export const notifications_loadNotifycation = async (notifycationID) => {
  const response = await axios.get(
    API_BASE_URL +
      "/api/v1/notifycation/loadNotifycation?notifycationID=" +
      notifycationID, {
        headers: {
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      }
  );
  return response.data;
}

export const notifications_getBlogById = async (blogID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getBlogById?blogID=${blogID}`,
    {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );
  return response;
};

export const notifications_getDocumentById = async (documentID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/document/getDocumentById?documentID=${documentID}`,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + (await AsyncStorage.getItem('username')),
      },
    }
  );

  return response;
};

// export const notifications_getNameGroupByNotifycationID = async (notifycationID) => {
//   var form = new FormData()
//   form.append('notificationID', notifycationID)
//   const response = await axios.get(
//     API_BASE_URL +
//       "/api/v1/groupStudying/getNameGroupByNotificationID", form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
//         },
//       }
//   );
//   return response.data;
// }

// export const notifications_loadNotifycation = async (notifycationID) => {
//   var form = new FormData()
//   form.append('notificationID', notifycationID)
//   const response = await axios.get(
//     API_BASE_URL +
//       "/api/v1/notifycation/loadNotifycation", form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
//         },
//       }
//   );
//   return response.data;
// }

// export const notifications_getBlogById = async (blogID) => {
//   var form = new FormData();
//   form.append("blogID", blogID)
//   const response = await axios.get(
//     `${API_BASE_URL}/api/v1/blog/getBlogById`, form,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         "Authorization": 'Bearer ' + (await AsyncStorage.getItem('username')),
//       },
//     }
//   );
//   return response;
// };

// export const notifications_getDocumentById = async (documentID) => {
//   var form = new FormData();
//   form.append("documentID", documentID);
//   const response = await axios.get(
//     `${API_BASE_URL}/api/v1/document/getDocumentById`, form,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         "Authorization": 'Bearer ' + (await AsyncStorage.getItem('username')),
//       },
//     }
//   );
//   return response;
// };
