import "expo-router/entry";
import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import AutocompleteDropdown from "../components/AutocompleteDropdown";
import { Card, Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";

const MainPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

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

  const queryClient = new QueryClient();

  const { data, error, isLoading } = useQuery(['dogs'], () => fetchData(), {
    queryClient,
  });

  const ninjaQuery = useQuery(['dogs2', selectedItem], () => fetchDogNinjas(selectedItem), {
    queryClient,
    enabled: !!selectedItem,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.error('Error:', error);
    return <Text>Error fetching data</Text>;
  }

  const handleSelectItem = (item) => {
    setSelectedItem(item.name);
    console.log('Selected Item:', item);
  };
  const didNinjaQueryReturn = (ninjaQuery.data) ? "true" : "false";
  return (
    <View >
      <AutocompleteDropdown dataSet={data} onSelectItem={handleSelectItem} />
      {selectedItem && (
        <SafeAreaView className ="mt-2 z-1 relative">
          <ScrollView>
            {ninjaQuery.data ? (
            <Card>
               <Text className="text-lg font-bold p-2" >{ninjaQuery.data[0].name}</Text> 
                <Card.Cover source={{ uri: ninjaQuery.data[0].image_link }} />
                <Card.Content>
                <Text className="text-lg font-bold" >{JSON.stringify(ninjaQuery.data)}</Text>
                  <Text variant="bodyMedium">Card content</Text>
                </Card.Content>
                <Card.Actions>
                  <Button>Cancel</Button>
                  <Button>Ok</Button>
                </Card.Actions>
            </Card>
          ) : null} 
          </ScrollView>
         
        </SafeAreaView>
      )}
    </View>
  );
  
}
const App = () => (
  <QueryClientProvider client={new QueryClient()}>
    <MainPage />
  </QueryClientProvider>
);

export default App;
