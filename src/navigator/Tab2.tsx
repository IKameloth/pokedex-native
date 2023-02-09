import { createStackNavigator } from '@react-navigation/stack'
import { PokemonScreen } from '../screens/PokemonScreen'
import { SimplePokemon } from '../interfaces/pokemonInterface'
import { SearchScreen } from '../screens/SearchScreen'

export type RootStackParams = {
  HomeScreen: undefined
  PokemonScreen: { simplePokemon: SimplePokemon; color: string }
}

const Stack = createStackNavigator<RootStackParams>()

export const Tab2 = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="HomeScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  )
}
