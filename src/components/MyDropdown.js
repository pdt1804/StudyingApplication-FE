import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { images, icons, colors, fontSizes } from "../constants";
import Icon from "./MyIcon";

// PHẢI CÓ dòng này khi dùng:
/*
<Dropdown
  data={LIST_THAT_HAS_ONLY_lable_value}
  selectedValue={ --- } //optional
  onSelect={(item) => { --- }}
/>
*/
export default function Dropdown({ data, selectedValue, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText,setSearchText] = useState('');
    const listRef = useRef(null);
  
    const filteredData = data.filter(item => item.label.toString().toLowerCase().includes(searchText.toString().toLowerCase()));
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSelect = (item) => {
      onSelect(item);
      setIsOpen(false);
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleSelect(item)}>
        <Text style={styles.dropdownItem}>{item.label}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Text style={styles.selectedText}>{selectedValue || '☆☆☆ Chọn 1 chủ đề ☆☆☆'}</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdown}>
            <TextInput
              style={styles.searchInput}
              placeholder="Nhập tên Chủ Đề muốn tìm..."
              onChangeText={setSearchText}
            />
            <FlatList
              ref={listRef}
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => item.value}
              maxHeight={200} // Adjust maxHeight as needed
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
    },
    selectedText: {
      textAlign: 'center',
      fontSize: 16,
    },
    dropdown: {
      //position: 'absolute',
      //top: 40,
      //left: 0,
      //right: 0,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
    },
    searchInput: {
      marginBottom: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    dropdownItem: {
      fontSize: 16,
      paddingVertical: 5,
    },
  });
  