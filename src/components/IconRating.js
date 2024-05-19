import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { icons } from "../constants";

export default IconRating = ({
  currentRating = 0,
  max = 5,
  onChange,
  viewOnly = false,
  starSize = 30,
  starColor = 'black',
  starsContainerStyle,
  eachStarContainerStyle,
}) => {
  const [hoverRating, setHoverRating] = useState(currentRating);
  const [starIconFilled, setStarIconFilled] = useState(icons.starSoftFilled);
  const [starIconEmpty, setStarIconEmpty] = useState(icons.starSoftEmpty);
  const [starIconHalf, setStarIconHalf] = useState(icons.starSoftHalf);

  useEffect(() => {
    setHoverRating(currentRating);
  }, [currentRating]);

  const handleStarPress = (rating) => {
    if (!viewOnly) {
      setHoverRating(rating);
      onChange(rating);
    }
  };

  const handleStarEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(currentRating);
  };

  const getStarIcon = (rating) => {
      return rating <= Math.round(hoverRating) ? starIconFilled : starIconEmpty;
  };

  const getHalfStarIcon = () => {
      return starIconHalf
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      let starIcon;
      (currentRating > Math.floor(currentRating) && i > currentRating && i - 1 < currentRating)
        ? (starIcon = getHalfStarIcon(currentRating))
        : (starIcon = getStarIcon(i));
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          onMouseEnter={() => handleStarEnter(i)}
          onMouseLeave={handleStarLeave}
          style={[styles.starContainer, eachStarContainerStyle]}
        >
          <Image
            source={starIcon}
            style={{ width: starSize, height: starSize, tintColor: starColor }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={[styles.ratingContainer, starsContainerStyle]}>
      {renderStars()}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
  },
  starContainer: {
    marginHorizontal: 5,
  },
});
