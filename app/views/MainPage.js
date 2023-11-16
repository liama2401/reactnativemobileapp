import "expo-router/entry";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { useState } from "react";
import  AutocompleteDropdown  from "../components/AutocompleteDropdown";

const queryClient = new QueryClient();

const fetchData = async (name) => {
  const response = await fetch(`https://api.api-ninjas.com/v1/dogs?name=${name}`, {
    method: 'GET',
    headers: {
      'X-Api-Key': 'uSfmOqhbDgz6LcunZY64uw==lAYtrdv5SNoaGLIb',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

const MainPage = () => {
  
  const [selectedItem, setSelectedItem] = useState(null);
  const dataSet = [
    { id: '1', title: 'Apple' },
    { id: '2', title: 'Banana' },
    { id: '3', title: 'Cherry' },
  ];

  const handleSelectItem = (item) => {
    console.log('Selected Item:', item);
  };
  const name = 'golden retriever';
  const { data, error, isLoading } = useQuery(['dogs', name], () => fetchData(name));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error:', error);
    return <p>Error fetching data</p>;
  }

  console.log('Result:', data);
  return (
    <QueryClientProvider client={queryClient}>

  <View >
    <AutocompleteDropdown dataSet={dataSet} onSelectItem={handleSelectItem} />
  </View>    
</QueryClientProvider>
  );
}

export default MainPage;