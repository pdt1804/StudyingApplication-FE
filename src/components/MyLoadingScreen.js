import React from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { images, icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";

//  PHẢI CÓ dòng này khi dùng:
//  const [isLoading, setIsLoading] = useState(true);

//  Và nhớ là thêm setIsLoading(false) và phần fetch data!!

//  Đoạn dưới thì thêm:
/*
  if (isLoading) {
    return (
      <_Tên loại loading screen_>
    );
  }
 */

export function LoadingFullScreen({ data, selectedValue, onSelect }) {
    return (
      <SafeAreaView style={styles.fullScreenContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    fullScreenContainer: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      paddingTop: StatusBar.currentHeight,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  