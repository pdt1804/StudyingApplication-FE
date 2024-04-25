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
import { UIHeader, Icon, SubjectBox, ContentBox } from "../../components";
import {
  notifications_getNameGroupByNotifycationID,
  notifications_loadNotifycation,
  notifications_getBlogById,
  notifications_getDocumentById,
} from "../../api";

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
          isLikeAble={false}
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
