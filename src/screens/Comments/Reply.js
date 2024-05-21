import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import ReplyItems from "./ReplyItems";
import { images, icons, colors, fontSizes } from "../../constants";
import {
  UIHeader,
  EnterMessageReplyBar,
  EnterMessageBar,
} from "../../components";
import { blog_getAllReplyInComment } from "../../api";

const Reply = (props) => {
  const [replies, setReplies] = useState([]);

  const { commentID, userComment, content, images } = props.route.params.comment;
  const { navigate, goBack } = props.navigation;

  
  //const commentImages = props.route.params.comment.images
  // const commentImages = [
  //   images.blankImageLoading,
  //   images.blankAvatarForNewGroup,
  //   images.blankAvatarForRegistration,
  // ];

  const commentImages = []

  //console.log (images.length)
  if (images.length > 0)
  {
    for (let i = 0; i < images.length; i++)
    {
      const parts = images[i].toString().split('-')
      //console.log (parts[0])
      commentImages.push(parts[0])
    }
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [props.userName]);

  const ShowProfile = async () => {
    navigate("ShowProfile", { userReplied: userComment });
  };

  const fetchData = async () => {
    try {
      const responseData = await blog_getAllReplyInComment(commentID);
      setReplies(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Phản hồi bình luận"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        textStyle={{ fontSize: fontSizes.h4 * 0.96 }}
      />

      <ScrollView style={styles.listContainer}>
        <TouchableOpacity
          style={styles.mainCommentContainer}
          onPress={ShowProfile}
        >
          <Image
            style={styles.img}
            source={{
              uri: userComment.information.image,
            }}
          />
          <View style={styles.textView}>
            <Text style={styles.titleText} numberOfLines={1}>
              {userComment.information.fulName}
            </Text>
            <Text style={styles.contentText}>{content}</Text>
        <View>
          {commentImages.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={[styles.image, { width: 200, height: 200 }]}
            />
          ))}
        </View>
          </View>
        </TouchableOpacity>

        {replies.map((eachReply) => (
          <ReplyItems
          reply={eachReply}
            key={eachReply.replyID}
            navigate={navigate}
          />
        ))}
      </ScrollView>

      {/* <EnterMessageReplyBar commentID={commentID} /> */}
      <EnterMessageBar commentID={commentID} actionType={'reply'}/>
    </View>
  );
};
export default Reply;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  mainCommentContainer: {
    minHeight: 65,
    marginBottom: 15,
    flexDirection: "row",
  },
  img: {
    width: 55,
    height: 55,
    resizeMode: "stretch",
    borderRadius: 15,
    marginTop: 11,
    marginHorizontal: 10,
  },
  textView: {
    flex: 1,
    marginRight: 10,
  },
  titleText: {
    color: colors.active,
    fontSize: fontSizes.h6,
    fontWeight: "800",
  },
  contentText: {
    color: "black",
    fontSize: fontSizes.h7,
    fontWeight: "600",
  },
  image: {
    maxWidth: 245,
    resizeMode: "contain",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: colors.PrimaryBackground,
  },
});
