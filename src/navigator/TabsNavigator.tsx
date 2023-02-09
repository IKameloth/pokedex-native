import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Tab1 } from './Tab1'
import { Tab2 } from './Tab2'

const Tab = createBottomTabNavigator()

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={{
        tabBarActiveTintColor: '#5856D5',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.90)',
          paddingBottom: Platform.OS === 'ios' ? 0 : 10,
          borderWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 70 : 80
        }
      }}
    >
      <Tab.Screen
        name="NavigationScreen"
        component={Tab1}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => <Icon color={color} size={20} name="list-outline" />
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={Tab2}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <Icon color={color} size={20} name="search-outline" />
        }}
      />
    </Tab.Navigator>
  )
}

export default TabsNavigator
