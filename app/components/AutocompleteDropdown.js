/** Component made by Liam Atkinson **/
import "expo-router/entry";
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

const AutocompleteDropdown = ({ dataSet, onSelectItem }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const handleInputChange = (text) => {
    
    setQuery(text);

    // Filter suggestions based on the input text
    const filteredSuggestions = dataSet.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    if(!text)
        setSuggestions(dataSet);

  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setQuery(item.title);
    setSuggestions([]);
    onSelectItem(item);
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity        
     ref={dropdownRef}
     onPress={() => handleItemPress(item)}
     className ="flex bg-gray-50 border border-1 border-black text-start">
      <Text className="p-2">
        {item.title}
      </Text>
    </TouchableOpacity>
  );
  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.blur();
      setSuggestions([]);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>

    <View className="flex justify-center items-center">
      <TextInput
        ref={dropdownRef}
        className ="border w-2/3 p-3 border-1 border-black rounded-t-md"
        placeholder="Type to search..."
        placeholderTextColor={"grey"}
        value={query}
        onChangeText={handleInputChange}
      />

      <FlatList
        className="w-2/3"
        data={suggestions}
        renderItem={renderSuggestionItem}
        keyExtractor={(item) => item.id}
      />

      {selectedItem && (
        <View>
          <Text>Selected Item: {selectedItem.title}</Text>
        </View>
      )}   

    </View>
    </TouchableWithoutFeedback>
  );
};

export default AutocompleteDropdown;
