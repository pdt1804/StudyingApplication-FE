import React, { useState, useEffect, useRef } from "react";
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
import { UIHeader } from "../../components";
import axios from "axios";
import { API_BASE_URL } from "../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

const CreateNotification = (props) => {
  const [blankContent, setBlankContent] = useState(true);
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");
  const [path, setPath] = useState(null)
  const [images, setimages] = useState([])

  const handleCreatePost = async () => {
    
    if (titleText.length == 0)
    {
      alert('Hãy nhập tiêu đề')
      return;
    }

    if (contentText.length == 0)
    {
      alert('Hãy nhập nội dung')
      return;
    }

    var formData = new FormData()
    formData.append('header', titleText)
    formData.append('content', contentText)
    formData.append('groupID', await AsyncStorage.getItem('groupID'))

    // khởi tạo thông báo mà không có hình ảnh
    const response = await axios.post(API_BASE_URL + "/api/v1/notifycation/createWithoutFiles", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    })

    if (images.length > 0)
    {
      for (var i = 0; i < images.length; i++)
      {
        const uri = images[i].uri;
        const name = images[i].fileName;
        const type = images[i].type;

        uploadImage(uri, name, type, response.data)
      }
    }

    if (response.status == 200)
    {
      alert("Tạo thành công") 
    }
    else
    {
      alert("không tạo thành công, vui lòng thử lại") 
    }

    goBack();
  };

  const uploadImage = async (uri, name, type, notificationID) => {
    console.log(uri)
    console.log(name)
    console.log(type)

    const formData = new FormData();
    formData.append('image', {
      uri: uri,
      name: name,
      type: type,
    });
    formData.append('notificationID', notificationID)
  
    try {
      // const response = await fetch('YOUR_BACKEND_URL', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      const response = await axios.post(API_BASE_URL + '/api/v1/notifycation/insertImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      });
  
      // if (response.status == 200) {
      //   const imageURL = await response.json();
      //   //console.log('URL của ảnh:', imageURL);
      //   //alert('Đổi thành công')
      //   // Tiếp tục xử lý URL của ảnh ở đây

      // } else {
      //   console.log('Lỗi khi tải lên ảnh');
      // }
    } catch (error) {
      console.log('Lỗi:', error);
    }
  };


  //navigation
  const { navigate, goBack } = props.navigation;

  //Quickly delete written content
  useEffect(() => {
    contentText == "" ? setBlankContent(true) : setBlankContent(false);
  });

  //Auto focus on TextInput when the screen is touched
  const textInputRef = useRef(null);
  const handleTouch = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const selectImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      
      try {

        setPath(result.assets[0].uri);
        await setimages([...images, result.assets[0]]);

        // for (var i = 0; i < result.assets.length; i++)
        // {
        //   await setimages([...images, {uri: result.assets[i].uri, name: result.assets[i].fileName, type: result.assets[i].type}])
        // }

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

  };
  

  return (
    <View style={styles.container}>
      <UIHeader
        title={'Tạo thông báo'}
        leftIconName={blankContent ? icons.backIcon : icons.cancelCircleIcon}
        rightIconName={icons.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          blankContent ? goBack() : (setContentText(""), setTitleText(""));
        }}
        onPressRightIcon={() => {
          handleCreatePost();
        }}
      />

      <ScrollView onTouchStart={handleTouch}>
        <TextInput /* title */
          style={styles.titleTextInput}
          inputMode="text"
          maxLength={180}
          onChangeText={(text) => {
            setTitleText(text);
          }}
          value={titleText}
          placeholder={"Tiêu đề"}
          placeholderTextColor={colors.inactive}
        />
        <TextInput /* content */
          ref={textInputRef}
          style={styles.contentTextInput}
          inputMode="text"
          multiline
          onChangeText={(text) => {
            setContentText(text);
          }}
          value={contentText}
          placeholder={"Soạn thông báo"}
          placeholderTextColor={colors.inactive}
        />
        <TouchableOpacity style={styles.imgClickable} onPress={selectImage}>
          <Image source={{uri: path}} style={styles.image} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default CreateNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  contentTextInput: {
    paddingStart: 15,
    padding: 10,
  },
  titleTextInput: {
    paddingStart: 15,
    padding: 10,
    borderColor: colors.inactive,
    borderBottomWidth: 1,
    marginTop: 20,
    height: 50,
    marginBottom: 20,
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
  imgClickable: {
    backgroundColor: colors.transparentWhite,
  },
});
