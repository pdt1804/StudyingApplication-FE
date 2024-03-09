import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import TabYourGroupsItems from "./TabYourGroupsItems";
import { images, colors, fontSizes } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../DomainAPI";
import axios from "axios";
import SockJS from 'sockjs-client';
import { over } from "stompjs";

function TabYourGroups(props) {
  //list of group example = state
  const [groups, setGroups] = useState([]);

  //use for search bar (textInput)
  const [searchText, setSearchText] = useState("");

  //navigation to/back
  const { navigate, goBack } = props.navigation;

  const [username, setUsername] = useState("")

  const [myUsername, setMyUsername] = useState("")

  
  // let socket = new SockJS(API_BASE_URL + "/ws")
  // let stompClient = over(socket)
  // stompClient.connect({}, onConnected, () => console.log("error"))

  const [socket, setSocket] = useState(new SockJS(API_BASE_URL + "/ws"))
  //const [stompClient, setStompClient] = useState(over(socket));
  
  let stompClient = over(socket);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/getAllGroupofUser", {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
          },
        });

        setGroups(response.data);

        //stompClient.connect({} , onConnected, onError)


        //console.log(response.data);
                
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    // // Hủy interval khi component bị unmounted
    return () => clearInterval(intervalId);

  }, [props.userName]);

  const onConnected = () =>
  {

  }

  const onError = async () =>
  {
    alert('Error')
  }



  const onReceived = async (message) =>
  {
    alert("reach")
    const response = await axios.get(API_BASE_URL + "/api/v1/groupStudying/getAllGroupofUser", {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
      },
    });

    setGroups(response.data);  
  }


  const SelectedGroup = async (eachGroup) => {

    try {
          
      await AsyncStorage.removeItem("groupID")
      await AsyncStorage.setItem("groupID", eachGroup.groupID.toString());

      await AsyncStorage.setItem('group', "chat");

      navigate("MessengerGroup", { group: eachGroup });

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
      setLoading(false);
    }
  
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarAndButtonView}>
        <View /* Search bar */ style={styles.searchBarView}>
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
          onPress={() => {
            navigate("CreateGroup");
          }}
        >
          <Text style={styles.buttonText}>{"Tạo nhóm học tập"}</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.blackLine} />

      <ScrollView>
        {groups
          .filter((eachGroup) =>
            eachGroup.nameGroup.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((eachGroup) => (
            <TabYourGroupsItems
              group={eachGroup}
              stompClient={stompClient}
              key={eachGroup.groupID}
              onPress={() => { SelectedGroup(eachGroup) }}
            />
          ))}
      </ScrollView>
    </View>
  );

}

export default TabYourGroups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  searchBarView: {
    height: "7%",
    paddingHorizontal: 7,
    flexDirection: "row",
    paddingTop: 10,
    backgroundColor: colors.transparentWhite,
  },
  searchBarTypingArea: {
    height: "95%",
    flex: 1,
    paddingStart: 45,
  },
  searchBarImage: {
    width: 20,
    height: 20,
    position: "absolute",
    top: "45%",
    left: "6%",
    tintColor: colors.inactive,
  },
  blackLine: {
    backgroundColor: colors.inactive,
    height: 1,
    width: "95%",
    alignSelf: "center",
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
});
