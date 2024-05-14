import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import {
  UIHeader,
  RowSectionTitle,
  RowSectionDisplay,
  RowSectionNavigate,
} from "../../components";
import { API_BASE_URL } from "../../api/DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { groupStudying_findGroupbyId, information_ExtractBearerToken, groupStudying_deleteGroup } from "../../api";

function GroupInfo(props) {
  const [numberOfMembers, setNumberOfMembers] = useState(null);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(null);
  const [extractToken, setExtractToken] = useState(null);

  const [group, setGroup] = useState("");
  const [leader, setLeader] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [members, setMembers] = useState("");

  let date;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupID = await AsyncStorage.getItem("groupID");
        const responseData = await groupStudying_findGroupbyId(groupID);
        setGroup(responseData);
        setLeader("Trưởng nhóm:  " + responseData.leaderOfGroup.fulName);
        setUsername(responseData.leaderOfGroup.userName);
        setNumberOfMembers(responseData.numberOfMembers);
        setImage(responseData.image);
        setMembers("Số thành viên: " + responseData.numberOfMembers);

        date = new Date(responseData.dateCreated);
        setDateCreated(
          "Ngày tạo nhóm:  " +
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );

        const extractToken = await information_ExtractBearerToken()

        setExtractToken(extractToken);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const LeaveGroup = async () => {
    try {
      if (username == extractToken) {
        if (numberOfMembers > 1) {
          alert("Vui lòng đổi nhóm trưởng trước khi rời nhóm");
        } else {
          const response = await groupStudying_deleteGroup(group.groupID)/* axios.delete(
            API_BASE_URL +
              "/api/v1/groupStudying/deleteGroup?groupID=" +
              ,
            {
              headers: {
                 "application/json",
                Authorization:
                  "Bearer " + (await AsyncStorage.getItem("username")),
              },
            }
          ); */
          if (response.status == 200) {
            //await AsyncStorage.removeItem('groupID');
            navigate("MainBottomTab", { tabName: "GroupChat" });
          }
        }
      } else {
        const response = await axios.delete(
          API_BASE_URL +
            "/api/v1/groupStudying/deleteGroup?groupID=" +
            group.groupID,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + (await AsyncStorage.getItem("username")),
            },
          }
        );
        if (response.status == 200) {
          //await AsyncStorage.removeItem('groupID');
          navigate("MainBottomTab", { tabName: "GroupChat" });
        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {
    if (username == extractToken) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri.toString());

        try {
          const groupID = await AsyncStorage.getItem("groupID");

          var imagePath = result.assets[0].uri.toString();

          uploadImage(imagePath);

          // const formData = new FormData();
          // formData.append('image', {
          //   imagePath,
          //   name: 'image.jpg',
          //   type: 'image/jpg',
          // });
          // formData.append('groupID', groupID);

          // const response = await axios.put(API_BASE_URL + '/api/v1/groupStudying/changeAvatarGroup', formData, {
          // headers: {
          //     'Content-Type': 'multipart/form-data',
          //     'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          // },
          // });

          // if (response.status == 200)
          // {
          // console.log(imagePath)
          // }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    } else {
      alert("Bạn không phải trưởng nhóm.");
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "image.jpg",
      type: "image/jpg",
    });
    formData.append("groupID", await AsyncStorage.getItem("groupID"));

    try {
      // const response = await fetch('YOUR_BACKEND_URL', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      const response = await axios.put(
        API_BASE_URL + "/api/v1/groupStudying/changeAvatarGroup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + (await AsyncStorage.getItem("username")),
          },
        }
      );

      if (response.status == 200) {
        const imageURL = await response.json();
        console.log("URL của ảnh:", imageURL);
        alert("Đổi thành công");
        // Tiếp tục xử lý URL của ảnh ở đây
      } else {
        console.log("Lỗi khi tải lên ảnh");
      }
    } catch (error) {
      console.log("Lỗi:", error);
    }
  };

  const ChangeInformationGroup = async () => {
    if (username == extractToken) {
      navigate("GroupInformationDetail", { group: group });
    } else {
      alert("Bạn không phải trưởng nhóm.");
    }
  };

  const MembersInGroup = async () => {
    if (username == extractToken) {
      navigate("MembersInGroup");
    } else {
      alert("Bạn không phải trưởng nhóm.");
    }
  };

  const AddMembers = async () => {
    if (username == extractToken) {
      navigate("AddMember");
    } else {
      alert("Bạn không phải trưởng nhóm.");
    }
  };

  const ShowPicture = () => {
    navigate("ShowPicture", { file: image });
  };

  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thiết lập"}
        leftIconName={icons.backIcon}
        onPressLeftIcon={() => {
          goBack();
        }}
      />

      <ScrollView>
        <View /* Profile picture */ style={styles.profileView}>
          <TouchableOpacity onPress={ShowPicture}>
            <Image source={{ uri: image }} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.profileUsername}>{group.nameGroup}</Text>
          <TouchableOpacity onPress={selectImage} style={styles.button}>
            <Text style={styles.buttonText}>Thay đổi ảnh</Text>
          </TouchableOpacity>
        </View>

        <RowSectionTitle text={"Thông tin nhóm"} styles={{ marginTop: 20 }} />

        <RowSectionDisplay icon={icons.phoneIcon} text={leader} />

        <RowSectionDisplay icon={icons.personIcon} text={members} />

        <RowSectionDisplay icon={icons.emailIcon} text={dateCreated} />

        <RowSectionTitle text={"Tùy chỉnh tài khoản"} />

        <RowSectionNavigate
          icon={icons.personIcon}
          text={"Đổi thông tin nhóm"}
          onPress={ChangeInformationGroup}
        />

        <RowSectionNavigate
          icon={icons.keyIcon}
          text={"Thêm thành viên"}
          onPress={AddMembers}
        />

        <RowSectionNavigate
          icon={icons.keyIcon}
          text={"Danh sách thành viên"}
          onPress={MembersInGroup}
        />
        <RowSectionNavigate
          icon={icons.exportIcon}
          text={"Rời nhóm"}
          onPress={LeaveGroup}
        />
      </ScrollView>
    </View>
  );
}
export default GroupInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  bannerImage: {
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    position: "absolute",
  },
  profileView: {
    height: 200,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 90,
    borderColor: "white",
    borderWidth: 5,
  },
  profileUsername: {
    color: "black",
    fontSize: fontSizes.h6,
  },
  groupOptionsView: {
    height: 50,
    marginStart: 12,
    justifyContent: "center",
  },
  groupOptionsText: {
    fontSize: fontSizes.h7,
    color: colors.noImportantText,
    paddingStart: 10,
  },
  eachOptionView: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  eachOptionIcon: {
    width: 20,
    height: 20,
    marginStart: 10,
  },
  eachOptionText: {
    fontSize: fontSizes.h6,
    color: "black",
    paddingStart: 15,
  },
  button: {
    backgroundColor: "blue", // Màu xanh
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    width: 150,
    height: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Chữ trắng
    fontSize: 12,
  },
});
