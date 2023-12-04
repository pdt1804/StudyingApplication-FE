import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { images, colors, icons, fontSizes } from "../../../constants";

function TabLeader(props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBarAndButtonView}>
        <View /* Search bar */ style={styles.searchBarView}>
          <TextInput
            autoCorrect={false}
            inputMode="search"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={styles.searchBarTypingArea}
          />
          <Image source={images.searchIcon} style={styles.searchBarImage} />
        </View>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text
            style={{
              paddingHorizontal: 11,
              fontSize: fontSizes.h7,
              fontWeight: "bold",
            }}
          >
            {"Thiết lập nhóm"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default TabLeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  searchBarAndButtonView: {
    height:'11%',
    flexDirection: 'row',
  },
  searchBarView: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  searchBarTypingArea: {
    backgroundColor: colors.inactive,
    height: "75%",
    flex: 1,
    borderRadius: 90,
    paddingStart: 45,
  },
  searchBarImage: {
    width: "8%",
    height: "40%",
    position: "absolute",
    top: "30%",
    left: 8,
  },
  buttonContainer: {
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,

    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,

    backgroundColor: 'lightblue',

    justifyContent: "center",
    alignItems: 'flex-end',
  }
});
