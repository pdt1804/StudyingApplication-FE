import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";

export const TextInputMediumIcon = ({
  inputMode,
  name,
  icon,
  placeholder,
  isPassword,
  onChangeText,
  style,
}) => (
  <View style={styles.container}>
    <Icon
      name={icon}
      size={55}
      color={colors.PrimaryBackground}
      style={{ marginTop: 25 }}
    />
    <View>
      <Text>{name}:</Text>
      <TextInput
        style={styles.textInputMediumIcon}
        secureTextEntry={isPassword == null ? false : isPassword} // * the password
        inputMode={inputMode == null ? "text" : inputMode}
        placeholder={placeholder}
        placeholderTextColor={colors.noImportantText}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);

export const TextInputTransparent = ({
  inputMode,
  icon,
  placeholder,
  isPassword,
  onChangeText,
  style,
}) => (
  <View style={styles.container}>
    <Icon name={icon} size={33} color={colors.PrimaryBackground}/>
    <TextInput
      style={styles.textInputTransparent}
      secureTextEntry={isPassword == null ? false : isPassword} // * the password
      inputMode={inputMode == null ? "text" : inputMode}
      placeholder={placeholder}
      placeholderTextColor={colors.noImportantText}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  textInputMediumIcon: {
    width: 250,
    height: 55,
    marginTop: 5,
    paddingLeft: 20,
    borderColor: colors.noImportantText,
    borderWidth: 2,
    borderRadius: 20,
  },
  textInputTransparent: {
    flexDirection: "row",
    flex: 1,
    height: 40,
    paddingRight: 10,
    paddingLeft:5,
    paddingBottom: 5,
    borderRadius: 40,
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRadius: 5,
  },
});
