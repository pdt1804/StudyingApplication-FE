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
import { images, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { usname } from "../Login";
import { API_BASE_URL } from "../../../DomainAPI";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { encode } from "base-64";


function GroupOption(props) {
  const { text } = props;

  return (
    <View style={styles.groupOptionsView}>
      <Text style={styles.groupOptionsText}>{text}</Text>
    </View>
  );
}

function EachOptionViewOnly(props) {
  const { icon, text } = props;

  return (
    <View style={styles.eachOptionView}>
      <Image source={icon} style={styles.eachOptionIcon} />
      <Text style={styles.eachOptionText}>{text}</Text>
    </View>
  );
}

function EachOptionNavigate(props) {
  const { icon, text, onPress } = props;

  return (
    <TouchableOpacity style={styles.eachOptionView} onPress={onPress}>
      <Image source={icon} style={styles.eachOptionIcon} />
      <Text style={styles.eachOptionText}>{text}</Text>
      <View style={{ flex: 1 }} />
      <Image source={images.chevronRightIcon} style={styles.eachOptionIcon} />
    </TouchableOpacity>
  );
}

function GroupInfo(props) {

  const [numberOfMembers, setNumberOfMembers] = useState(null);
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [image, setImage] = useState(null)
  const [username, setUsername] = useState(null)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);


  const [group, setGroup] = useState('');

  const [leader, setleader] = useState('');

  const [dateCreated, setDateCreated] = useState('');

  const [members, setMembers] = useState('')


  let date;

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/findGroupbyId?groupID=" + await AsyncStorage.getItem('groupID'))
        setGroup(response.data);
        setleader("Trưởng nhóm:  " + response.data.leaderOfGroup.fulName)
        setUsername(response.data.leaderOfGroup.userName)
        setNumberOfMembers(response.data.numberOfMembers)
        setImage(response.data.image)
        setMembers("Số thành viên: " + response.data.numberOfMembers)
        
        date = new Date(response.data.dateCreated);
        setDateCreated("Ngày tạo nhóm:  " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [props.userName]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const LeaveGroup = async () => {
    try {

      if (username == await AsyncStorage.getItem('username'))
      {
        if (numberOfMembers > 1)
        {
            alert('Vui lòng đổi nhóm trưởng trước khi rời nhóm')
        }
        else
        {
            const response = await axios.delete(API_BASE_URL + "/api/v1/groupStudying/deleteGroup?userName=" + username + "&groupID=" + group.groupID)
            if (response.status == 200)
            {
                //await AsyncStorage.removeItem('groupID');
                navigate("UITab" , {tabName: "GroupChat"})
            }
        }
      }
      else
      {
        const response = await axios.delete(API_BASE_URL + "/api/v1/groupStudying/deleteGroup?userName=" + await AsyncStorage.getItem('username') + "&groupID=" + group.groupID)
        if (response.status == 200)
        {
            //await AsyncStorage.removeItem('groupID');
            navigate("UITab" , {tabName: "GroupChat"})
        }
      }

    } catch (error) {

      console.error('Error logging out:', error);

    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = async () => {

    if (username == await AsyncStorage.getItem('username'))
    {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.cancelled) {
        
        setImage(result.uri);

        try {

            const groupID = await AsyncStorage.getItem('groupID');
            
            var imagePath = result.uri.toString()

            const formData = new FormData();
            formData.append('file', imagePath);
            formData.append('groupID', groupID);
    
            const response = await axios.put(API_BASE_URL + '/api/v1/groupStudying/changeAvatarGroup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            
            if (response.status == 200)
            {
            console.log(imagePath)
            }

        } catch (error) {
            console.error('Error uploading image:', error);
        }
        }
    }
    else
    {
        alert('Bạn không phải trưởng nhóm.')
    }

  };



  const ChangeInformationGroup = async () => {

    if (username == await AsyncStorage.getItem('username'))
    {
        navigate("GroupInformationDetail", {group: group})
    }
    else
    {
        alert('Bạn không phải trưởng nhóm.')
    }
  }

  const MembersInGroup = async () => {

    if (username == await AsyncStorage.getItem('username'))
    {
        navigate('MembersInGroup');
    }
    else
    {
        alert('Bạn không phải trưởng nhóm.')
    }
  }

  const AddMembers = async () => {

    if (username == await AsyncStorage.getItem('username'))
    {
        navigate('AddMember')
    }
    else
    {
        alert('Bạn không phải trưởng nhóm.')
    }
    
  }

  const ShowPicture = () => {
    navigate("ShowPicture", {file: image})
  }
  
  //function of navigation to/back
  const { navigate, goBack, push } = props.navigation;

  return (
    <View style={styles.container}>
      <UIHeader
        title={"Thiết lập"}
        leftIconName={images.backIcon}
        onPressLeftIcon={() => {
          goBack();
        }}
      />

      <ScrollView>
        <View /* Profile picture */ style={styles.profileView}>
          <TouchableOpacity onPress={ShowPicture}>
            <Image
              source={{ uri: image }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.profileUsername}>{group.nameGroup}</Text>
          <TouchableOpacity
              onPress={selectImage}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Thay đổi ảnh</Text>
            </TouchableOpacity>
        </View>

              
        <GroupOption text={"Thông tin nhóm"} styles={{marginTop: 20}}/>

        <EachOptionViewOnly
          icon={images.phoneIcon}
          text={leader}
        />

        <EachOptionViewOnly icon={images.personIcon} text={members} />

        <EachOptionViewOnly icon={images.emailIcon} text={dateCreated} />

        <GroupOption text={"Tùy chỉnh tài khoản"} />

        <EachOptionNavigate
          icon={images.personIcon}
          text={"Đổi thông tin nhóm"}
          onPress={ChangeInformationGroup}
        />

        <EachOptionNavigate
          icon={images.keyIcon}
          text={"Thêm thành viên"}
          onPress={AddMembers}
        />

        <EachOptionNavigate
          icon={images.keyIcon}
          text={"Danh sách thành viên"}
          onPress={MembersInGroup}
        />
        <EachOptionNavigate
          icon={images.exportIcon}
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
    top:0,
    left:0,
    right:0,
    height: 500,
    position: 'absolute'
  },
  profileView: {
    height: 200,
    alignItems: "center",
    backgroundColor: 'transparent'
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
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Chữ trắng
    fontSize: 12,
  },
});