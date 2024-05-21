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
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, SubjectBox, ContentBox } from "../../components";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";
import { FloatingAction } from "react-native-floating-action";

const floatingActions = [
  {
    text: "Chỉnh sửa thảo luận",
    icon: icons.pencilIcon,
    name: "bt_edit",
    position: 1,
  },
  {
    text: "Xóa thảo luận",
    icon: icons.trashCanIcon,
    name: "bt_delete",
    position: 2,
  },
];

const ShowPost = (props) => {
  let { blogID, content, dateCreated, comments, subject, image } =
    props.route.params.topic;
  let { nameSubject, subjectID } = props.route.params;
  let { userName } = props.route.params.topic.userCreated;
  let { fulName } = props.route.params.topic.userCreated.information;

  const parts = image[0] != null ? image[0].toString().split("-")[0] : null;

  //navigation
  const { navigate, goBack, push } = props.navigation;

  const [likeStatus, setLikeStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [leaderOfGroup, setLeaderOfGroup] = useState("");
  const [groupID, setGroupID] = useState("");

  const [shouldReload, setShouldReload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const extractToken = await axios.get(
        API_BASE_URL + "/api/v1/information/ExtractBearerToken",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );
      setUsername(extractToken.data);

      const responseGroup = await axios.get(
        API_BASE_URL +
          "/api/v1/groupStudying/findGroupbyId?groupID=" +
          (await AsyncStorage.getItem("groupID")),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      setLeaderOfGroup(responseGroup.data.leaderOfGroup.userName);

      setGroupID(responseGroup.data.groupID);

      const checkLike = await axios.get(
        API_BASE_URL + "/api/v1/blog/checkLikeBlog?blogID=" + blogID,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      setLikeStatus(checkLike.data === true);
    };

    if (shouldReload) {
      // Perform actions to reload the screen
      setShouldReload(false); // Reset the flag
    }

    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [props.userName, username, shouldReload]);

  const date = new Date(dateCreated);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const sendingTime = `${hour}:${minute} ${day}/${month}`;

  const deletePost = () => {
    if (username != leaderOfGroup && username != userName) {
      alert("Bạn không phải nhóm trưởng hoặc người tạo");
    } else {
      Alert.alert(
        "Xác nhận xoá",
        "Bạn có chắc chắn muốn xoá?",
        [
          {
            text: "Huỷ",
            style: "cancel",
          },
          {
            text: "Xoá",
            style: "destructive",
            onPress: async () => {
              const response = await axios.delete(
                API_BASE_URL + "/api/v1/blog/deleteBlog?blogID=" + blogID,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization:
                      "Bearer " + (await AsyncStorage.getItem("username")),
                  },
                }
              );

              if (response.status == 200) {
                goBack();
              } else {
                alert("Kiểm tra lại mạng, xoá không thành công");
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  //Xu li like
  const handleLike = async () => {
    //alert(`id: ${blogID}`)
    var form = new FormData();
    form.append("blogID", blogID);

    const likeBlog = await axios.post(
      API_BASE_URL + "/api/v1/blog/likeBlog",
      form,
      {
        headers: {
          Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
        },
      }
    );

    /* if (likeBlog.status == 200) {
      setShouldReload(true);
    } */
  };

  const updatePost = async () => {
    if (username != leaderOfGroup && username != userName) {
      alert("Bạn không phải nhóm trưởng hoặc người tạo");
    } else {
      navigate("EditPost", {
        blogID: blogID,
        content: content,
        image: image,
        nameSubject: nameSubject,
        subjectID: subjectID,
      });
    }
  };

  const ShowPicture = () => {
    if (image == "icons.blankImageLoading") {
      alert("Nội dung này không có ảnh");
      return;
    }

    navigate("ShowPicture", { file: image });
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thảo luận"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
      />

      <ScrollView style={styles.mainView}>
        <SubjectBox
          icon={icons.groupIcon}
          title="Người tạo thảo luận"
          content={fulName}
        />

        <SubjectBox
          icon={icons.clockIcon}
          title="Thời gian tạo"
          content={sendingTime}
        />

        <SubjectBox
          icon={icons.menuIcon}
          title="Chủ đề"
          content={subject.nameSubject}
        />

        <ContentBox
          icon={icons.documentBlackIcon}
          title="Nội dung"
          content={content}
          isLikeAble={true}
          likeStatus={likeStatus}
          onPressLikeIcon={handleLike}
        />

        <TouchableOpacity onPress={ShowPicture}>
          <Image
            source={{ uri: parts  }}
            style={styles.image}
          />
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.commentBar}
        onPress={() => {
          navigate("Comment", { blogID: blogID });
        }}
      >
        <Text style={styles.commentBarText}>Xem bình luận</Text>
      </TouchableOpacity>

      <FloatingAction
        actions={floatingActions}
        position="right"
        onPressItem={(name) => {
          name == "bt_edit" ? updatePost() : deletePost();
        }}
      />
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
