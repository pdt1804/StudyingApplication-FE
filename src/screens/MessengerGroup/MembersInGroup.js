import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { images, icons, colors, fontSizes } from "../../constants";
import { UIHeader } from "../../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import axios from "axios";
import { API_BASE_URL } from "../../api/DomainAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MemberItems from "./MemberItems";

function MembersInGroup(props) {

    const [members, setMembers] = useState([]);
    const [searchText, setSearchText] = useState('')
    const [response, setResponse] = useState('')

    const { navigate, goBack, push } = props.navigation;


    useEffect(() => {
        const fetchData = async () => {

          try {
            
            setMembers([]);
            const responses = await axios.get(API_BASE_URL + "/api/v1/groupStudying/getAllUserInGroup?groupID=" + await AsyncStorage.getItem('groupID'), {
              headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('username'),
              },
            });
                    
            setResponse(responses);
            
            responses.data.forEach((member) => {
                setMembers((prevMembers) => [...prevMembers, member]);
              });

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();

        

      }, [props.userName]);


  return (
    <View style={styles.container}>
      <UIHeader title={"Thành viên"} 
        leftIconName={icons.backIcon}
        onPressLeftIcon={() => {
          goBack();
        }}
      />

      <View /* Search bar */ style={styles.searchBarView}>
        <TextInput
          style={styles.searchBarTypingArea}
          autoCorrect={false}
          inputMode="search"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          placeholder="Tìm kiếm..."
          placeholderTextColor={colors.inactive}
        />
        <Image source={icons.searchIcon} style={styles.searchBarImage} />
      </View>

      <View style={styles.blackLine} />

      <ScrollView>
        {members
          .filter((eachInvitation) =>
            eachInvitation.information.fulName.toLowerCase().includes(searchText.toLowerCase())
          ) 
          .map((eachInvitation) => (
            <MemberItems
              invitation={eachInvitation}
              key={eachInvitation.information.infoID}
              onPress={() => {
                navigate("ShowProfileMember", {
                  user: eachInvitation
                });
              }}
              onPressButtonLeft={()=> {
                push('MainBottomTab')
              }}
              onPressButtonRightr={()=> {
                push('MainBottomTab')
              }}
            />
          ))}
      </ScrollView>
     
    </View>
  );
}
export default MembersInGroup;


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
  });