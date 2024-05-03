import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { images, icons, colors, fontSizes } from "../constants/index";
import Icon from "./MyIcon";

// Usage example:
/* **need: const [searchText, setSearchText] = useState("");
<SearchBarAndButton
  searchBarOnChangeText={(text) => {
    setSearchText(text);
  }}
  buttonTitle={"---"}
  buttonOnPress={() => {
    ---
  }}
  buttonLength={"---%"}
/>
*/
export function SearchBarAndButton(props) {
  const {
    searchBarOnChangeText,
    buttonTitle,
    buttonOnPress,
    buttonLength,
    buttonStyle,
  } = props;

  return (
    <View style={styles.sbab_container}>
      <View style={styles.sbab_searchBarView}>
        <Icon name={icons.searchIcon} size={22} color={"black"} />
        <TextInput
          autoCorrect={false}
          inputMode="search"
          onChangeText={searchBarOnChangeText}
          style={styles.sbab_searchBarTypingArea}
        />
      </View>

      <TouchableOpacity
        style={[{ width: buttonLength }, styles.sbab_buttonContainer]}
        onPress={buttonOnPress}
      >
        <Text style={styles.sbab_buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function SearchBarTransparent(props) {
  const {
    searchBarOnChangeText,
  } = props;

  return (
    <View style={styles.sbt_searchBarView}>
      <TextInput
        style={styles.sbt_searchBarTypingArea}
        autoCorrect={false}
        inputMode="search"
        onChangeText={searchBarOnChangeText}
        placeholder="Tìm kiếm..."
        placeholderTextColor={colors.inactive}
      />
      <Icon
        name={icons.searchIcon}
        size={20}
        color={colors.inactive}
        style={styles.sbt_searchBarImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  //searchBarAndButton
  sbab_container: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sbab_searchBarView: {
    flex: 1,
    height: "65%",
    marginLeft: 10,
    marginRight: 20,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentWhite,
  },
  sbab_searchBarTypingArea: {
    height: "75%",
    flex: 1,
    marginRight: 10,
  },
  sbab_buttonContainer: {
    width: "auto",
    height: "65%",
    marginRight: 10,
    marginTop: 12,
    borderRadius: 20,
    backgroundColor: colors.active,
    justifyContent: "center",
    alignItems: "center",
  },
  sbab_buttonText: {
    color: "white",
    paddingHorizontal: 11,
    fontSize: fontSizes.h7,
    fontWeight: "bold",
  },
  //-------------------
  //SearchBarTransparent
  sbt_searchBarView: {
    height: "7%",
    paddingHorizontal: 7,
    flexDirection: "row",
    paddingTop: 10,
    marginBottom: 10,
    backgroundColor: colors.transparentWhite,
    borderBottomColor: colors.inactive,
    borderBottomWidth: 1,
    borderRadius: 15,
  },
  sbt_searchBarTypingArea: {
    height: "95%",
    flex: 1,
    paddingStart: 45,
  },
  sbt_searchBarImage: {
    position: "absolute",
    top: "45%",
    left: "4%",
  },
});
