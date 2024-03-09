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
import { images, colors, icons, fontSizes } from "../../../constants";
import TabNotificationItems from "./TabNotificationItems";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../DomainAPI";
import TabDocumentItem from "./TabDocumentItem";
import * as DocumentPicker from 'expo-document-picker';
//import DocumentViewer from 'expo-document-viewer';
import PdfReader from "rn-pdf-reader-js";
//import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'ddsbj1z4x', 
//   api_key: '698816719337434', 
//   api_secret: 'B3H1aL9FI2guvg6X5jGifxUdGoQ' 
// });



function TabDocument(props) {
  const [notifications, setNotifications] = useState([]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation
  const { navigate, goBack } = props.navigation;

  const [userName, setUserName] = useState("")

  const [group, setGroup] = useState("")


  useEffect(() => {
    const fetchData = async () => {
     
        const extractToken = await axios.get(API_BASE_URL + "/api/v1/information/ExtractBearerToken", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setUserName(extractToken.data);

        const response = await axios.get(API_BASE_URL + "/api/v1/document/getAllDocumentOfGroup?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });
  
        const responseGroup = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'), {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        setGroup(responseGroup.data);

        setNotifications(response.data);
    };
  
    fetchData(); // Gọi fetchData ngay sau khi component được mount
  
    // Sử dụng setInterval để gọi lại fetchData mỗi giây
      const intervalId = setInterval(fetchData, 3000);
    
      // Hủy interval khi component bị unmounted
      return () => clearInterval(intervalId);
  }, [props.userName, userName])

  const selectFile = async () => {

    //alert(userName)
    if (group.leaderOfGroup.userName == userName)
    {
      try {
        const fileResult = await DocumentPicker.getDocumentAsync({
          type: '*/*', // Chọn tất cả các loại file
        });

        if (fileResult.canceled == true)
        {
          return;
        }

        // alert(fileResult.assets[0].uri.substring(7))

        // cloudinary.v2.uploader
        // .upload(fileResult.assets[0].uri.substring(7), {
        //   folder: '',
        //   resource_type: 'raw'})
        // .then(console.log);

        // alert("thanh cong")

        console.log(fileResult)

        console.log(fileResult.assets[0].uri)
        console.log(fileResult.assets[0].name)

        const formData = new FormData();
        formData.append('file', fileResult.assets[0].uri);
        formData.append('groupID', await AsyncStorage.getItem('groupID'));
        formData.append('userName', await AsyncStorage.getItem('username'));
        formData.append('fileName', fileResult.assets[0].name);

        const response = await axios.post(API_BASE_URL + "/api/v1/document/addDocument", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        })

        //uploadImage(fileResult.assets[0].uri, fileResult.assets[0].name, fileResult.assets[0].mimeType);

        if (response.status == 200)
        {
          alert('Thêm tài liệu thành công')
        }
        else
        {
          alert('Đã có lỗi xảy ra, hãy kiểm tra lại mạng')
        }

      } catch (error) {
        console.error(error);
      }
    }
    else
    {
      alert('Bạn không phải trưởng nhóm')
    }
  };

  const uploadImage = async (uri, name, type) => {
    const formData = new FormData();
    
    if(uri.toString())
    formData.append('file', {
      uri,
      name: name,
      type: type,
    });
    formData.append('groupID', await AsyncStorage.getItem('groupID'));
    formData.append('userName', await AsyncStorage.getItem('username'));
    formData.append('fileName', name);
  
    try {
      // const response = await fetch('YOUR_BACKEND_URL', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      const response = await axios.post(API_BASE_URL + "/api/v1/document/addDocument", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      })

  
      if (response.status == 200) {
        const imageURL = await response.json();
        console.log('URL của ảnh:', imageURL);
        alert('Tải lên thành công')
        // Tiếp tục xử lý URL của ảnh ở đây
      } else {
        console.log('Lỗi khi tải lên ảnh');
      }
    } catch (error) {
      console.log('Lỗi:', error);
    }
  };


  const openPDF = async (file) => {  
    try {
      await DocumentViewer.openAsync(fileUri);
    } catch (error) {
      console.error('Error opening PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.searchBarAndButtonView}>
        <View style={styles.searchBarView}>
          <Image source={images.searchIcon} style={styles.searchBarImage} />
          <TextInput
            autoCorrect={false}
            inputMode="search"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={styles.searchBarTypingArea}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={selectFile}
        >
          <Text style={styles.buttonText}>{"Thêm tài liệu"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {notifications
          .filter((eachNotification) =>
            eachNotification.header
              .toLowerCase()
              .includes(searchText.toLowerCase())
          )
          .map((eachNotification) => (
            <TabDocumentItem
              doc={eachNotification}
              key={eachNotification.documentID}
              onPress={() => { navigate('ShowDocument', {notification: eachNotification})}}
            />
          ))}
      </ScrollView>
    </View>
  );
}
export default TabDocument;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  searchBarAndButtonView: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBarView: {
    width: "50%",
    height: "65%",
    marginHorizontal: 10,
    marginTop: 10,    
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 90,    
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  searchBarTypingArea: {
    height: "75%",
    flex: 1,
    marginRight: 10,
  },
  searchBarImage: {
    width: 22,
    height: 22,
    resizeMode: "stretch",
    marginHorizontal: 8,
  },
  buttonContainer: {
    width: "auto",
    height: "65%",

    marginRight: 10,
    marginTop: 12,

    borderRadius: 20,

    backgroundColor: colors.active,

    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    paddingHorizontal: 11,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
  },
});
