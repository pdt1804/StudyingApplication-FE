import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, StyleSheet, Alert } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader, RowSectionTitle, RowSectionDisplay } from "../../components";
import { group_findGroupById } from "../../api";
import * as ImagePicker from 'expo-image-picker';


function GroupSuggestionInfo(props) {
  let { groupID } = props.route.params.user;

  const [image, setImage] = useState(null);
  const [group, setGroup] = useState("");
  const [leader, setLeader] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [members, setMembers] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  let date;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await group_findGroupById(groupID);
        setGroup(response.data);
        setLeader("Trưởng nhóm:  " + response.data.leaderOfGroup.fulName);
        setImage(response.data.image);
        setMembers("Số thành viên: " + response.data.numberOfMembers);

        date = new Date(response.data.dateCreated);
        setDateCreated(
          "Ngày tạo nhóm:  " +
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );
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

  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thông tin nhóm"}
        leftIconName={icons.backIcon}
        onPressLeftIcon={() => {
          goBack();
        }}
      />

      <ScrollView>
        <View style={styles.profileView}>
          <Image source={{ uri: image }} style={styles.profileImage} />
          <Text style={styles.profileUsername}>{group.nameGroup}</Text>
        </View>

        <RowSectionTitle text={"Thông tin nhóm"} styles={{ marginTop: 20 }} />

        <RowSectionDisplay icon={icons.phoneIcon} text={leader} />
        <RowSectionDisplay icon={icons.personIcon} text={members} />
        <RowSectionDisplay icon={icons.emailIcon} text={dateCreated} />
      </ScrollView>
    </View>
  );
}
export default GroupSuggestionInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  profileView: {
    height: 200,
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 50,
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
});
