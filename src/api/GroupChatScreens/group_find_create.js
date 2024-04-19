import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

// most use
export const group_findGroupById = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/groupStudying/findGroupbyId?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

// button create group in tab your group
export const group_createGroup = async (newGroupName, newPassword) => {
  var form = new FormData();
  form.append("nameGroup", newGroupName);
  form.append("passWord", newPassword);
  form.append(
    "image",
    "https://www.iconbunny.com/icons/media/catalog/product/1/5/1563.8-team-ii-icon-iconbunny.jpg"
  );
  const response = await axios.post(
    API_BASE_URL + "/api/v1/groupStudying/createGroup",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

// -----------------------------------------
// ------- tab type (Subject) post ---------
// -----------------------------------------

export const group_getAllSubject = async () => {
  const response = await axios.get(
    API_BASE_URL +
      "/api/v1/blog/getAllSubject?groupID=" +
      (await AsyncStorage.getItem("groupID")),
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );

  return response;
};

export const group_extractBearerToken = async () => {
  const response = await axios.get(
    API_BASE_URL + "/api/v1/information/ExtractBearerToken",
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const group_createNewSubject = async (text) => {
  var form = new FormData();
  form.append("groupID", await AsyncStorage.getItem("groupID"));
  form.append("nameSubject", text);
  const response = await axios.post(
    API_BASE_URL + "/api/v1/blog/createNewSubject",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

// TabSubjectItems
export const group_getNumberOfBlogBySubject = async (subjectID) => {
  const response = await axios.get(
    API_BASE_URL +
      "/api/v1/blog/getNumberOfBlogBySubject?subjectID=" +
      subjectID +
      "&groupID=" +
      (await AsyncStorage.getItem("groupID")),
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};


// ----------------------------------
// ------- tab notification ---------
// ----------------------------------

export const group_getAllNotificationByGroupId = async () => {
    const response = await axios.get(API_BASE_URL + "/api/v1/notifycation/getAllNotifycationbyGroupID?groupID=" + await AsyncStorage.getItem('groupID'), {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
    });
    return response;
}


// ------------------------------
// ------- tab document ---------
// ------------------------------

export const group_getAllDocumentOfGroup = async () => {
    const response = await axios.get(API_BASE_URL + "/api/v1/document/getAllDocumentOfGroup?groupID=" + await AsyncStorage.getItem('groupID'), {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
    });
    return response;
}

export const group_addDocument = async (fileResult) => {
    const formData = new FormData();
    formData.append('file', fileResult.assets[0].uri);
    formData.append('groupID', await AsyncStorage.getItem('groupID'));
    formData.append('userName', await AsyncStorage.getItem('username'));
    formData.append('fileName', fileResult.assets[0].name);

    const response = await axios.post(API_BASE_URL + "/api/v1/document/addDocument", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
    });
    return response;
}


// ---------------------------------------
// ------- tab discussion (blog) ---------
// ---------------------------------------

export const group_getAllBlog = async () => {
    const response = await axios.get(
        API_BASE_URL +
          "/api/v1/blog/getAllBlog?groupID=" +
          (await AsyncStorage.getItem("groupID")), {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
            },
        }
    );
    return response;
}