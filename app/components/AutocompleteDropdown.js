import "expo-router/entry";
import React, { useState, useRef } from 'react';
import { View, Text, Dimensions, TextInput, FlatList, TouchableOpacity, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import { FullWindowOverlay } from "react-native-screens";

const windowHeight = Dimensions.get('window').height;

const AutocompleteDropdown = ({ dataSet, onSelectItem }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const handleInputChange = (text) => {
    setQuery(text);

    const filteredSuggestions = dataSet.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleItemPress = (item) => {
      //setSelectedItem(item);
     setQuery('');
    setSuggestionsVisible(false);
    onSelectItem(item);
    
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity        
      onPress={() => handleItemPress(item)}
      className="flex bg-gray-50 border border-1 border-black text-star w-full">
      <Text className="p-2">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const closeDropdown = () => {
    Keyboard.dismiss();
    setSuggestionsVisible(false);
  };

  const handleInputClick = () => {
    setSuggestionsVisible(true);
    setSuggestions(dataSet);

  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <SafeAreaView className="flex z-10 items-center">
        <View className="w-2/3">
          <TextInput
            className="border p-3 border-1 border-black rounded-t-md"
            placeholder="Type to search..."
            placeholderTextColor="grey"
            value={query}
            onChangeText={handleInputChange}
            onFocus={handleInputClick}
          />
          {suggestionsVisible && (
            <SafeAreaView style={{ maxHeight: windowHeight / 3, zIndex:10, elevation:2}}>
              <FlatList
                data={suggestions}
                renderItem={renderSuggestionItem}
                keyExtractor={(item) => item.name.toString()}
              />
            </SafeAreaView>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AutocompleteDropdown;
