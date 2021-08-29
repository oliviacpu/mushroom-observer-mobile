import React from 'react';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';

import Login from './Login';
import ListObservations from './ListObservations';
import CreateObservation from './CreateObservation';
import MapScreen from './MapScreen';

const Stack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Select Location">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Observations"
        component={ListObservations}
        options={({navigation}) => ({
          headerRight: () => (
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Create Observation"
        component={CreateObservation}
        options={({navigation}) => ({
          headerRight: () => <Button title="Create" />,
        })}
      />
      <Stack.Screen
        name="Select Location"
        component={MapScreen}
        options={({navigation}) => ({
          headerRight: () => <Button title="Select" />,
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const ConnectedApp = connectActionSheet(App);

const AppContainer = () => {
  return (
    <ActionSheetProvider>
      <ConnectedApp />
    </ActionSheetProvider>
  );
};

export default AppContainer;
