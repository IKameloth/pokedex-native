import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParams } from '../navigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FadeInImage } from '../components/FadeInImage'
import { usePokemon } from '../hooks/usePokemon'
import { PokemonDetails } from '../components/PokemonDetails'

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { simplePokemon, color } = route.params
  const { top } = useSafeAreaInsets()
  const { isLoading, pokemon } = usePokemon(simplePokemon.id)

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{ ...styles.backBtn, top: top + 10 }}
        >
          <Icon name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={{ ...styles.pokeName, top: top + 40 }}>
          {simplePokemon.name + '\n'}#{simplePokemon.id}
        </Text>
        <Image source={require('../assets/pokeball-white.png')} style={styles.pokeball} />
        <FadeInImage uri={simplePokemon.picture} style={styles.pokeImage} />
      </View>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backBtn: {
    position: 'absolute',
    left: 20
  },
  pokeName: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    opacity: 0.7
  },
  pokeImage: {
    position: 'absolute',
    width: 250,
    height: 250,
    bottom: -15
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
