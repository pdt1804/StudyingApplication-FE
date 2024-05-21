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
import { API_BASE_URL } from "../../api/DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';


const CreatePost = (props) => {
  const [blankContent, setBlankContent] = useState(true);
  const [contentText, setContentText] = useState("");

  const [filePath, setFilePath] = useState(images.blankImageLoading)


  let { subjectID } = props.route.params;
  const [assets, setAssets] = useState([]);
  
  //Add/change image
  const handleImage = async () => {
    alert("đổi hình thành công");
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


  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      
      try {

        //setFilePath(result.assets[0].uri);
        setFilePath(result.assets[0].uri);
        //console.log(result.assets[0])

        for (let i = 0; i < result.assets.length; i++)
        {
          //assets.push(result.assets[i].uri);
          //setAssets([...assets, result.assets[i]])
          setAssets(result.assets)
          console.log(result.assets)
        }

        const username = await AsyncStorage.getItem('username');

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

  };

  const handleCreatePost = async () => {

    if (contentText.length == 0)
    {
      alert('Hãy nhập nội dung')
      return;
    }

    // let blog = {
    //   content: contentText,
    // };

    var formData = new FormData()
    formData.append('groupID', await AsyncStorage.getItem('groupID'))
    formData.append('userNames', [])
    formData.append('subjectID', subjectID)
    formData.append('content', contentText)

    const response = await axios.post(
      API_BASE_URL +
        "/api/v1/blog/createNewBlog",
        formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        }}
    );

    if (filePath != "icons.blankImageLoading")
    {
      for (let i = 0; i < assets.length; i++)
      {
        let url = assets[i].uri;
        console.log(assets)
        console.log(assets[i].uri)
        console.log(assets[i].type)
        console.log(assets[i].fileName)

        formData = new FormData()
        formData.append('blogID', response.data)
        formData.append("file", {
          url,
          name: assets[i].fileName,
          type: assets[i].type,
        });

        uploadImage(assets[i].uri, response.data)

        // const uploadImage = await axios.post(
        //   API_BASE_URL +
        //     "/api/v1/blog/uploadImage",
        //     formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        //     }}
        // );    
      }
    }

    // const formData = new FormData();
    // formData.append('blogID', response.data);
    // formData.append('file', filePath);
  
    // const responseUpdateImage = await axios.post(API_BASE_URL + '/api/v1/blog/insertImageInBlog', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
    //   }});

    goBack();
  };

  const uploadImage = async (uri, blogID) => {
    const formData = new FormData();
    
    if(uri.toString())
    formData.append('file', {
      uri,
      name: 'image.jpg',
      type: 'image/jpg',
    });
    formData.append('blogID', blogID)
  
    try {
      // const response = await fetch('YOUR_BACKEND_URL', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      const response = await axios.post(API_BASE_URL + '/api/v1/blog/insertImageInBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
        },
      });

  
      if (response.status == 200) {
        const imageURL = await response.json();
        console.log('URL của ảnh:', imageURL);
        alert('Tạo thành công')
        // Tiếp tục xử lý URL của ảnh ở đây
      } else {
        console.log('Lỗi khi tải lên ảnh');
      }
    } catch (error) {
      console.log('Lỗi:', error);
    }
  };

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Tạo thảo luận"}
        leftIconName={blankContent ? icons.backIcon : icons.cancelCircleIcon}
        rightIconName={icons.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          blankContent ? goBack() : setContentText("");
        }}
        onPressRightIcon={() => {
          handleCreatePost();
        }}
      />

      <ScrollView /* content */ onTouchStart={handleTouch}>
        <TextInput
          ref={textInputRef}
          style={styles.contentTextInput}
          inputMode="text"
          multiline //if want to limit the lines can add: numberOfLines={100}
          onChangeText={(text) => {
            setContentText(text);
          }}
          value={contentText}
          placeholder={"Soạn bài đăng. Điền vào đây..."}
          placeholderTextColor={colors.inactive}
        />
        <TouchableOpacity style={styles.imgClickable} onPress={selectImage}>
          <Image source={{uri: filePath}} style={styles.image} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  contentTextInput: {
    padding: 10,
    marginTop: 30,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "cover",
    margin: 15,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 5,
    alignSelf: "center",
  },
  imgClickable: {
    backgroundColor: colors.transparentWhite,
  },
});
