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
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader } from "../../components";

let likeStatus = false;

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
  let { blogID, content, dateCreated, comments, subject } =
    props.route.params.topic;
  let { userName } = props.route.params.topic.userCreated;
  let { fulName } = props.route.params.topic.userCreated.information;

  const date = new Date(dateCreated);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const sendingTime = `${hour}:${minute} ${day}/${month}`;

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
    //..

    likeStatus = !likeStatus;
    setShouldReload(true);
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thảo luận"}
        leftIconName={images.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
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
        <Image source={images.blankImageLoading} style={styles.image} />
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
