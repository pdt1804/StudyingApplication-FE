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
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader, EnterMessageReplyBar } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../../DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowProfile from "../EssentialScreens/ShowProfiles/ShowProfile";

const Reply = (props) => {

  const [comments, setComments] = useState([]);

  const { commentID, userComment, content } = props.route.params.comment;

  //navigation
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/blog/getAllReplyInComment?commentID=" + commentID);
        setComments(response.data)
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
    const intervalId = setInterval(fetchData, 3000);

    // // Hủy interval khi component bị unmounted
     return () => clearInterval(intervalId);
  }, [props.userName]);

  const ShowProfile = async () => {
    navigate("ShowProfile", { userReplied: userComment });
  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Phản hồi bình luận"}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        textStyle={{ fontSize: fontSizes.h4 * 0.96 }}
      />

      <ScrollView style={styles.listContainer}>
        <TouchableOpacity style={styles.mainCommentContainer} onPress={ShowProfile}>
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
          </View>
        </TouchableOpacity>

        {comments.map((eachComment) => (
          <ReplyItems comment={eachComment} key={eachComment.replyID} navigate={navigate}/>
        ))}
      </ScrollView>

      
      <EnterMessageReplyBar commentID={commentID}/>
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
});
