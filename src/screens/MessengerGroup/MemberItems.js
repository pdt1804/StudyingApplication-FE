import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../api/DomainAPI";

function MemberItems(props) {
  let { image, fulName } = props.invitation.information;
  let { userName } = props.invitation;

  const { onPress, onPressButtonLeft, onPressButtonRight } = props;

  const [isAlreadyAddedInGroup, setIsAlreadyAddedInGroup] = useState(false);

  const [myUsername, setMyUsername] = useState("");
  const [friendUsername, setFriendUsername] = useState(userName);
  const [buttonName, setButtonName] = useState("Xoá khỏi nhóm");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const extractToken = await axios.get(
          API_BASE_URL + "/api/v1/information/ExtractBearerToken",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer " + (await AsyncStorage.getItem("username")),
            },
          }
        );
        setMyUsername(extractToken.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, [props.userName]);

  const handleLeaveGroup = async () => {
    if (buttonName == "Xoá khỏi nhóm") {
      if (userName != myUsername) {
        const response = await axios.delete(
          API_BASE_URL +
            "/api/v1/groupStudying/deleteUser?userName=" +
            userName +
            "&groupID=" +
            (await AsyncStorage.getItem("groupID")),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " + (await AsyncStorage.getItem("username")),
            },
          }
        );
        if (response.status == 200) {
          setButtonName("Đã xoá khỏi nhóm");
          alert("Xoá thành công");
        }
      } else {
        alert("Bạn không thể tự xoá bạn");
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        style={styles.avatarImage}
        source={{
          uri: image,
        }}
      />
      <View style={styles.rightArea}>
        <Text style={styles.nameText} numberOfLines={1}>
          {fulName}
        </Text>
        <View style={styles.buttonsView}>
          <TouchableOpacity
            onPress={handleLeaveGroup}
            style={[
              styles.buttons,
              styles.buttonSingle,
              {
                backgroundColor: isAlreadyAddedInGroup
                  ? colors.GrayBackground
                  : "red",
              },
            ]}
          >
            <Text style={styles.buttonsText}>
              {buttonName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default MemberItems;

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginVertical: "2%",
    marginHorizontal: "4%",
    paddingStart: 10,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: colors.inactive,
    borderWidth: 1,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: colors.ShadowedItems,
  },
  avatarImage: {
    width: 65,
    height: 65,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 15,
    alignSelf: "center",
    borderWidth: 3,
  },
  nameText: {
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: fontSizes.h5,
  },
  rightArea: {
    flex: 1,
    flexDirection: "column",
  },
  buttonsView: {
    width: "90%",
  },
  //
  buttons: {
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonSingle: {
    width: "99%",
  },
  buttonDouble: {
    width: "45%",
  },
  //
  buttonsText: {
    padding: 7,
    paddingVertical: 7,
    paddingHorizontal: 10,
    color: colors.PrimaryObjects,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
});
