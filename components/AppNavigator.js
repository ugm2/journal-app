import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import JournalList from './JournalList';
import AnalyticsScreen from './AnalyticsScreen'; // You'll need to create this component

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Journal') {
              iconName = focused ? 'book' : 'book-outline'; // Removed the "ios-" prefix
            } else if (route.name === 'Analytics') {
              iconName = focused ? 'analytics' : 'analytics-outline'; // Removed the "ios-" prefix
            }

            // Use the Ionicons component from @expo/vector-icons
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Journal" component={JournalList} />
        <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
