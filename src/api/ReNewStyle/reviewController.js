import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../DomainAPI';

export const review_checkUserReview = async (groupID) => {
  const token = await AsyncStorage.getItem('username');
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/review/checkUserReview?groupID=${groupID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const review_getAllReviewOfGroup = async (groupID) => {
  const response = await axios.get(
    `${API_BASE_URL}/api/v1/review/getAllReviewOfGroup?groupID=${groupID}`,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
      },
    }
  );
  return response.data;
};

export const review_createReview = async (groupID, rating, content) => {
  const token = await AsyncStorage.getItem('username');
  const response = await axios.post(
    `${API_BASE_URL}/api/v1/review/createReview`,
    null,
    {
      params: {
        groupID: groupID,
        rating: rating,
        content: content,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const review_updateReview = async (reviewID, rating, content) => {
  const token = await AsyncStorage.getItem('username');
  await axios.put(
    `${API_BASE_URL}/api/v1/review/updateReview`,
    null,
    {
      params: {
        reviewID: reviewID,
        rating: rating,
        content: content,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const review_deleteReview = async (reviewID) => {
  const token = await AsyncStorage.getItem('username');
  await axios.delete(
    `${API_BASE_URL}/api/v1/review/deleteReview`,
    {
      params: {
        reviewID: reviewID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
