import "expo-router/entry";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { BottomNavigation } from 'react-native-paper';
import MainPage  from './views/MainPage'; 


const AlbumsRoute = () => <Text className="text-center mt-2 mb-8">Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

export default function App() {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'main', title: 'Main', focusedIcon: 'dog'},
    { key: 'jokes', title: 'Dog Jokes', focusedIcon: 'emoticon-happy', unfocusedIcon: 'emoticon-happy-outline' },
    { key: 'gallery', title: 'Gallery', focusedIcon: 'view-gallery', unfocusedIcon: 'view-gallery-outline' },
    { key: 'info', title: 'Your Dog', focusedIcon: 'information', unfocusedIcon: 'information-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    main: MainPage,
    jokes: AlbumsRoute,
    gallery: RecentsRoute,
    info: NotificationsRoute,
  });
  return (
    <View className="flex-1 bg-white">
      <Text className="text-center mt-2 mb-8">Dog App for all dog facts</Text>
      {/**<StatusBar style="auto" />**/}
      <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      inactiveColor="grey"
    />
    </View>
  );
}

