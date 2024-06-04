import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { icons, colors, fontSizes } from "../constants";
import IconRating from "./IconRating";
import Icon from "./MyIcon";

export const ReviewItems = ({
  content: reviewContent,
  dateCreated,
  dateEdited,
  rating: starRatingPoint,
  reviewID,
  reviewer,
}) => {
  const userAvatar = { uri: reviewer.information.image };
  const userFullName = reviewer.information.fulName;
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.topView}>
        <View style={styles.userInfo}>
          <Image source={userAvatar} style={styles.userAvatar} />
          <Text style={styles.userName}>{userFullName}</Text>
        </View>
        <View style={styles.starRating}>
          <IconRating
            currentRating={starRatingPoint}
            max={5}
            viewOnly={true}
            starSize={15}
            starColor={colors.SecondaryOnContainerAndFixed}
            eachStarContainerStyle={{ marginHorizontal: 1 }}
          />
        </View>
      </View>
      <Text style={styles.reviewContent}>{reviewContent}</Text>
    </View>
  );
};

export const NewReviewInput = ({ onSubmit }) => {
  const [newReviewContent, setNewReviewContent] = useState("");
  const [newStarRatingPoint, setNewStarRatingPoint] = useState(0);

  const handleContentChange = (text) => {
    setNewReviewContent(text);
  };

  const handleStarRatingChange = (rating) => {
    setNewStarRatingPoint(rating);
  };

  const handleSubmit = (newReviewContent, newStarRatingPoint) => {
    onSubmit(newReviewContent, newStarRatingPoint);

    setNewReviewContent("");
    setNewStarRatingPoint(0); // Reset nội dung và số sao sau khi submit
  };

  const emoFace = () => {
    let emoFace = icons.review0;
    newStarRatingPoint == 1
      ? (emoFace = icons.review1)
      : newStarRatingPoint == 2
      ? (emoFace = icons.review2)
      : newStarRatingPoint == 3
      ? (emoFace = icons.review3)
      : newStarRatingPoint == 4
      ? (emoFace = icons.review4)
      : newStarRatingPoint == 5
      ? (emoFace = icons.review5)
      : (emoFace = icons.review0);
    return emoFace;
  };

  const emoColor = () => {
    let emoColor = colors.rating0;
    newStarRatingPoint == 1
      ? (emoColor = colors.rating1)
      : newStarRatingPoint == 2
      ? (emoColor = colors.rating2)
      : newStarRatingPoint == 3
      ? (emoColor = colors.rating3)
      : newStarRatingPoint == 4
      ? (emoColor = colors.rating4)
      : newStarRatingPoint == 5
      ? (emoColor = colors.rating5)
      : (emoColor = colors.rating0);
    return emoColor;
  };

  return (
    <View style={styles.newReviewInputContainer}>
      <View style={styles.newReviewRatingContainer}>
        <IconRating
          currentRating={newStarRatingPoint}
          max={5}
          viewOnly={false}
          onChange={handleStarRatingChange}
          starSize={45}
          starColor={colors.SecondaryOnContainerAndFixed}
          starsContainerStyle={{ marginBottom: 10 }}
          eachStarContainerStyle={{ marginHorizontal: 1 }}
        />
        <Icon name={emoFace()} size={50} color={emoColor()} />
      </View>
      <TextInput
        style={styles.newReviewContentInput}
        placeholder="Nhập nội dung đánh giá..."
        onChangeText={handleContentChange}
        value={newReviewContent}
        accessibilityElementsHidden
        multiline
      />
      <TouchableOpacity
        onPress={() => handleSubmit(newReviewContent, newStarRatingPoint)}
        style={styles.newReviewButton}
      >
        <Text style={styles.newReviewButtonText}>Gửi đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ReviewFinalViewOnly = ({ currentRatingPoint }) => {
  const emoFace = () => {
    let emoFace = icons.review0;
    currentRatingPoint <= 1
      ? (emoFace = icons.review1)
      : currentRatingPoint <= 2
      ? (emoFace = icons.review2)
      : currentRatingPoint <= 3
      ? (emoFace = icons.review3)
      : currentRatingPoint <= 4
      ? (emoFace = icons.review4)
      : currentRatingPoint <= 5
      ? (emoFace = icons.review5)
      : (emoFace = icons.review0);
    return emoFace;
  };

  const emoColor = () => {
    let emoColor = colors.rating0;
    currentRatingPoint <= 1
      ? (emoColor = colors.rating1)
      : currentRatingPoint <= 2
      ? (emoColor = colors.rating2)
      : currentRatingPoint <= 3
      ? (emoColor = colors.rating3)
      : currentRatingPoint <= 4
      ? (emoColor = colors.rating4)
      : currentRatingPoint <= 5
      ? (emoColor = colors.rating5)
      : (emoColor = colors.rating0);
    return emoColor;
  };

  return (
    <View style={styles.newReviewInputContainer}>
      <View style={styles.newReviewRatingContainer}>
        {/* <Text style={styles.currentRatingPoint}>{currentRatingPoint}</Text> */}
        <IconRating
          currentRating={currentRatingPoint}
          max={5}
          viewOnly={true}
          starSize={45}
          starColor={'gold'}
          starsContainerStyle={{ marginBottom: 10 }}
          eachStarContainerStyle={{ marginHorizontal: 1 }}
        />
        <Icon name={emoFace()} size={50} color={emoColor()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //items
  reviewContainer: {
    backgroundColor: colors.PrimaryContainer,
    padding: 16,
    marginHorizontal: 10,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  topView: { flexDirection: "row", justifyContent: "space-between" },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  userName: {
    fontSize: fontSizes.h6,
    fontWeight: "bold",
  },
  starRating: {
    flexDirection: "row",
    marginTop: 8,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  reviewContent: {
    marginTop: 16,
    fontSize: fontSizes.h7,
    lineHeight: 20,
  },
  //new input
  newReviewInputContainer: {
    padding: 16,
    width: "96%",
    marginBottom: 10,
    backgroundColor: colors.transparentWhite,
    borderRadius: 4,
    borderColor: colors.SecondaryOnContainerAndFixed,
    borderWidth: 1,
    alignSelf: "center",
  },
  newReviewRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    paddingBottom: 5,
  },
  newReviewContentInput: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  starRatingInput: {
    flexDirection: "row",
    marginBottom: 16,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  newReviewButton: {
    backgroundColor: colors.RedLightBackground,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginEnd: 10,
    borderRadius: 7,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  newReviewButtonText: {
    color: colors.RedContainer,
    fontSize: fontSizes.h7,
  },
  //final view only
  currentRatingPoint: {
    marginLeft: 10,
    fontSize: fontSizes.h1,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  }
});
