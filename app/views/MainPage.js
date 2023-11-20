import "expo-router/entry";
import React,  { useState } from 'react';
import { SafeAreaView, Text, View, FlatList, ScrollView } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import AutocompleteDropdown from "../components/AutocompleteDropdown";

const MainPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);


  const handleSelectItem = (item) => {
    setSelectedItem(item.name);
    console.log('Selected Item:', item);
  };

  const fetchData = async () => {
    const response = await fetch(`https://api.thedogapi.com/v1/breeds?limit=100`, {
      method: 'GET',
      headers: {
        'X-Api-Key': 'live_PeTnIhCDd48mrM51tSyeirco99TgWSElZ5ILEoOfZBWXVUvKHwdh6QnN5f3Mr2nv',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  };

  const fetchDogNinjas = async (name) => {
    const response = await fetch(`https://api.api-ninjas.com/v1/dogs?name=` + {name}, {
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


  const queryClient = new QueryClient();

  const { data, error, isLoading } = useQuery(['dogs'], () => fetchData(), {
    queryClient,
  });
  const { dataNinjas, errorNinjas, isLoadingNinjas } = useQuery(['dogs2'], () => fetchDogNinjas(selectedItem), {
    queryClient,
    enabled: selectedItem !== null,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.error('Error:', error);
    return <Text>Error fetching data</Text>;
  }


  return (
      <View>
         <AutocompleteDropdown dataSet={data} onSelectItem={handleSelectItem} />
         
         <Text>{selectedItem}</Text>

      </View>
     
  );
};

const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <MainPage />
  </QueryClientProvider>
);

export default App;
