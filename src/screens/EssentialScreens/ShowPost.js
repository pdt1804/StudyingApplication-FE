import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../DomainAPI";

let likeStatus = false;

let blogiD;


function SubjectBox(props) {
  const { icon, title, content } = props;


  return (
    <View style={styles.SubjectBoxView}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.SubjectBoxContent}>{content}</Text>
    </View>
  );
}

function ContentBox(props) {
  const { icon, title, content } = props;
  const { onPress } = props;

  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

      const checkLike = await axios.get(API_BASE_URL + "/api/v1/blog/checkLikeBlog?userName=" + await AsyncStorage.getItem('username') + "&blogID=" + blogiD)

      setLikeStatus(checkLike.data === true)
      
      console.log(likeStatus)
    };

    fetchData(); // Gọi fetchData ngay sau khi component được mount

    const intervalId = setInterval(fetchData, 3000);

    // // Hủy interval khi component bị unmounted
     return () => clearInterval(intervalId);

  }, [props.userName, ])

  return (
    <View style={styles.ContentBoxView}>
      <View style={styles.ContentBoxTopView}>
        <View style={styles.leftSideTopView}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}: </Text>
        </View>

        <TouchableOpacity style={styles.rightSideIconView} onPress={onPress}>
          <Image
            source={
              likeStatus ? images.activeLikeIcon : images.inactiveLikeIcon
            }
            style={[
              styles.rightSideIcon,
              {
                tintColor: likeStatus ? "gold" : "black",
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.ContentBoxContent}>{content}</Text>
    </View>
  );
}

const ShowPost = (props) => {
  let { blogID, content, dateCreated, comments, subject, image } =
    props.route.params.topic;
  let { userName } = props.route.params.topic.userCreated;
  let { fulName } = props.route.params.topic.userCreated.information;

  blogiD = blogID

  const [likeStatus, setLikeStatus] = useState(false);

  const date = new Date(dateCreated);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const sendingTime = `${hour}:${minute} ${day}/${month}`;

  const [username, setUsername] = useState('')

  const [leaderOfGroup, setLeaderOfGroup] = useState('');

  const [groupID, setGroupID] = useState('');

  useEffect(() => {
    const fetchData = async () => {

      setUsername(await AsyncStorage.getItem('username'))

      const responseGroup = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'))

      setLeaderOfGroup(responseGroup.data.leaderOfGroup.userName)

      setGroupID(responseGroup.data.groupID)
    };

    fetchData(); // Gọi fetchData ngay sau khi component được mount

    //Sử dụng setInterval để gọi lại fetchData mỗi giây
     const intervalId = setInterval(fetchData, 3000);

    // // Hủy interval khi component bị unmounted
     return () => clearInterval(intervalId);
  }, [props.userName, username])


  const deletePost = () => {
    if (username != leaderOfGroup && username != userName)
    {
      alert('Bạn không phải nhóm trưởng hoặc người tạo')
    }
    else
    {
      Alert.alert(
        'Xác nhận xoá',
        'Bạn có chắc chắn muốn xoá?',
        [
          {
            text: 'Huỷ',
            style: 'cancel',
          },
          {
            text: 'Xoá',
            style: 'destructive',
            onPress: async () => {

              const response = await axios.delete(API_BASE_URL + "/api/v1/blog/deleteBlog?blogID=" + blogID)

              if (response.status == 200)
              {
                goBack();
              }
              else
              {
                alert('Kiểm tra lại mạng, xoá không thành công')
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  }

  //navigation
  const { navigate, goBack, push } = props.navigation;

  const [shouldReload, setShouldReload] = useState(false);
  useEffect(() => {
    if (shouldReload) {
      // Perform actions to reload the screen
      setShouldReload(false); // Reset the flag
    }
  }, [shouldReload]);

  //Xu li like
  const handleLike = async () => {
    
    const likeBlog = await axios.post(API_BASE_URL + "/api/v1/blog/likeBlog?userName=" + await AsyncStorage.getItem('username') + "&blogID=" + blogiD)

    if (likeBlog.status == 200)
    {
      setShouldReload(true);
    }
  }

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thảo luận"}
        leftIconName={images.backIcon}
        rightIconName={images.cancelIcon}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => deletePost()}
      />

      <ScrollView style={styles.mainView}>
        <SubjectBox
          icon={images.clockIcon}
          title="Người tạo thảo luận"
          content={fulName}
        />

        <SubjectBox
          icon={images.menuIcon}
          title="Thời gian tạo"
          content={sendingTime}
        />

        <SubjectBox
          icon={images.menuIcon}
          title="Chủ đề"
          content={subject.nameSubject}
        />

        <ContentBox
          icon={images.documentBlackIcon}
          title="Nội dung"
          content={content}
          onPress={handleLike}
        />
        <Image source={{uri: image != null ? image : null}} style={styles.image} />
      </ScrollView>

      <TouchableOpacity
        style={styles.commentBar}
        onPress={() => {
          navigate("Comment", { blogID: blogID });
        }}
      >
        <Text style={styles.commentBarText}>Xem bình luận</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ShowPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  mainView: {
    marginTop: 20,
    marginBottom: 50,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 5,
    marginRight: 10,
  },
  title: {
    color: "black",
    fontSize: fontSizes.h5,
    fontWeight: "500",
  },
  SubjectBoxView: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
  },
  SubjectBoxContent: {
    marginTop: 2,
    color: colors.noImportantText,
    fontSize: fontSizes.h5 * 0.9,
    fontWeight: "700",
  },
  ContentBoxView: {
    flexDirection: "column",
    paddingStart: 15,
    padding: 10,
  },
  ContentBoxTopView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSideTopView: { flexDirection: "row" },
  rightSideIconView: {},
  rightSideIcon: {
    width: 30,
    height: 30,
    marginTop: 5,
    marginRight: 10,
  },
  ContentBoxContent: {
    padding: 15,
    marginTop: 5,
    color: "black",
    fontSize: fontSizes.h6,
  },
  commentBar: {
    height: "auto",
    minHeight: 50,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.SecondaryBackground,
  },
  commentBarText: {
    fontWeight: "bold",
    fontSize: fontSizes.h5,
    textAlign: "center",
    alignSelf: "center",
    color: colors.PrimaryObjects,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 5,
    alignSelf: "center",
  },
});
