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
        style={styles.textInput}
        secureTextEntry={isPassword == null ? false : isPassword} // * the password
        inputMode={inputMode == null ? "text" : inputMode}
        placeholder={placeholder}
        placeholderTextColor={colors.noImportantText}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    width: 250,
    height: 55,
    marginTop: 5,
    paddingLeft: 20,
    borderColor: colors.noImportantText,
    borderWidth: 2,
    borderRadius: 20,
  },
});
