import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../DomainAPI";

export const blog_getAllSubject = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getAllSubject?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_getAllBlog = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getAllBlog?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_getAllBlogByContent = async (groupID, input) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getAllBlogByContent?groupID=${groupID}&input=${input}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_insertImageInBlog = async (uri, name, type, width, height, blogID) => {
  const formData = new FormData();
  if (uri.toString())
    formData.append("file", {
      uri: uri,
      name: name,
      type: type,
    });
  formData.append("blogID", blogID);
  formData.append("width", width)
  formData.append("height", height)
  
  const response = await axios.post(
    API_BASE_URL + "/api/v1/blog/insertImageInBlog",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_getBlogById = async (blogID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getBlogById?blogID=${blogID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_getAllBlogBySubject = async (groupID, subjectID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getAllBlogBySubject?groupID=${groupID}&subjectID=${subjectID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_getAllCommentInBlog = async (blogID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getAllCommentInBlog?blogID=${blogID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_getAllReplyInComment = async (commentID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getAllReplyInComment?commentID=${commentID}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const blog_createNewSubject = async (groupID, nameSubject) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/blog/createNewSubject?groupID=${groupID}&nameSubject=${nameSubject}`,
    null,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_updateSubject = async (subjectID, newNameSubject) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/blog/updateSubject?subjectID=${subjectID}&newNameSubject=${newNameSubject}`,
    null,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_deleteSubject = async (subjectID) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/blog/deleteSubject?subjectID=${subjectID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_getNumberOfBlogBySubject = async (subjectID, groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/getNumberOfBlogBySubject?subjectID=${subjectID}&groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const blog_checkLikeBlog = async (blogID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/blog/checkLikeBlog?blogID=${blogID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const blog_likeBlog = async (blogID) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/blog/likeBlog?blogID=${blogID}`,
    null,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_createNewBlog = async (
  groupID,
  userNamesTagged,
  subjectID,
  contentText
) => {
  var formData = new FormData();
  formData.append("groupID", groupID);
  formData.append("userNames", userNamesTagged);
  formData.append("subjectID", subjectID);
  formData.append("content", contentText);

  console.log(userNamesTagged)
  const response = await axios.post(
    API_BASE_URL + "/api/v1/blog/createNewBlog",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );

  return response.data;
};

export const blog_insertImage = async (blogID, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/blog/insertImage?blogID=${blogID}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_insertImageInComment = async (uri, name, type, width, height, commentID) => {
  console.log(uri)
  console.log(name)
  console.log(type)

  const formData = new FormData();
  if (uri.toString())
    formData.append("file", {
      uri: uri,
      name: name,
      type: type,
    });
  formData.append("commentID", commentID);
  formData.append("width", width)
  formData.append("height", height)

  const response = await axios.post(
    API_BASE_URL + "/api/v1/blog/insertImageInComment",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_insertImageInReply = async (uri, name, type, width, height, replyID) => {
  console.log(uri)
  console.log(name)
  console.log(type)

  const formData = new FormData();
  if (uri.toString())
    formData.append("file", {
      uri: uri,
      name: name,
      type: type,
    });
  formData.append("replyID", replyID);
  formData.append("width", width)
  formData.append("height", height)

  const response = await axios.post(
    API_BASE_URL + "/api/v1/blog/insertImageInReply",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_reSendNotificationForBlog = async (
  blogID,
  groupID,
  userNames
) => {
  const formData = new FormData();
  formData.append("blogID", blogID);
  formData.append("groupID", groupID);
  userNames.forEach((username) => formData.append("userNames", username));

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/blog/reSendNotificationForBlog`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_sureToDeleteSubject = async (subjectID, groupID) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/blog/sureToDeleteSubject?subjectID=${subjectID}&groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const blog_commentBlog = async (
  blogID,
  content,
  userName,
  uri,
  name,
  type
) => {
  // const imageList = uriList.map((uri) => {
  //   return {
  //     uri,
  //     name: "image.jpg",
  //     type: "image/jpg",
  //   };
  // });
  const formData = new FormData();
  formData.append("blogID", blogID);
  formData.append("content", content);
  formData.append("userNames", userName);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/blog/commentBlog`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );

  return response;
};

export const blog_updateComment = async (commentID, comment) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/blog/updateComment?commentID=${commentID}`,
    comment,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_deleteComment = async (commentID) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/blog/deleteComment?commentID=${commentID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_replyComment = async (
  commentID,
  content,
  userNames,
) => {
  // const imageList = uriList.map((uri) => {
  //   return {
  //     uri,
  //     name: "image.jpg",
  //     type: "image/jpg",
  //   };
  // });
  const formData = new FormData();
  formData.append("commentID", commentID);
  formData.append("content", content);
  formData.append("userNames", userNames);
  //formData.append("files", imageList);

  const response = await axios.post(
    `${API_BASE_URL}/api/v1/blog/replyComment`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_updateReply = async (replyID, reply) => {
  const response = await axios.put(
    `${API_BASE_URL}/api/v1/blog/updateReply?replyID=${replyID}`,
    reply,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};

export const blog_deleteReply = async (replyID) => {
  const response = await axios.delete(
    `${API_BASE_URL}/api/v1/blog/deleteReply?replyID=${replyID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response;
};
