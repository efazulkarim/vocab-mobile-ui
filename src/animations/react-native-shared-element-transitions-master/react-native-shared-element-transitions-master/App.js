import 'react-native-gesture-handler';
import React from 'react';
import { LogBox, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { SafeAreaView } from 'react-native-safe-area-context';
import List from './Screens/List';
import Detail from './Screens/Detail';
import TravelList from './Screens/TravelList';
import TravelListDetail from './Screens/TravelListDetail';
import TravelUpDetails from './Screens/TravelUpDetails';
import NavigationList from './Screens/NavigationList';
import UrbanEarsDetails from './Screens/UrbanEarsDetails';
import FoodListDetails from './Screens/FoodListDetails';
import SalonListDetails from './Screens/SalonListDetails';
import EventsListDetails from './Screens/EventsListDetails';
import MoviesListDetails from './Screens/MoviesListDetails';
import CardsListDetails from './Screens/CardsListDetails';
import navigation from './config/navigation';
import { AppLoading } from 'expo';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  SourceSansPro_400Regular_Italic,
  SourceSansPro_700Bold,
} from '@expo-google-fonts/source-sans-pro';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
} from '@expo-google-fonts/playfair-display';
import PhotographyListDetails from './Screens/PhotographyListDetails';
import CarsDetails from './Screens/CarsDetails';
LogBox.ignoreAllLogs(true)


const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    SourceSansPro_700Bold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
  });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="NavigationList"
        screenOptions={{ cardStyle: { backgroundColor: 'white' }, headerShown: false }}
      >
        <Stack.Screen name="NavigationList" component={NavigationList} />
        {navigation.map((item) => (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={item.component}
          />
        ))}
        {/* <Stack.Screen name="List" component={List}/> */}
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={() => options}
        />
        <Stack.Screen
          name="TravelUpDetails"
          component={TravelUpDetails}
          options={() => options}
        />
        {/* <Stack.Screen name="TravelList" component={TravelList}/> */}
        <Stack.Screen
          name="TravelListDetail"
          component={TravelListDetail}
          options={() => options}
        />
        <Stack.Screen
          name="PhotographyListDetails"
          component={PhotographyListDetails}
          options={() => options}
        />
        <Stack.Screen
          name="CarsDetails"
          component={CarsDetails}
          options={() => options}
        />
        <Stack.Screen
          name="UrbanEarsDetails"
          component={UrbanEarsDetails}
          options={() => options}
        />
        <Stack.Screen
          name="FoodListDetails"
          component={FoodListDetails}
          options={() => options}
        />
        <Stack.Screen
          name="SalonListDetails"
          component={SalonListDetails}
          options={() => options}
        />
        <Stack.Screen
          name="EventsListDetails"
          component={EventsListDetails}
          options={() => options}
        />
        <Stack.Screen
          name="MoviesListDetails"
          component={MoviesListDetails}
          options={() => options}
        />
        <Stack.Screen
          name="CardsListDetails"
          component={CardsListDetails}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
