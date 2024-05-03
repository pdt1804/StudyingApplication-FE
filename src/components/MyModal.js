import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { images, icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";

// PHẢI CÓ dòng này khi dùng: 
//    const [modalVisible, setModalVisible] = useState(false);
/*
<WhiteSlideBottomUp
  title={"---"}
  renderContent={renderContent---}
  modalVisible={modalVisible}
  setModalVisible={setModalVisible}
/>
*/
export function WhiteSlideBottomUp({ modalVisible, setModalVisible, title, renderContent }) {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={styles.fadeModalView}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.slideModalView}>
          <View style={styles.headerView}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Icon
                name={icons.cancelBlankIcon}
                size={30}
                color={colors.GrayBackground}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentView}>
            {renderContent()}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fadeModalView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
  },
  slideModalView: {
    flex: 1,
    width: "99%",
    marginTop: "33%",
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
    backgroundColor: "white",
    alignItems: "center",
    alignSelf: "center",
  },
  headerView: {
    width: '98%',
    height: '9%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  title: {
    marginLeft: "5%",
    fontSize: fontSizes.h4,
    fontWeight: "bold",
  },
  contentView: {
    width: "90%",
    marginTop: '5%',
    marginHorizontal: "10%",
    borderRadius: 20,
    paddingHorizontal: 35,
    alignItems: "center",
  },
});
