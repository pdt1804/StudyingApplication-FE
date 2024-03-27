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
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, Icon } from "../../components";
import {
  notifications_getNameGroupByNotifycationID,
  notifications_loadNotifycation,
  notifications_getBlogById,
  notifications_getDocumentById,
} from "../../api";

function SubjectBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.SubjectBoxView}>
      <Icon name={icon} size={20} color={colors.inactive} style={styles.icon} />
      <Text style={styles.title}>{title}: </Text>
      <Text style={styles.SubjectBoxContent}>{content}</Text>
    </View>
  );
}

function ContentBox(props) {
  const { icon, title, content } = props;

  return (
    <View style={styles.ContentBoxView}>
      <View style={styles.ContentBoxTopView}>
        <Icon
          name={icon}
          size={20}
          color={colors.inactive}
          style={styles.icon}
        />
        <Text style={styles.title} onPress={props.OnPressContent}>
          {title}:{" "}
        </Text>
      </View>
      <Text style={styles.ContentBoxContent}>{content}</Text>
    </View>
  );
}

const ShowNotificationOfUser = (props) => {
  let { header, content, notifycationType, dateSent, notifycationID, image } =
    props.route.params.notification;

  const date = new Date(dateSent);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const sendingTime = `${hour}:${minute} ${day}/${month}`;

  const [groupName, setGroupName] = useState("");
  const [item, setItem] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getGroupName = await notifications_getNameGroupByNotifycationID(
          notifycationID
        );
        setGroupName(getGroupName);

        const getItem = await notifications_loadNotifycation(notifycationID);
        setItem(getItem);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  const LoadItem = async () => {
    console.log(notifycationType);
    console.log(notifycationType != "user");
    if (notifycationType == "user") {
    } else {
      try {
        if (item != null) {
          if (item.documentID == -1) {
            const response = await notifications_getBlogById(item.blogID);

            if (response.status == 200) {
              navigate("ShowPost", { topic: response.data });
            } else if (response.status == 500) {
              alert("Nội dung này có thể đã bị xoá");
            } else {
              alert("Đã có lỗi xảy ra, vui lòng xem trong nhóm");
            }
          } else if (item.blogID == -1) {
            const response = await notifications_getDocumentById(
              item.documentID
            );

            if (response.status == 200) {
              navigate("ShowDocument", { notification: response.data });
            } else if (response.status == 500) {
              alert("Nội dung này có thể đã bị xoá");
            } else {
              alert("Đã có lỗi xảy ra, vui lòng xem trong nhóm");
            }
          } else {
          }
        } else {
          alert("Bài thảo luận hoặc tài liệu này đã bị xoá");
        }
      } catch (error) {
        //console.error(error.message)
        alert("Nội dung này đã bị xoá");
      }
    }
  };

  const ShowPicture = () => {
    if (image == null) {
      alert("Nội dung này không có ảnh");
      return;
    }
    navigate("ShowPicture", { file: image });
  };

  //navigation
  const { navigate, goBack } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thông báo"}
        leftIconName={icons.backIcon}
        rightIconName={null}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={null}
        mainStyle={{
          paddingBottom: 20,
        }}
      />

      <ScrollView style={{ marginTop: 20 }}>
        <SubjectBox icon={icons.groupIcon} title="Nhóm" content={groupName} />

        <SubjectBox
          icon={icons.clockIcon}
          title="Thời gian gửi"
          content={sendingTime}
        />

        <SubjectBox
          icon={icons.menuIcon}
          title="Loại thông báo"
          content={item.notifycationType == "user" ? "Trưởng nhóm" : "Hệ thống"}
        />

        <SubjectBox
          icon={icons.priceTagIcon}
          title="Tiêu đề"
          content={item.header}
        />

        <ContentBox
          icon={icons.documentBlackIcon}
          title="Nội dung"
          content={item.content}
          OnPressContent={() => {
            LoadItem();
          }}
        />

        <TouchableOpacity onPress={ShowPicture}>
          <Icon
            name={{ uri: image != null ? image : null }}
            size={20}
            color={colors.inactive}
            style={styles.image}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default ShowNotificationOfUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
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
    alignItems: "center",
  },
  ContentBoxContent: {
    padding: 15,
    marginTop: 5,
    color: "black",
    fontSize: fontSizes.h6,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 0,
    alignSelf: "center",
  },
});
