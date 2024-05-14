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
import { images, colors, icons, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { API_BASE_URL } from "../../api/DomainAPI";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';


const EditPost = (props) => {
  const [blankContent, setBlankContent] = useState(true);

  const [filePath, setFilePath] = useState("images.blankImageLoading")


  let { blogID, content, image, nameSubject, subjectID } = props.route.params;

  const [contentText, setContentText] = useState(content);

  
  //Add/change image
  const handleImage = async () => {
    alert("đổi hình thành công");
  };

  //navigation
  const { navigate, goBack } = props.navigation;

  useEffect(() => {
    const fetchData = async () => {
        if (image != " ")
        {
            setFilePath(image)
        }
        contentText == "" ? setBlankContent(true) : setBlankContent(false);
    };

    fetchData();
  }, [props.userName]);

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

        setFilePath(result.assets[0].uri);

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

  };

  const handleUpdatePost = async () => {

    if (contentText.length == 0)
    {
        alert("Vui lòng nhập nội dung thảo luận")
        return;
    }

    const formData = new FormData();
    formData.append('blogID', blogID);
    formData.append('content', contentText);
  
    const response = await axios.put(API_BASE_URL + '/api/v1/blog/updateBlog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    });

    if (filePath != "images.blankImageLoading")
    {
      uploadImage(filePath, blogID)
    }
        
    if (response.status == 200)
    {
      alert('Chỉnh sửa thành công');
    }

    const type = {
        nameSubject: nameSubject,
        subjectID: subjectID,
    }

    navigate("TabDiscussionFiltered", {type: type});
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
        title={"Sửa thảo luận"}
        leftIconName={icons.backIcon}
        rightIconName={icons.sendMessageCursorIcon}
        onPressLeftIcon={() => {
          goBack()
        }}
        onPressRightIcon={() => {
          handleUpdatePost();
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
export default EditPost;

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
