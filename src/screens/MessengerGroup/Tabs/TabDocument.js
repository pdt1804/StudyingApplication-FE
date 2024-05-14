import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../../../constants";
import { SearchBarAndButton } from "../../../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TabDocumentItem from "./TabDocumentItem";
import * as DocumentPicker from "expo-document-picker";
import {
  group_findGroupById,
  group_extractBearerToken,
  group_getAllDocumentOfGroup,
  group_addDocument,
} from "../../../api";

export default function TabDocument(props) {
  //navigation
  const { navigate, goBack } = props.navigation;

  const [userName, setUserName] = useState("");
  const [group, setGroup] = useState("");
  const [documents, setDocuments] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const groupID = await AsyncStorage.getItem("groupID");
      const responseGroup = await group_findGroupById(groupID);
      const responseDocument = await group_getAllDocumentOfGroup();
      const extractToken = await group_extractBearerToken();

      setUserName(extractToken.data);
      setDocuments(responseDocument.data);
      setGroup(responseGroup.data);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [props.userName, userName]);

  const selectFile = async () => {
    if (group.leaderOfGroup.userName == userName) {
      try {
        const fileResult = await DocumentPicker.getDocumentAsync({
          type: "*/*", // Chọn tất cả các loại file
        });

        if (fileResult.canceled == true) {
          return;
        }

        console.log(fileResult);
        console.log(fileResult.assets[0].uri);
        console.log(fileResult.assets[0].name);

        const response = await group_addDocument(fileResult);
        if (response.status == 200) {
          alert("Thêm tài liệu thành công");
        } else {
          alert("Đã có lỗi xảy ra, hãy kiểm tra lại mạng");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Bạn không phải trưởng nhóm");
    }
  };

  return (
    <View style={styles.container}>
      <SearchBarAndButton
        searchBarOnChangeText={(text) => {
          setSearchText(text);
        }}
        buttonTitle={"Thêm tài liệu"}
        buttonOnPress={selectFile}
        buttonLength={"100%"}
      />

      <ScrollView style={styles.listContainer}>
        {documents
          .filter((eachDocument) =>
            eachDocument.header
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachDocument) => (
            <TabDocumentItem
              doc={eachDocument}
              key={eachDocument.documentID}
              onPress={() => {
                navigate("ShowDocument", { document: eachDocument });
              }}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  listContainer: {
    flex: 1,
  },
});
